package com.apsi.examination.repository;

import com.apsi.examination.domain.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, String> {
    Optional<CourseEntity> findByCode(String code);
    List<CourseEntity> findAllByCoordinator_Id(Long id);

    @Query(value = "SELECT * FROM course WHERE code in (SELECT course_code FROM enrollment WHERE student_id = :id)", nativeQuery = true)
    List<CourseEntity> findAllByStudentId(Long id);

    @Query(value = "SELECT * FROM course", nativeQuery = true)
    List<CourseEntity> findAll();
}
