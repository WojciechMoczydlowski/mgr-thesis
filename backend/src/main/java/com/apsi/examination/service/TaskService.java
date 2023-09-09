package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.Role;
import com.apsi.examination.domain.*;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.AnswerRequest;
import com.apsi.examination.model.request.TaskRequest;
import com.apsi.examination.model.response.TaskDto;
import com.apsi.examination.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final OpenTaskRepository openTaskRepository;
    private final ClosedTaskRepository closedTaskRepository;
    private final FileTaskRepository fileTaskRepository;
    private final TaskPoolRepository taskPoolRepository;
    private final AnswerRepository answerRepository;
    private final AuthService authService;

    //Read all tasks in a task pool
    public List<TaskDto> getTasksByTaskPool(Long taskPoolId) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read tasks in a task pool", HttpStatus.UNAUTHORIZED);
        }
        TaskPoolEntity taskPool = taskPoolRepository.findById(taskPoolId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task pool with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = taskPool.getExam().getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        return taskRepository.findAllByPool(taskPool)
                .stream()
                .map(TaskDto::from)
                .collect(Collectors.toList());
    }

    //Read one task with specific ID
    public TaskDto getTaskById(Long taskId) {
        var user = authService.getCurrentUser();
        if (user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read tasks in a task pool", HttpStatus.UNAUTHORIZED);
        }
        return TaskDto.from(taskRepository.findById(taskId).get());
    }

    //Create a task
    public void createTask(Long taskPoolId, TaskRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot create a task in a task pool", HttpStatus.UNAUTHORIZED);
        }
        var taskPool = taskPoolRepository.findById(taskPoolId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task pool with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = taskPool.getExam().getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        if(Objects.equals(taskPool.getTaskType(), "OPEN")){
            OpenTaskEntity openTask = OpenTaskEntity.builder()
                    .taskTitle(request.getTitle())
                    .taskContent(request.getContent())
                    .taskPool(taskPool)
                    .build();
            taskRepository.save(openTask);
        }

        else if(Objects.equals(taskPool.getTaskType(), "CLOSED")){
            ClosedTaskEntity closedTask = ClosedTaskEntity.builder()
                    .taskTitle(request.getTitle())
                    .taskContent(request.getContent())
                    .penaltyWeight(request.getPenaltyWeight())
                    .answers(null)
                    .taskPool(taskPool)
                    .build();
            taskRepository.save(closedTask);

            for (AnswerRequest answerRequest : request.getAnswers())
            {
                AnswerEntity answer = AnswerEntity.builder()
                        .content(answerRequest.getContent())
                        .weight(answerRequest.getWeight())
                        .isCorrect(answerRequest.getIsCorrect())
                        .task(closedTask)
                        .build();
                answerRepository.save(answer);
            }
        }
        else if(Objects.equals(taskPool.getTaskType(), "FILE")){
                FileTaskEntity fileTask = FileTaskEntity.builder()
                        .taskTitle(request.getTitle())
                        .taskContent(request.getContent())
                        .fileFormat(request.getFileFormat())
                        .maxFileSize(request.getMaxFileSize())
                        .taskPool(taskPool)
                        .build();
                taskRepository.save(fileTask);
        }

    }

    //Update a task
    public void updateTask(Long taskId, TaskRequest request) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot update a task in a task pool", HttpStatus.UNAUTHORIZED);
        }
        var task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = task.getPool().getExam().getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        if(task instanceof OpenTaskEntity){
            OpenTaskEntity taskDB = openTaskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task with given id cannot be found", HttpStatus.NOT_FOUND));

            if (Objects.nonNull(request.getTitle()) && !"".equalsIgnoreCase(request.getTitle())) {
                taskDB.setTitle(request.getTitle());
            }
            if (Objects.nonNull(request.getContent()) && !"".equalsIgnoreCase(request.getContent())) {
                taskDB.setContent(request.getContent());
            }
            taskRepository.save(taskDB);
        }

        else if(task instanceof ClosedTaskEntity){
            ClosedTaskEntity taskDB = closedTaskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task with given id cannot be found", HttpStatus.NOT_FOUND));

            if (Objects.nonNull(request.getTitle()) && !"".equalsIgnoreCase(request.getTitle())) {
                taskDB.setTitle(request.getTitle());
            }
            if (Objects.nonNull(request.getContent()) && !"".equalsIgnoreCase(request.getContent())) {
                taskDB.setContent(request.getContent());
            }
            if (Objects.nonNull(request.getPenaltyWeight()) && !"".equalsIgnoreCase(String.valueOf(request.getPenaltyWeight()))){
                taskDB.setPenaltyWeight(request.getPenaltyWeight());
            }
            if (Objects.nonNull(request.getAnswers()) && !"".equalsIgnoreCase(String.valueOf(request.getAnswers()))){
                for (AnswerRequest answerRequest : request.getAnswers())
                {
                    AnswerEntity answerDB = answerRepository.findById(answerRequest.getId())
                            .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Exam paper answer with given id cannot be found", HttpStatus.NOT_FOUND));

                    if (Objects.nonNull(answerRequest.getContent()) && !"".equalsIgnoreCase(answerRequest.getContent())) {
                        answerDB.setContent(answerRequest.getContent());
                    }
                    if (Objects.nonNull(answerRequest.getWeight()) && !"".equalsIgnoreCase(String.valueOf(answerRequest.getWeight()))) {
                        answerDB.setWeight(answerRequest.getWeight());
                    }
                    if (Objects.nonNull(answerRequest.getIsCorrect()) && !"".equalsIgnoreCase(String.valueOf(answerRequest.getIsCorrect()))) {
                        answerDB.setIsCorrect(answerRequest.getIsCorrect());
                    }
                    answerRepository.save(answerDB);
                }
            }
            taskRepository.save(taskDB);
        }

        else {
            FileTaskEntity taskDB = fileTaskRepository.findById(taskId)
                    .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task with given id cannot be found", HttpStatus.NOT_FOUND));

            if (Objects.nonNull(request.getTitle()) && !"".equalsIgnoreCase(request.getTitle())) {
                taskDB.setTitle(request.getTitle());
            }
            if (Objects.nonNull(request.getContent()) && !"".equalsIgnoreCase(request.getContent())) {
                taskDB.setContent(request.getContent());
            }
            if (Objects.nonNull(request.getFileFormat()) && !"".equalsIgnoreCase(String.valueOf(request.getFileFormat()))){
                taskDB.setFormat(request.getFileFormat());
            }
            if (Objects.nonNull(request.getMaxFileSize()) && !"".equalsIgnoreCase(String.valueOf(request.getMaxFileSize()))){
                taskDB.setMaximumSize(request.getMaxFileSize());
            }

            taskRepository.save(taskDB);
        }

    }

    //Delete a task
    public void deleteTaskById(Long taskId) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot delete a task from a task pool", HttpStatus.UNAUTHORIZED);
        }
        var task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Task with given id cannot be found", HttpStatus.NOT_FOUND));
        var teacher = task.getPool().getExam().getCourse().getCoordinator();
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }

        if(task instanceof ClosedTaskEntity){
            answerRepository.deleteAll(answerRepository.findAllByTask((ClosedTaskEntity) task));
        }

        taskRepository.deleteById(taskId);
    }
}