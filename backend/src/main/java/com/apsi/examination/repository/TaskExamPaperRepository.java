package com.apsi.examination.repository;

import com.apsi.examination.domain.AbstractTaskExamPaperEntity;
import com.apsi.examination.domain.ExamPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskExamPaperRepository extends JpaRepository<AbstractTaskExamPaperEntity, Long> {
    List<AbstractTaskExamPaperEntity> findAllByExamPaper(ExamPaperEntity examPaper);
}
