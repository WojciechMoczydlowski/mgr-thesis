package com.apsi.examination.repository;

import com.apsi.examination.domain.OpenTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenTaskRepository extends JpaRepository<OpenTaskEntity, Long> {
}