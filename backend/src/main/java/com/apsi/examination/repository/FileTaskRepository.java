package com.apsi.examination.repository;

import com.apsi.examination.domain.FileTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileTaskRepository extends JpaRepository<FileTaskEntity, Long>{
}
