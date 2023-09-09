package com.apsi.examination.repository;

import com.apsi.examination.domain.CourseEntity;
import com.apsi.examination.domain.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    List<StudentEntity> findAllByCoursesContaining(CourseEntity course);
}
