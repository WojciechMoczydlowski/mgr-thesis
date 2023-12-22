package com.apsi.examination.controller;

import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.*;
import com.apsi.examination.model.response.*;
import com.apsi.examination.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/teacher/courses")
public class ExamTemplateController {

    private final CourseService courseService;
    private final ExamTemplateService examTemplateService;
    private final TaskService taskService;
    private final TaskPoolService taskPoolService;
    private final ExamPaperGenerationService examPaperGenerationService;
    private final ExamPaperService examPaperService;
    private final TaskExamPaperService taskExamPaperService;
    private final StatisticService statisticService;

    // TEACHER

    // Read all teacher courses
    @GetMapping
    @PreAuthorize("hasRole('TEACHER')")
    public List<CourseDto> getTeacherCourses() {
        return courseService.getTeacherCourses();
    }

    // Read all attendants of a course
    @GetMapping("/{courseCode}/attendants")
    @PreAuthorize("hasRole('TEACHER')")
    public List<UserDto> getCourseAttendants(@PathVariable String courseCode) {
        return courseService.getAttendants(courseCode);
    }

    // Create an exam template by teacher
    @PostMapping("/{courseCode}")
    @PreAuthorize("hasRole('TEACHER')")
    public void createExamTemplate(@PathVariable String courseCode, @RequestBody ExamTemplateRequest request) {
        examTemplateService.createExamTemplate(courseCode, request);
    }

    // Read all exam templates in a course by teacher
    @GetMapping("/{courseCode}")
    @PreAuthorize("hasRole('TEACHER')")
    public List<ExamTemplateDto> getCourseExamTemplates(@PathVariable String courseCode) {
        return examTemplateService.getExamTemplatesByCourse(courseCode);
    }

    // Update an exam template by teacher
    @PutMapping("/{courseCode}/{examTemplateId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void updateExamTemplate(@PathVariable("examTemplateId") Long examTemplateId,
            @RequestBody ExamTemplateRequest request) {
        examTemplateService.updateExamTemplate(examTemplateId, request);
    }

    // Delete an exam template by teacher
    @DeleteMapping("/{courseCode}/{examTemplateId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void deleteExamTemplate(@PathVariable("examTemplateId") Long examTemplateId) {
        examTemplateService.deleteExamTemplateById(examTemplateId);
    }

    // Read one exam template's details by teacher
    @GetMapping("/{courseCode}/{examTemplateId}/details")
    @PreAuthorize("hasRole('TEACHER')")
    public ExamTemplateDto getExamTemplate(@PathVariable Long examTemplateId) {
        return examTemplateService.getExamTemplatesById(examTemplateId);
    }

    // Create a task pool
    @PostMapping("/{courseCode}/{examTemplateId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void createTaskPool(@PathVariable("examTemplateId") Long examTemplateId,
            @RequestBody TaskPoolRequest request) {
        taskPoolService.createTaskPool(examTemplateId, request);
    }

    // Read all task pools in an exam template
    @GetMapping("/{courseCode}/{examTemplateId}")
    @PreAuthorize("hasRole('TEACHER')")
    public List<TaskPoolDto> getTaskPools(@PathVariable("examTemplateId") Long examTemplateId) {
        return taskPoolService.getTaskPoolByExamTemplate(examTemplateId);
    }

    // Update a task pool in an exam template
    @PutMapping("/{courseCode}/{examTemplateId}/{taskPoolId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void updateTaskPool(@PathVariable("taskPoolId") Long taskPoolId, @RequestBody TaskPoolRequest request) {
        taskPoolService.updateTaskPool(taskPoolId, request);
    }

    // Delete a task pool from an exam template
    @DeleteMapping("/{courseCode}/{examTemplateId}/{taskPoolId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void deleteTaskPool(@PathVariable("taskPoolId") Long taskPoolId) {
        taskPoolService.deleteTaskPoolById(taskPoolId);
    }

    // Read one task pool's details
    @GetMapping("/{courseCode}/{examTemplateId}/{taskPoolId}/details")
    @PreAuthorize("hasRole('TEACHER')")
    public TaskPoolDto getTaskPool(@PathVariable("taskPoolId") Long taskPoolId) {
        return taskPoolService.getTaskPoolById(taskPoolId);
    }

    // Create a task by teacher
    @PostMapping("/{courseCode}/{examTemplateId}/{taskPoolId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void createTask(@PathVariable("taskPoolId") Long taskPoolId, @RequestBody TaskRequest request) {
        taskService.createTask(taskPoolId, request);
    }

    // Read all tasks in a task pool by teacher
    @GetMapping("/{courseCode}/{examTemplateId}/{taskPoolId}")
    @PreAuthorize("hasRole('TEACHER')")
    public List<TaskDto> getTaskPoolTasks(@PathVariable("taskPoolId") Long taskPoolId) {
        return taskService.getTasksByTaskPool(taskPoolId);
    }

