package com.apsi.examination.repository;

import com.apsi.examination.domain.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {
    Optional<TeacherEntity> findByEmail(String email);

    @Query("select  c.coordinator from CourseEntity c  where c.code = :courseCode")
    Optional<TeacherEntity> findByCourseCode(String courseCode);
}
