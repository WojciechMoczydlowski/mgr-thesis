package com.apsi.examination.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder
@NoArgsConstructor
@Data
@Entity
@Table(name = "_taskexampaper")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public abstract class AbstractTaskExamPaperEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private BigDecimal maxPoints;

    private BigDecimal earnedPoints;

    private String teacherComment;

    @ManyToOne
    @JoinColumn(name = "exampaper_id")
    private ExamPaperEntity examPaper;

}
