package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.Role;
import com.apsi.examination.domain.ClosedTaskExamPaperEntity;
import com.apsi.examination.domain.ExamPaperEntity;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.GradeRequest;
import com.apsi.examination.model.response.ExamPaperDto;
import com.apsi.examination.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamPaperService {

    private final ExamPaperRepository examPaperRepository;
    private final ExamTemplateRepository examTemplateRepository;
    private final TaskExamPaperRepository taskExamPaperRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AuthService authService;

    //Read all exam papers for a particular student in a course
    public List<ExamPaperDto> getExamPapersByCourse(String courseCode) {

        var user = authService.getCurrentUser();
        if(user.getRole() != Role.STUDENT) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read exam papers", HttpStatus.UNAUTHORIZED);
        }
        var studentId = user.getId();
        var course = courseRepository.findByCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Course with given code cannot be found", HttpStatus.NOT_FOUND));
        var student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Student with given id cannot be found", HttpStatus.NOT_FOUND));
        if (!course.getAttendants().contains(student)) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        return examPaperRepository.findAllByCourseCodeAndStudentId(courseCode, studentId)
                .stream().map(ExamPaperDto::from).collect(Collectors.toList());
    }

    //Read exam paper's details
    public ExamPaperDto getExamPaperById(String courseCode, Long examPaperId) {

        var course = courseRepository.findByCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Course with given code cannot be found", HttpStatus.NOT_FOUND));

        var user = authService.getCurrentUser();
        var userId = user.getId();
        if(user.getRole() == Role.STUDENT) {
            var student = studentRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Student with given id cannot be found", HttpStatus.NOT_FOUND));
            if (!course.getAttendants().contains(student)) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
        } else{
            var teacher = teacherRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Teacher with given id cannot be found", HttpStatus.NOT_FOUND));
            if(course.getCoordinator() != teacher) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
        }

        var exam = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id cannot be found", HttpStatus.NOT_FOUND));

        return ExamPaperDto.from(exam);
    }

    @Transactional //set exam paper as started and set start time
    public void startExamPaper(Long examPaperId) {
        var user = authService.getCurrentUser();
        var examPaper = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id doesn't exists", HttpStatus.NOT_FOUND));
        if(!Objects.equals(examPaper.getStudent().getId(), user.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Given exam paper doesn't belong to current user", HttpStatus.FORBIDDEN);
        }

        if (examPaper.getStatus() != ExamPaperEntity.ExamPaperStatus.UNRESOLVED)
            throw new RuntimeExceptionWithHttpStatus("Exam cannot be started", HttpStatus.FORBIDDEN);

        if(examPaper.getExam().getDateTimeStart().isAfter(LocalDateTime.now()) || examPaper.getExam().getDateTimeEnd().isBefore(LocalDateTime.now())) {
            throw new RuntimeExceptionWithHttpStatus("Exam is allowed to start only within start and end time of exam", HttpStatus.FORBIDDEN);
        }

        examPaper.setStatus(ExamPaperEntity.ExamPaperStatus.WRITING);
        examPaper.setStartTime(LocalDateTime.now());
        examPaperRepository.save(examPaper);
    }

    //Read all exam papers for a particular student in a course
    public List<ExamPaperDto> getExamPapersByExamTemplate(String courseCode, Long examTemplateId) {

        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read exam papers", HttpStatus.UNAUTHORIZED);
        }
        var teacher = teacherRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Coordinator of this course cannot be found", HttpStatus.NOT_FOUND));
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        var examTemplate = examTemplateRepository.findById(examTemplateId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam template with given id cannot be found", HttpStatus.NOT_FOUND));

        return examPaperRepository.findAllByExam(examTemplate)
                .stream().map(ExamPaperDto::from).collect(Collectors.toList());
    }

    public LocalDateTime getEndTimeOfExamPaper(Long examPaperId) {
        var user = authService.getCurrentUser();
        var examPaper = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id doesn't exists", HttpStatus.NOT_FOUND));
        if(!Objects.equals(examPaper.getStudent().getId(), user.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Given exam paper doesn't belong to current user", HttpStatus.FORBIDDEN);
        }
        if(examPaper.getStartTime() == null) {
            throw new RuntimeExceptionWithHttpStatus("Given exam hasn't started", HttpStatus.CONFLICT);
        }

        var examDurationConstraint = examPaper.getStartTime().plus(examPaper.getExam().getDuration(), ChronoUnit.MINUTES);
        var examEndTimeConstraint = examPaper.getExam().getDateTimeEnd();

        return examDurationConstraint.isBefore(examEndTimeConstraint) ? examDurationConstraint : examEndTimeConstraint;
    }

    //change exam grade manually
    public void changeGrade(Long examPaperId, GradeRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot change grade of exam paper", HttpStatus.UNAUTHORIZED);
        }
        var examPaper = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id doesn't exists", HttpStatus.NOT_FOUND));
        var teacher = teacherRepository.findByCourseCode(examPaper.getExam().getCourse().getCode())
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Coordinator of this course cannot be found", HttpStatus.NOT_FOUND));
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }
        if (request.getGrade() != null) {
            examPaper.setGrade(request.getGrade());
            examPaperRepository.save(examPaper);
        }
    }

    //submit exam paper - set its status as resolved
    public void submitExamPaper(Long examPaperId) {
        var user = authService.getCurrentUser();
        var examPaper = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id doesn't exists", HttpStatus.NOT_FOUND));
        if(!Objects.equals(examPaper.getStudent().getId(), user.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Given exam paper doesn't belong to current user", HttpStatus.FORBIDDEN);
        }

        if (examPaper.getStatus() != ExamPaperEntity.ExamPaperStatus.WRITING)
            throw new RuntimeExceptionWithHttpStatus("Exam cannot be submitted", HttpStatus.FORBIDDEN);

        examPaper.setStatus(ExamPaperEntity.ExamPaperStatus.RESOLVED);

        gradeClosedTasks(examPaper);

    }

    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void submitExamPaperAutomatically() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<ExamPaperEntity> examPapers = examPaperRepository.findAllPassed(currentDateTime);

        for (ExamPaperEntity examPaper : examPapers) {
            if (examPaper.getStatus() == ExamPaperEntity.ExamPaperStatus.UNRESOLVED){
                examPaper.setOverallPoints(BigDecimal.ZERO);
                examPaper.setGrade(BigDecimal.valueOf(2.0));
                examPaper.setStatus(ExamPaperEntity.ExamPaperStatus.MARKED);
                examPaperRepository.save(examPaper);
            } else {
                examPaper.setStatus(ExamPaperEntity.ExamPaperStatus.RESOLVED);
                gradeClosedTasks(examPaper);
            }
        }
    }


    public void assignPoints(ClosedTaskExamPaperEntity closedTask) {

        var weightSum = 0;
        var answerList = closedTask.getAnswersExamPaper();
        for (var answer : answerList) {
            weightSum = weightSum + answer.getWeight();
        }

        var pointPortion = closedTask.getMaxPoints().divide(BigDecimal.valueOf(weightSum),2, RoundingMode.HALF_UP);
        var earnedPoints = BigDecimal.ZERO;
        boolean allCorrect = true;
        for (var answer : answerList) {
            var answerPortion = pointPortion.multiply(BigDecimal.valueOf(answer.getWeight())).setScale(2, RoundingMode.HALF_UP);
            if ((answer.getIsCorrect() && answer.getIsMarked()) || (!answer.getIsCorrect() && !answer.getIsMarked())){
                earnedPoints = earnedPoints.add(answerPortion);
            }
            else if(!answer.getIsCorrect() && answer.getIsMarked()) {
                allCorrect = false;
                earnedPoints = earnedPoints.subtract(answerPortion.multiply(closedTask.getPenaltyWeight()).setScale(2, RoundingMode.HALF_UP));
            } else{
                allCorrect = false;
            }
        }
        if (earnedPoints.compareTo(closedTask.getMinPoints()) == -1){
            earnedPoints = closedTask.getMinPoints();
        }
        if (allCorrect){
            earnedPoints = closedTask.getMaxPoints();
        }

        closedTask.setEarnedPoints(earnedPoints);
        taskExamPaperRepository.save(closedTask);
    }

    public void gradeClosedTasks(ExamPaperEntity examPaper) {
        var taskList = examPaper.getTasksExamPaper();
        BigDecimal overallPoints = BigDecimal.ZERO;
        boolean onlyClosedTasks = true;

        for (var task : taskList) {
            if (task instanceof ClosedTaskExamPaperEntity){
                assignPoints((ClosedTaskExamPaperEntity) task);
                overallPoints = overallPoints.add(task.getEarnedPoints());
            } else{
                onlyClosedTasks = false;
            }
        }
        examPaper.setOverallPoints(overallPoints);
        examPaperRepository.save(examPaper);
        if (onlyClosedTasks){
            gradeExamPaper(examPaper);
        }
    }

    public void gradeExamPaper(ExamPaperEntity examPaper) {
        var gradeScale = examPaper.getExam().getGradeScale();
        var overallPoints = examPaper.getOverallPoints();
        double maxPossiblePoints = 0;
        double overallPointAsDouble = overallPoints.doubleValue();
        var taskList = examPaper.getTasksExamPaper();

        for (var task : taskList) {
            maxPossiblePoints += task.getMaxPoints().doubleValue();
        }
        BigDecimal grade;
        if (overallPointAsDouble < maxPossiblePoints * gradeScale.getPercentage30().doubleValue()/100.0)
            grade = BigDecimal.valueOf(2.0);
        else if (overallPointAsDouble < maxPossiblePoints * gradeScale.getPercentage35().doubleValue()/100.0)
            grade = BigDecimal.valueOf(3.0);
        else if (overallPointAsDouble < maxPossiblePoints * gradeScale.getPercentage40().doubleValue()/100.0)
            grade = BigDecimal.valueOf(3.5);
        else if (overallPointAsDouble < maxPossiblePoints * gradeScale.getPercentage45().doubleValue()/100.0)
            grade = BigDecimal.valueOf(4.0);
        else if (overallPointAsDouble < maxPossiblePoints * gradeScale.getPercentage50().doubleValue()/100.0)
            grade = BigDecimal.valueOf(4.5);
        else
            grade = BigDecimal.valueOf(5.0);

        examPaper.setGrade(grade);
        examPaper.setStatus(ExamPaperEntity.ExamPaperStatus.MARKED);
        examPaperRepository.save(examPaper);
    }

}
