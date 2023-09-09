package com.apsi.examination.repository;

import com.apsi.examination.domain.ClosedTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClosedTaskRepository extends JpaRepository<ClosedTaskEntity, Long> {
}
