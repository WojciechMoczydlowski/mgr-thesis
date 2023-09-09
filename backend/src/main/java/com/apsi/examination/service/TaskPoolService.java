package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.Role;
import com.apsi.examination.domain.ExamTemplateEntity;
import com.apsi.examination.domain.TaskPoolEntity;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.TaskPoolRequest;
import com.apsi.examination.model.response.TaskPoolDto;
import com.apsi.examination.repository.ExamTemplateRepository;
import com.apsi.examination.repository.TaskPoolRepository;
import com.apsi.examination.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskPoolService {
    private final TaskPoolRepository taskPoolRepository;
    private final ExamTemplateRepository examTemplateRepository;
    private final TaskRepository taskRepository;
    private final AuthService authService;

    //Read all task pools in an exam template
    public List<TaskPoolDto> getTaskPoolByExamTemplate(Long examTemplateId) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read task pools", HttpStatus.UNAUTHORIZED);
        }
        ExamTemplateEntity examTemplate = examTemplateRepository.findById(examTemplateId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam template with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = examTemplate.getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        return taskPoolRepository.findAllByExam(examTemplate)
                .stream()
                .map(TaskPoolDto::from)
                .collect(Collectors.toList());
    }

    //Read details of a task pool with specific ID
    public TaskPoolDto getTaskPoolById(Long taskPoolId) {
        var user = authService.getCurrentUser();
        if (user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read task pools", HttpStatus.UNAUTHORIZED);
        }
        return TaskPoolDto.from(taskPoolRepository.findById(taskPoolId).get());
    }

    //Create a task pool
    public void createTaskPool(Long examTemplateId, TaskPoolRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot create a task pool", HttpStatus.UNAUTHORIZED);
        }
        var examTemplate = examTemplateRepository.findById(examTemplateId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam template with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = examTemplate.getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        TaskPoolEntity pool = TaskPoolEntity.builder()
                .taskType(request.getTaskType())
                .title(request.getTitle())
                .description(request.getDescription())
                .pointsPerTask(request.getPointsPerTask())
                .minPointsPerTask(request.getMinPointsPerTask())
                .taskDrawNumber(request.getTaskDrawNumber())
                .exam(examTemplate)
                .build();
        taskPoolRepository.save(pool);
    }

    //Update a task pool
    public void updateTaskPool(Long taskPoolId, TaskPoolRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot update a task pool", HttpStatus.UNAUTHORIZED);
        }
        TaskPoolEntity poolDB = taskPoolRepository.findById(taskPoolId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task pool with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = poolDB.getExam().getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        if (Objects.nonNull(request.getTitle()) && !"".equalsIgnoreCase(request.getTitle())) {
            poolDB.setTitle(request.getTitle());
        }
        if (Objects.nonNull(request.getDescription()) && !"".equalsIgnoreCase(request.getDescription())) {
            poolDB.setDescription(request.getDescription());
        }
        if (Objects.nonNull(request.getPointsPerTask()) && !"".equalsIgnoreCase(String.valueOf(request.getPointsPerTask()))) {
            poolDB.setPointsPerTask(request.getPointsPerTask());
        }
        if (Objects.nonNull(request.getMinPointsPerTask()) && !"".equalsIgnoreCase(String.valueOf(request.getMinPointsPerTask()))) {
            poolDB.setMinPointsPerTask(request.getMinPointsPerTask());
        }
        if (Objects.nonNull(request.getTaskDrawNumber()) && !"".equalsIgnoreCase(String.valueOf(request.getTaskDrawNumber()))) {
            poolDB.setTaskDrawNumber(request.getTaskDrawNumber());
        }

        taskPoolRepository.save(poolDB);
    }

    //Delete a task pool
    public void deleteTaskPoolById(Long taskPoolId) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot delete a task pool", HttpStatus.UNAUTHORIZED);
        }
        TaskPoolEntity taskPool = taskPoolRepository.findById(taskPoolId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task pool with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = taskPool.getExam().getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        taskRepository.deleteAll(taskRepository.findAllByPool(taskPool));
        taskPoolRepository.deleteById(taskPoolId);
    }
}
