package com.apsi.examination.repository;

import com.apsi.examination.domain.ClosedTaskExamPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClosedTaskExamPaperRepository extends JpaRepository<ClosedTaskExamPaperEntity, Long> {
}
