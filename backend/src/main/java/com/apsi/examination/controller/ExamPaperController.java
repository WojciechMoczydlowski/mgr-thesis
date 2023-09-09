package com.apsi.examination.controller;

import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.request.TaskExamPaperRequest;
import com.apsi.examination.model.response.*;
import com.apsi.examination.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/student/courses")
public class ExamPaperController {

    private final CourseService courseService;
    private final ExamPaperService examPaperService;
    private final TaskExamPaperService taskExamPaperService;

    //STUDENT

    //Read all student courses
    @GetMapping
    @PreAuthorize("hasRole('STUDENT')")
    public List<CourseDto> getStudentCourses() { return courseService.getStudentCourses();}


    //Read all exam papers in a course by student
    @GetMapping("/{courseCode}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<ExamPaperDto> getCourseExamPapers(@PathVariable String courseCode) {
        return examPaperService.getExamPapersByCourse(courseCode);
    }

    //Read all tasks in an exam paper by student
    @GetMapping("/{courseCode}/{examPaperId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<TaskExamPaperDto> getExamPaperTasks(@PathVariable("courseCode") String courseCode, @PathVariable("examPaperId") Long examPaperId) {
        return taskExamPaperService.getTasksByExamPaper(courseCode, examPaperId);
    }

    //Read exam paper details
    @GetMapping("/{courseCode}/{examPaperId}/details")
    @PreAuthorize("hasRole('STUDENT')")
    public ExamPaperDto getExamPaper(@PathVariable("courseCode") String courseCode, @PathVariable("examPaperId") Long examPaperId) {
        return examPaperService.getExamPaperById(courseCode, examPaperId);
    }

    //Read a task in an exam paper by student
    @GetMapping("/{courseCode}/{examPaperId}/{taskExamPaperId}")
    @PreAuthorize("hasRole('STUDENT')")
    public TaskExamPaperDto getExamPaperTask(@PathVariable("taskExamPaperId") Long taskExamPaperId) {
        return taskExamPaperService.getTaskById(taskExamPaperId);
    }

    //Update a task in an exam paper by student
    @PutMapping("/{courseCode}/{examPaperId}/{taskExamPaperId}")
    @PreAuthorize("hasRole('STUDENT')")
    public void updateExamPaperTask(@PathVariable("taskExamPaperId") Long taskExamPaperId, @RequestBody TaskExamPaperRequest request) {
        taskExamPaperService.updateTaskExamPaper(taskExamPaperId, request);
    }

    //Update a task with file in an exam paper by student
    @PutMapping("/{courseCode}/{examPaperId}/{taskExamPaperId}/file")
    @PreAuthorize("hasRole('STUDENT')")
    public void updateExamPaperFileTask(@PathVariable("taskExamPaperId") Long taskExamPaperId, @RequestParam MultipartFile file) {
        taskExamPaperService.updateFileTaskExamPaper(taskExamPaperId, file);
    }

    //Download a file from task (file sent earlier)
    @GetMapping("/{courseCode}/{examPaperId}/{taskExamPaperId}/file")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<byte[]> getFileFromTaskByStudent(@PathVariable("taskExamPaperId") Long taskExamPaperId) {
        var task = taskExamPaperService.getTaskById(taskExamPaperId);
        if (task.getData() == null)
            throw new RuntimeExceptionWithHttpStatus("This task has no file uploaded", HttpStatus.NOT_FOUND);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + task.getFileName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, task.getFileFormat())
                .body(task.getData());
    }

    //Start the exam
    @PostMapping("/{courseCode}/{examPaperId}/start")
    @PreAuthorize("hasRole('STUDENT')")
    public void startExamPaper(@PathVariable Long examPaperId) {
        examPaperService.startExamPaper(examPaperId);
    }

    //Submit the exam manually
    @PostMapping("/{courseCode}/{examPaperId}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public void submitExamPaper(@PathVariable Long examPaperId) {
        examPaperService.submitExamPaper(examPaperId);
    }

    //Get exam paper end time
    @GetMapping("/{courseCode}/{examPaperId}/time/end")
    public LocalDateTime getEndTimeOfExamPaper(@PathVariable Long examPaperId) {
        return examPaperService.getEndTimeOfExamPaper(examPaperId);
    }

    //Read marked tasks in exam paper by student
    @GetMapping("/{courseCode}/{examPaperId}/marking_details")
    @PreAuthorize("hasRole('STUDENT')")
    public List<TaskExamPaperDto> getExamPaperMarkedTasks(@PathVariable("examPaperId") Long examPaperId) {
        return taskExamPaperService.getTasksResultsByExamPaper(examPaperId);
    }
}
