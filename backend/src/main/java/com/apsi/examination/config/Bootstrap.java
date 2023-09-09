package com.apsi.examination.config;


import com.apsi.examination.domain.CourseEntity;
import com.apsi.examination.domain.StudentEntity;
import com.apsi.examination.domain.TeacherEntity;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.repository.CourseRepository;
import com.apsi.examination.repository.StudentRepository;
import com.apsi.examination.repository.TeacherRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Profile("local")
@RequiredArgsConstructor
@DependsOn(value = { "userBootstrapBean"})
public class Bootstrap {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;

    @PostConstruct
    public void init() {
        var student = new StudentEntity();
        student.setFirstname("Jan");
        student.setLastname("kowalski");
        student.setCourses(new ArrayList<>());

        TeacherEntity teacher = teacherRepository.findByEmail("rafal.nowak@gmail.com").orElseThrow(() -> new RuntimeExceptionWithHttpStatus("can't find bootstraped teacher", HttpStatus.NOT_FOUND));

        var course = CourseEntity.builder()
                .code("APSI")
                .name("Analiza i projektowanie systemów informacyjnych")
                .description("not so long description")
                .attendants(List.of(student))
                .coordinator(teacher)
                .build();
        teacher.setCourses(List.of(course));
        student.getCourses().add(course);

        studentRepository.save(student);
        courseRepository.save(course);
        teacherRepository.save(teacher);
    }
}
