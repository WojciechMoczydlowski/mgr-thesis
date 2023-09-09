package com.apsi.examination.repository;

import com.apsi.examination.domain.OpenTaskExamPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenTaskExamPaperRepository extends JpaRepository<OpenTaskExamPaperEntity, Long> {
}
