package com.apsi.examination.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "taskpool")
public class TaskPoolEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskType;

    private String title;

    private String description;

    private Integer taskDrawNumber;

    private BigDecimal pointsPerTask;

    @Builder.Default
    private BigDecimal minPointsPerTask = BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private ExamTemplateEntity exam;

    @OneToMany(mappedBy = "pool")
    private List<AbstractTaskEntity> tasks;

}