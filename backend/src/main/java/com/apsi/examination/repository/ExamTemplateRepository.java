package com.apsi.examination.repository;

import com.apsi.examination.domain.ExamTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamTemplateRepository extends JpaRepository<ExamTemplateEntity, Long> {

    List<ExamTemplateEntity> findAllByCourseCode(String courseCode);

    List<ExamTemplateEntity> findAllByDateTimeEndBefore(LocalDateTime dateTime);
}
