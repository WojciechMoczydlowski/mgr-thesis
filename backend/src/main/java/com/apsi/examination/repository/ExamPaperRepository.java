package com.apsi.examination.repository;

import com.apsi.examination.domain.ExamPaperEntity;
import com.apsi.examination.domain.ExamTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamPaperRepository extends JpaRepository<ExamPaperEntity, Long> {
    List<ExamPaperEntity> findAllByExam(ExamTemplateEntity examTemplate);

    @Query(value = "SELECT * FROM exampaper WHERE student_id = :studentId AND exam_id in (SELECT id FROM examtemplate WHERE course_code = :courseCode)", nativeQuery = true)
    List<ExamPaperEntity> findAllByCourseCodeAndStudentId(String courseCode, Long studentId);

    @Query("select e from ExamPaperEntity e where e.exam.id = :id and e.status = 'MARKED'")
    List<ExamPaperEntity> findAllByExamIdAndStatusMarked(Long id);

    // @Query(value = "SELECT ep.* FROM exampaper ep JOIN examtemplate et ON ep.exam_id = et.id WHERE (ep.status = 'WRITING' OR ep.status = 'UNRESOLVED') AND (et.date_time_end < :currentDateTime OR (ep.start_time + CAST(et.duration || ' minutes' AS interval)) < :currentDateTime)", nativeQuery = true)
    @Query(value = "SELECT * FROM exampaper", nativeQuery = true)
    List<ExamPaperEntity> findAllPassed(LocalDateTime currentDateTime);
}
