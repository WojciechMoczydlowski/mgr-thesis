package com.apsi.examination.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course")
public class CourseEntity {

    @Id
    private String code;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "coordinator_id")
    private TeacherEntity coordinator;

    @ManyToMany
    @JoinTable(name = "Enrollment",
            inverseJoinColumns = {@JoinColumn(name = "student_id")},
            joinColumns = {@JoinColumn(name = "course_code")})
    private List<AbstractUserEntity> attendants;

    @OneToMany(mappedBy = "course")
    private List<ExamTemplateEntity> examTemplates;

}
