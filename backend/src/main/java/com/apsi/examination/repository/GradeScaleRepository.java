package com.apsi.examination.repository;


import com.apsi.examination.domain.GradeScaleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GradeScaleRepository extends JpaRepository<GradeScaleEntity, Long> {

}
