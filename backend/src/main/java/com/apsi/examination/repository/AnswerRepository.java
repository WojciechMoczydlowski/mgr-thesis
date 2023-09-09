package com.apsi.examination.repository;

import com.apsi.examination.domain.AnswerEntity;
import com.apsi.examination.domain.ClosedTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<AnswerEntity, Long> {
    List<AnswerEntity> findAllByTask(ClosedTaskEntity task);
}