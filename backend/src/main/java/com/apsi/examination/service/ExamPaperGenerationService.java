package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.domain.*;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.repository.ExamPaperRepository;
import com.apsi.examination.repository.ExamTemplateRepository;
import com.apsi.examination.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExamPaperGenerationService {

    private final ExamTemplateRepository examTemplateRepository;
    private final StudentRepository studentRepository;
    private final ExamPaperRepository examPaperRepository;
    private final AuthService authService;


    @Transactional
    public void generateExams(Long examTemplateId) {
        var template = examTemplateRepository.findById(examTemplateId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam template with given id don't exists", HttpStatus.NOT_FOUND));
        var course = template.getCourse();

        if(course.getCoordinator().getId() != authService.getCurrentUser().getId()) {
            throw new RuntimeExceptionWithHttpStatus("Cannot create exams on given template with current user", HttpStatus.UNAUTHORIZED);
        }
        var students = studentRepository.findAllByCoursesContaining(course);

        students.forEach(student -> createExamForStudent(student, template, course));
        template.setStatus(ExamTemplateEntity.ExamTemplateStatus.GENERATED);
        examTemplateRepository.save(template);
    }

    private void createExamForStudent(StudentEntity student, ExamTemplateEntity template, CourseEntity course) {
        if (student.getExamPapers().stream().anyMatch(e -> e.getExam().equals(template))) {
            log.warn("Student (id: {}) have already declared exam", student.getId());
            throw new RuntimeExceptionWithHttpStatus(String.format("Student (id: %s have already declared exam", student.getId()), HttpStatus.CONFLICT);
        }
        var examPaper = ExamPaperEntity.builder()
                .exam(template)
                .student(student)
                .status(ExamPaperEntity.ExamPaperStatus.UNRESOLVED)
                .build();
        template.getExamPapers().add(examPaper);
        student.getExamPapers().add(examPaper);
        var tasks = template.getTaskPools().stream()
                .flatMap(pool -> {
                    if (pool.getTasks().size() <= pool.getTaskDrawNumber()) {
                        return pool.getTasks().stream();
                    }
                    Collections.shuffle(pool.getTasks());

                    //todo usuń to sprawdzam czy dobrze wyliczyłem index
                    if (pool.getTasks().subList(0, pool.getTaskDrawNumber()).size() != pool.getTaskDrawNumber()) {
                        throw new RuntimeExceptionWithHttpStatus("nie zgadza się liczba wylosowanych tasków", HttpStatus.CONFLICT);
                    }
                    return pool.getTasks().subList(0, pool.getTaskDrawNumber()).stream();
                })
                .map(task -> {
                    if (task instanceof ClosedTaskEntity) {
                        var examTask = ClosedTaskExamPaperEntity.builder()
                                .examPaper(examPaper)
                                .title(task.getTitle())
                                .content(task.getContent())
                                .maxPoints(task.getPool().getPointsPerTask())
                                .penaltyWeight(((ClosedTaskEntity) task).getPenaltyWeight())
                                .minPoints(task.getPool().getMinPointsPerTask())
                                .build();
                        List<AnswerExamPaperEntity> examAnswers = ((ClosedTaskEntity) task).getAnswers().stream()
                                .map(answer -> AnswerExamPaperEntity.builder()
                                        .content(answer.getContent())
                                        .weight(answer.getWeight())
                                        .isCorrect(answer.getIsCorrect())
                                        .isMarked(false)
                                        .taskExamPaper(examTask)
                                        .build())
                                .toList();
                        examTask.setAnswersExamPaper(examAnswers);
                        return examTask;
                    }
                    else if (task instanceof OpenTaskEntity) {
                        return OpenTaskExamPaperEntity.builder()
                                .examPaper(examPaper)
                                .title(task.getTitle())
                                .content(task.getContent())
                                .maxPoints(task.getPool().getPointsPerTask())
                                .answer("")
                                .build();
                    }
                    else
                        return FileTaskExamPaperEntity.builder()
                                .examPaper(examPaper)
                                .title(task.getTitle())
                                .content(task.getContent())
                                .maxPoints(task.getPool().getPointsPerTask())
                                .fileFormat(((FileTaskEntity)task).getFormat())
                                .fileMaxSize(((FileTaskEntity)task).getMaximumSize())
                                .build();

                })
                .toList();

        examPaper.setTasksExamPaper(tasks);
        examPaperRepository.save(examPaper);
        examTemplateRepository.save(template);
        studentRepository.save(student);
    }
}
