package com.apsi.examination.repository;

import com.apsi.examination.domain.ExamTemplateEntity;
import com.apsi.examination.domain.TaskPoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskPoolRepository extends JpaRepository<TaskPoolEntity, Long> {
    List<TaskPoolEntity> findAllByExam(ExamTemplateEntity examTemplate);
}


