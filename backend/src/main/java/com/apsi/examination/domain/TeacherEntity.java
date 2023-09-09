package com.apsi.examination.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
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
@DiscriminatorValue("TEACHER")
public class TeacherEntity extends AbstractUserEntity {

    @OneToMany(mappedBy = "coordinator")
    private List<CourseEntity> courses;
}
