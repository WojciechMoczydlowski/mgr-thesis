package com.apsi.examination.config;


import com.apsi.examination.domain.CourseEntity;
import com.apsi.examination.domain.StudentEntity;
import com.apsi.examination.domain.TeacherEntity;
import com.apsi.examination.repository.CourseRepository;
import com.apsi.examination.repository.StudentRepository;
import com.apsi.examination.repository.TeacherRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Profile("local")
@RequiredArgsConstructor
public class Bootstrap {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;


    @PostConstruct
    public void init() {
        
        // var teacher = new TeacherEntity();
        // teacher.setFirstname("Jan");
        // teacher.setLastname("kowalski");
        // teacher.setCourses(new ArrayList<>());
        
        // StudentEntity student =  studentRepository.findByEmail("jan.student@student.com").orElseThrow(() -> new RuntimeExceptionWithHttpStatus("can't find bootstraped teacher", HttpStatus.NOT_FOUND));
        
        // var course = CourseEntity.builder()
        //         .code("APSI") 
        //         .name("Analiza i projektowanie systemów informacyjnych")
        //         .description("not so long description")
        //         .attendants(List.of(student))
        //         .coordinator(teacher)
        //         .build();
        // teacher.getCourses().add(course);
        // student.setCourses(List.of(course));

        // studentRepository.save(student);
        // teacherRepository.save(teacher);
        // courseRepository.save(course);
    }
}