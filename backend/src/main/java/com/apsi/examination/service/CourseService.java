package com.apsi.examination.service;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.Role;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.response.CourseDto;
import com.apsi.examination.model.response.ExamTemplateDto;
import com.apsi.examination.model.response.UserDto;
import com.apsi.examination.repository.CourseRepository;
import com.apsi.examination.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;
    private final AuthService authService;

    public List<CourseDto> getTeacherCourses() {
        var user = authService.getCurrentUser();
        if (user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Cannot find coordinated courses for the current user", HttpStatus.UNAUTHORIZED);
        }

        return courseRepository.findAllByCoordinator_Id(user.getId())
                .stream()
                .map(CourseDto::from)
                .collect(Collectors.toList());
    }

    public List<CourseDto> getStudentCourses() {
        var user = authService.getCurrentUser();
        if (user.getRole() != Role.STUDENT) {
            throw new RuntimeExceptionWithHttpStatus("Cannot find courses for the current user", HttpStatus.UNAUTHORIZED);
        }

        return courseRepository.findAllByStudentId(user.getId())
                .stream()
                .map(CourseDto::from)
                .collect(Collectors.toList());
    }

    public List<UserDto> getAttendants(String courseCode) {
        var user = authService.getCurrentUser();
        if(user.getRole() != Role.TEACHER) {
            throw new RuntimeExceptionWithHttpStatus("Current user cannot read course attendants", HttpStatus.UNAUTHORIZED);
        }
        var teacher = teacherRepository.findByCourseCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Coordinator of this course cannot be found", HttpStatus.NOT_FOUND));
        if (!Objects.equals(user.getId(), teacher.getId())) {
            throw new RuntimeExceptionWithHttpStatus("Forbidden operation", HttpStatus.FORBIDDEN);
        }
        var course = courseRepository.findByCode(courseCode)
                .orElseThrow(() -> new RuntimeExceptionWithHttpStatus("Course with given code cannot be found", HttpStatus.NOT_FOUND));

        return course.getAttendants()
                .stream()
                .map(UserDto::from)
                .collect(Collectors.toList());
    }
}