    // Update a task in a task pool by teacher
    @PutMapping("/{courseCode}/{examTemplateId}/{taskPoolId}/{taskId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void updateTask(@PathVariable("taskId") Long taskId, @RequestBody TaskRequest request) {
        taskService.updateTask(taskId, request);
    }

    // Delete a task from a task pool by teacher
    @DeleteMapping("/{courseCode}/{examTemplateId}/{taskPoolId}/{taskId}")
    @PreAuthorize("hasRole('TEACHER')")
    public void deleteTask(@PathVariable("taskId") Long taskId) {
        taskService.deleteTaskById(taskId);
    }

    // Read one task's details by teacher
    @GetMapping("/{courseCode}/{examTemplateId}/{taskPoolId}/{taskId}")
    @PreAuthorize("hasRole('TEACHER')")
    public TaskDto getTaskById(@PathVariable("taskId") Long taskId, @PathVariable("taskPoolId") Long taskPoolId) {
        return taskService.getTaskById(taskId, taskPoolId);
    }

    // Generate exam papers from an exam template
    @PostMapping("/{courseCode}/{examTemplateId}/generate")
    @PreAuthorize("hasRole('TEACHER')")
    public void generateExamsPaper(@PathVariable Long examTemplateId) {
        examPaperGenerationService.generateExams(examTemplateId);
    }

    // Read all exam papers generated from an exam template
    @GetMapping("/{courseCode}/{examTemplateId}/exampapers")
    @PreAuthorize("hasRole('TEACHER')")
    public List<ExamPaperDto> getExamPapers(@PathVariable("courseCode") String courseCode,
            @PathVariable("examTemplateId") Long examTemplateId) {
        return examPaperService.getExamPapersByExamTemplate(courseCode, examTemplateId);
    }

    // Read exam paper details
    @GetMapping("/{courseCode}/{examTemplateId}/exampapers/{examPaperId}/details")
    @PreAuthorize("hasRole('TEACHER')")
    public ExamPaperDto getExamPaper(@PathVariable("courseCode") String courseCode,
            @PathVariable("examPaperId") Long examPaperId) {
        return examPaperService.getExamPaperById(courseCode, examPaperId);
    }

    // Read all tasks in an exam paper by teacher
    @GetMapping("/{courseCode}/{examTemplateId}/exampapers/{examPaperId}")
    @PreAuthorize("hasRole('TEACHER')")
    public List<TaskExamPaperDto> getExamPaperTasks(@PathVariable("courseCode") String courseCode,
            @PathVariable("examPaperId") Long examPaperId) {
        return taskExamPaperService.getTasksByExamPaper(courseCode, examPaperId);
    }

    // Read one task from an exam paper
    @GetMapping("/{courseCode}/{examTemplateId}/exampapers/{examPaperId}/{taskExamPaperId}")
    @PreAuthorize("hasRole('TEACHER')")
    public TaskExamPaperDto getExamPaperTask(@PathVariable("taskExamPaperId") Long taskExamPaperId) {
        return taskExamPaperService.getTaskById(taskExamPaperId);
    }

    // Mark a task in an exam paper
    @PutMapping("/{courseCode}/{examTemplateId}/exampapers/{examPaperId}/{taskExamPaperId}/mark")
    @PreAuthorize("hasRole('TEACHER')")
    public void markTask(@PathVariable("taskExamPaperId") Long taskExamPaperId, @RequestBody MarkRequest request) {
        taskExamPaperService.markTask(taskExamPaperId, request);
    }

    // Download a file from a file task
    @GetMapping("/{courseCode}/{examTemplateId}/exampapers/{examPaperId}/{taskExamPaperId}/file")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<byte[]> getFileFromTaskByTeacher(@PathVariable("taskExamPaperId") Long taskExamPaperId) {
        var task = taskExamPaperService.getTaskById(taskExamPaperId);
        if (task.getData() == null)
            throw new RuntimeExceptionWithHttpStatus("This task has no file uploaded", HttpStatus.NOT_FOUND);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + task.getFileName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, task.getFileFormat())
                .body(task.getData());
    }

    // Change grade manually
    @PutMapping("/{courseCode}/{examTemplateId}/exampapers/{examPaperId}/grade")
    @PreAuthorize("hasRole('TEACHER')")
    public void changeGrade(@PathVariable("examPaperId") Long examPaperId, @RequestBody GradeRequest request) {
        examPaperService.changeGrade(examPaperId, request);
    }

    @GetMapping("/{courseCode}/{examTemplateId}/statistics")
    public GradesStatisticsDTO getExamStatistics(@PathVariable Long examTemplateId) {
        return statisticService.getExamStatistics(examTemplateId);
    }
}
