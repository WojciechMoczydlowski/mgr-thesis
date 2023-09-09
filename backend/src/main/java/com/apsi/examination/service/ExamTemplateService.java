package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.Role;
import com.apsi.examination.domain.ExamPaperEntity;
import com.apsi.examination.domain.ExamTemplateEntity;
import com.apsi.examination.domain.GradeScaleEntity;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.ExamTemplateRequest;
import com.apsi.examination.model.response.ExamTemplateDto;
import com.apsi.examination.repository.ExamTemplateRepository;
import com.apsi.examination.repository.GradeScaleRepository;
import com.apsi.examination.repository.TeacherRepository;
import com.apsi.examination.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamTemplateService {

    private final ExamTemplateRepository examTemplateRepository;
    private final GradeScaleRepository gradeScaleRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final AuthService authService;

    //Read all exam templates in a course
    public List<ExamTemplateDto> getExamTemplatesByCourse(String courseCode) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read exam templates", HttpStatus.UNAUTHORIZED);
        }
        var teacher = teacherRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Coordinator of this course cannot be found", HttpStatus.NOT_FOUND));
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        return examTemplateRepository.findAllByCourseCode(courseCode)
                .stream().map(ExamTemplateDto::from).collect(Collectors.toList());
    }

    //Read exam template with specific ID
    public ExamTemplateDto getExamTemplatesById(Long examId) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read exam templates", HttpStatus.UNAUTHORIZED);
        }
        return ExamTemplateDto.from(examTemplateRepository.findById(examId).get());
    }

    //Create an exam template
    public void createExamTemplate(String courseCode, ExamTemplateRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot create an exam template", HttpStatus.UNAUTHORIZED);
        }
        var teacher = teacherRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Coordinator of this course cannot be found", HttpStatus.NOT_FOUND));
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }
        var course = courseRepository.findByCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Course with given code cannot be found", HttpStatus.NOT_FOUND));

        var gradeScale = GradeScaleEntity.builder()
                .percentage30(request.getPercentage30())
                .percentage35(request.getPercentage35())
                .percentage40(request.getPercentage40())
                .percentage45(request.getPercentage45())
                .percentage50(request.getPercentage50())
                .build();
        gradeScaleRepository.save(gradeScale);

        var examTemplate = ExamTemplateEntity.builder()

                .title(request.getTitle())
                .description(request.getDescription())
                .dateTimeStart(request.getDateTimeStart())
                .dateTimeEnd(request.getDateTimeEnd())
                .duration(request.getDuration())
                .course(course)
                .status(ExamTemplateEntity.ExamTemplateStatus.CREATED)
                .gradeScale(gradeScale)
                .build();
        examTemplateRepository.save(examTemplate);
    }

    public void updateExamTemplate(Long examTemplateId, ExamTemplateRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot update an exam template", HttpStatus.UNAUTHORIZED);
        }
        ExamTemplateEntity examTemplateDB = examTemplateRepository.findById(examTemplateId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam template with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = examTemplateDB.getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        var gradeScaleDB = examTemplateDB.getGradeScale();

        if (Objects.nonNull(request.getTitle()) && !"".equalsIgnoreCase(request.getTitle())) {
            examTemplateDB.setTitle(request.getTitle());
        }

        if (Objects.nonNull(request.getDescription()) && !"".equalsIgnoreCase(request.getDescription())) {
            examTemplateDB.setDescription(request.getDescription());
        }

        if (Objects.nonNull(request.getDateTimeStart()) && !"".equalsIgnoreCase(String.valueOf(request.getDateTimeStart()))) {
            examTemplateDB.setDateTimeStart(request.getDateTimeStart());
        }

        if (Objects.nonNull(request.getDateTimeEnd()) && !"".equalsIgnoreCase(String.valueOf(request.getDateTimeEnd()))) {
            examTemplateDB.setDateTimeEnd(request.getDateTimeEnd());
        }

        if (Objects.nonNull(request.getDuration()) && !"".equalsIgnoreCase(String.valueOf(request.getDuration()))) {
            examTemplateDB.setDuration(request.getDuration());
        }

        if (Objects.nonNull(request.getPercentage30()) && !"".equalsIgnoreCase(String.valueOf(request.getPercentage30()))) {
            gradeScaleDB.setPercentage30(request.getPercentage30());
        }

        if (Objects.nonNull(request.getPercentage35()) && !"".equalsIgnoreCase(String.valueOf(request.getPercentage35()))) {
            gradeScaleDB.setPercentage35(request.getPercentage35());
        }

        if (Objects.nonNull(request.getPercentage40()) && !"".equalsIgnoreCase(String.valueOf(request.getPercentage40()))) {
            gradeScaleDB.setPercentage40(request.getPercentage40());
        }

        if (Objects.nonNull(request.getPercentage45()) && !"".equalsIgnoreCase(String.valueOf(request.getPercentage45()))) {
            gradeScaleDB.setPercentage45(request.getPercentage45());
        }

        if (Objects.nonNull(request.getPercentage50()) && !"".equalsIgnoreCase(String.valueOf(request.getPercentage50()))) {
            gradeScaleDB.setPercentage50(request.getPercentage50());
        }
        gradeScaleRepository.save(gradeScaleDB);
        examTemplateRepository.save(examTemplateDB);
    }
    

    //Delete an exam template
    public void deleteExamTemplateById(Long examTemplateId) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot delete an exam template", HttpStatus.UNAUTHORIZED);
        }
        ExamTemplateEntity examTemplateDB = examTemplateRepository.findById(examTemplateId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam template with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = examTemplateDB.getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        examTemplateRepository.deleteById(examTemplateId);
    }

    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void finishExamTemplateAutomatically() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<ExamTemplateEntity> examTemplates = examTemplateRepository.findAllByDateTimeEndBefore(currentDateTime);

        for (ExamTemplateEntity examTemplate : examTemplates) {
            if (examTemplate.getStatus() != ExamTemplateEntity.ExamTemplateStatus.FINISHED) {
                examTemplate.setStatus(ExamTemplateEntity.ExamTemplateStatus.FINISHED);
                examTemplateRepository.save(examTemplate);
            }
        }
    }
}