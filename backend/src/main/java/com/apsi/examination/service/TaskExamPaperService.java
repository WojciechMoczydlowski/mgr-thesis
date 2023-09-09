package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.Role;
import com.apsi.examination.domain.*;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.AnswerExamPaperRequest;
import com.apsi.examination.model.request.MarkRequest;
import com.apsi.examination.model.request.TaskExamPaperRequest;
import com.apsi.examination.model.response.TaskExamPaperDto;
import com.apsi.examination.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskExamPaperService {
    private final TaskExamPaperRepository taskExamPaperRepository;
    private final ExamPaperRepository examPaperRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final OpenTaskExamPaperRepository openTaskExamPaperRepository;
    private final ClosedTaskExamPaperRepository closedTaskExamPaperRepository;
    private final FileTaskExamPaperRepository fileTaskExamPaperRepository;
    private final AnswerExamPaperRepository answerExamPaperRepository;
    private final ExamPaperService examPaperService;
    private final AuthService authService;

    @Value("${examination.time.grace-period:3000000}")
    private Integer saveGracePeriod;

    //Read a task by id
    public TaskExamPaperDto getTaskById(Long taskExamPaperId) {

        var taskExamPaper = taskExamPaperRepository.findById(taskExamPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));

        var user = authService.getCurrentUser();

        if(user.getRole() == Role.STUDENT) {
            var student = taskExamPaper.getExamPaper().getStudent();
            if (!Objects.equals(user.getId(), student.getId())) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
            if (taskExamPaper.getExamPaper().getStatus() != ExamPaperEntity.ExamPaperStatus.WRITING)
                throw new RuntimeExceptionWithHttpStatus("Exam is not being resolved", HttpStatus.FORBIDDEN);
        }else{
            var teacher = taskExamPaper.getExamPaper().getExam().getCourse().getCoordinator();
            if (!Objects.equals(user.getId(), teacher.getId())) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
        }

        return TaskExamPaperDto.from(taskExamPaper);
    }

    //Read all tasks in an exam paper
    public List<TaskExamPaperDto> getTasksByExamPaper(String courseCode, Long examPaperId) {

        var examPaper = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id cannot be found", HttpStatus.NOT_FOUND));

        var course = courseRepository.findByCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Course with given code cannot be found", HttpStatus.NOT_FOUND));

        var user = authService.getCurrentUser();
        var userId = user.getId();
        if(user.getRole() == Role.STUDENT) {
            var student = examPaper.getStudent();
            if (!Objects.equals(userId, student.getId())) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
            if (examPaper.getStatus() != ExamPaperEntity.ExamPaperStatus.WRITING)
                throw new RuntimeExceptionWithHttpStatus("Exam is not being resolved", HttpStatus.FORBIDDEN);
        } else{
            var teacher = teacherRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Teacher with given id cannot be found", HttpStatus.NOT_FOUND));
            if(course.getCoordinator() != teacher) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
        }

        return taskExamPaperRepository.findAllByExamPaper(examPaper)
                .stream()
                .map(TaskExamPaperDto::from)
                .collect(Collectors.toList());
    }

    //Update a task in exam paper
    public void updateTaskExamPaper(Long taskExamPaperId, TaskExamPaperRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.STUDENT) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot update a task in an exam paper", HttpStatus.UNAUTHORIZED);
        }
        var taskExamPaper = taskExamPaperRepository.findById(taskExamPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));
        var examPaper = taskExamPaper.getExamPaper();
        var student = examPaper.getStudent();
        if (!Objects.equals(user.getId(), student.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        if(examPaper.getStartTime() == null) {
            throw new RuntimeExceptionWithHttpStatus("Exam hasn't started", HttpStatus.FORBIDDEN);
        }

        var examTemplate = examPaper.getExam();
        if(!(examTemplate.getDateTimeStart().isBefore(LocalDateTime.now()) &&  examTemplate.getDateTimeEnd().plus(Duration.of(saveGracePeriod, ChronoUnit.MILLIS)).isAfter(LocalDateTime.now()))
            || !examPaper.getStartTime().plus(Duration.of(examTemplate.getDuration(), ChronoUnit.MINUTES)).plus(Duration.of(saveGracePeriod, ChronoUnit.MILLIS)).isAfter(LocalDateTime.now())) {
            throw new RuntimeExceptionWithHttpStatus("Cannot update task exam outside of start and end time", HttpStatus.FORBIDDEN);
        }

        if(taskExamPaper instanceof OpenTaskExamPaperEntity){
            OpenTaskExamPaperEntity taskExamPaperDB = openTaskExamPaperRepository.findById(taskExamPaperId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));

            if (Objects.nonNull(request.getAnswerOpenTask()) && !"".equalsIgnoreCase(request.getAnswerOpenTask())) {
                taskExamPaperDB.setAnswer(request.getAnswerOpenTask());
            }
            taskExamPaperRepository.save(taskExamPaperDB);
        }
        else if(taskExamPaper instanceof ClosedTaskExamPaperEntity){
            ClosedTaskExamPaperEntity taskExamPaperDB = closedTaskExamPaperRepository.findById(taskExamPaperId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));

            if (Objects.nonNull(request.getAnswersClosedTask()) && !"".equalsIgnoreCase(String.valueOf(request.getAnswersClosedTask()))){

                for (AnswerExamPaperRequest answerExamPaperRequest : request.getAnswersClosedTask())
                {
                    AnswerExamPaperEntity answerExamPaperDB = answerExamPaperRepository.findById(answerExamPaperRequest.getId())
                            .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper answer with given id cannot be found", HttpStatus.NOT_FOUND));

                    answerExamPaperDB.setIsMarked(answerExamPaperRequest.getIsMarked());
                    answerExamPaperRepository.save(answerExamPaperDB);
                }
            }
            taskExamPaperRepository.save(taskExamPaperDB);
        }
    }

    //Send a file for a file task
    public void updateFileTaskExamPaper(Long taskExamPaperId, MultipartFile file) {
        var user = authService.getCurrentUser();
        if (user.getRole() != Role.STUDENT) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot update a task in an exam paper", HttpStatus.UNAUTHORIZED);
        }
        var taskExamPaper = taskExamPaperRepository.findById(taskExamPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));
        var examPaper = taskExamPaper.getExamPaper();
        var student = examPaper.getStudent();
        if (!Objects.equals(user.getId(), student.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        if (examPaper.getStartTime() == null) {
            throw new RuntimeExceptionWithHttpStatus("Exam haven't started", HttpStatus.FORBIDDEN);
        }

        var examTemplate = examPaper.getExam();
        if (!(examTemplate.getDateTimeStart().isBefore(LocalDateTime.now()) && examTemplate.getDateTimeEnd().plus(Duration.of(saveGracePeriod, ChronoUnit.MILLIS)).isAfter(LocalDateTime.now()))
                || !examPaper.getStartTime().plus(Duration.of(examTemplate.getDuration(), ChronoUnit.MINUTES)).plus(Duration.of(saveGracePeriod, ChronoUnit.MILLIS)).isAfter(LocalDateTime.now())) {
            throw new RuntimeExceptionWithHttpStatus("Cannot update task exam outside of start and end time", HttpStatus.FORBIDDEN);
        }
        try {
            FileTaskExamPaperEntity taskExamPaperDB = fileTaskExamPaperRepository.findById(taskExamPaperId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));

            if (!(taskExamPaper instanceof FileTaskExamPaperEntity))
                throw new RuntimeExceptionWithHttpStatus("This is not a file task.", HttpStatus.FORBIDDEN);

            if (file != null) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                String fileExtension = fileName.split("\\.")[1];
                if (!Objects.equals(fileExtension, taskExamPaperDB.getFileFormat()))
                    throw new RuntimeExceptionWithHttpStatus("Wrong file format", HttpStatus.FORBIDDEN);

                if (file.getSize() > taskExamPaperDB.getFileMaxSize()*1024)
                    throw new RuntimeExceptionWithHttpStatus("File too large. Maximum size is: " + taskExamPaperDB.getFileMaxSize() + " MB", HttpStatus.FORBIDDEN);

                taskExamPaperDB.setFileName(fileName);
                taskExamPaperDB.setFileFormat(file.getContentType());
                taskExamPaperDB.setData(file.getBytes());
                taskExamPaperDB.setFileStatus("UNPUBLISHED");
            }

            taskExamPaperRepository.save(taskExamPaperDB);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    //Mark a task in an exam paper
    @Transactional
    public void markTask(Long taskExamPaperId, MarkRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot mark a task in an exam paper", HttpStatus.UNAUTHORIZED);
        }
        var taskExamPaper = taskExamPaperRepository.findById(taskExamPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper task with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = taskExamPaper.getExamPaper().getExam().getCourse().getCoordinator();

        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }
        var examPaper = taskExamPaper.getExamPaper();
        if ((examPaper.getStatus() == ExamPaperEntity.ExamPaperStatus.UNRESOLVED) || ((examPaper.getStatus() == ExamPaperEntity.ExamPaperStatus.WRITING)))
            throw new RuntimeExceptionWithHttpStatus("This exam is not resolved yet", HttpStatus.FORBIDDEN);

        if (Objects.nonNull(request.getEarnedPoints())) {
            if (request.getEarnedPoints().doubleValue() > taskExamPaper.getMaxPoints().doubleValue())
                throw new RuntimeExceptionWithHttpStatus("Number of points is greater than maximum for this task", HttpStatus.BAD_REQUEST);
            taskExamPaper.setEarnedPoints(request.getEarnedPoints());
            taskExamPaperRepository.save(taskExamPaper);
            var taskList = examPaper.getTasksExamPaper();

            BigDecimal overallPoints = BigDecimal.ZERO;
            boolean areAllTasksMarked = true;
            for (var task : taskList) {
                if (task.getEarnedPoints() != null){
                    overallPoints = overallPoints.add(task.getEarnedPoints());
                }
                else
                    areAllTasksMarked = false;
            }
            examPaper.setOverallPoints(overallPoints);

            if (areAllTasksMarked) {
                examPaperService.gradeExamPaper(examPaper);
            }

            examPaperRepository.save(examPaper);
        }
        if (Objects.nonNull(request.getTeacherComment()) && !"".equalsIgnoreCase(request.getTeacherComment())) {
            taskExamPaper.setTeacherComment(request.getTeacherComment());
            taskExamPaperRepository.save(taskExamPaper);
        }
    }

    //Read marked tasks in an exam paper
    public List<TaskExamPaperDto> getTasksResultsByExamPaper(Long examPaperId) {

        var examPaper = examPaperRepository.findById(examPaperId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper with given id cannot be found", HttpStatus.NOT_FOUND));

        var user = authService.getCurrentUser();
        var userId = user.getId();
        if(user.getRole() == Role.STUDENT) {
            var student = examPaper.getStudent();
            if (!Objects.equals(userId, student.getId())) {
                throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
            }
        } else
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);

        if (examPaper.getStatus() != ExamPaperEntity.ExamPaperStatus.MARKED)
            throw new RuntimeExceptionWithHttpStatus("This exam is not marked yet", HttpStatus.FORBIDDEN);

        return taskExamPaperRepository.findAllByExamPaper(examPaper)
                .stream()
                .map(TaskExamPaperDto::from)
                .collect(Collectors.toList());
    }
}