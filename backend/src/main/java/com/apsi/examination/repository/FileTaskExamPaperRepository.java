package com.apsi.examination.repository;

import com.apsi.examination.domain.FileTaskExamPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTaskExamPaperRepository extends JpaRepository<FileTaskExamPaperEntity, Long> {
}
