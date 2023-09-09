package com.apsi.examination.repository;

import com.apsi.examination.domain.AbstractTaskEntity;
import com.apsi.examination.domain.TaskPoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<AbstractTaskEntity, Long> {
    List<AbstractTaskEntity> findAllByPool(TaskPoolEntity taskPool);
}

