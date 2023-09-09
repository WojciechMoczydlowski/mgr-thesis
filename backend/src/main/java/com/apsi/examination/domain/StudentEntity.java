package com.apsi.examination.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@DiscriminatorValue("STUDENT")
public class StudentEntity extends AbstractUserEntity {

    @ManyToMany(mappedBy = "attendants")
    private List<CourseEntity> courses;

    @OneToMany(mappedBy = "student")
    private List<ExamPaperEntity> examPapers;
}
