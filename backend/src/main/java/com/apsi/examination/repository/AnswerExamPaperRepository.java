package com.apsi.examination.repository;

import com.apsi.examination.domain.AnswerExamPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerExamPaperRepository extends JpaRepository<AnswerExamPaperEntity, Long> {
}
