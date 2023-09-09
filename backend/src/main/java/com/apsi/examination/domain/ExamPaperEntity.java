package com.apsi.examination.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exampaper")
public class ExamPaperEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal overallPoints;

    private LocalDateTime startTime;

    private BigDecimal grade;

    @Enumerated(EnumType.STRING)
    private ExamPaperStatus status;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private ExamTemplateEntity exam;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentEntity student;

    @OneToMany(mappedBy = "examPaper", cascade = CascadeType.ALL)
    private List<AbstractTaskExamPaperEntity> tasksExamPaper;

    public enum ExamPaperStatus {
        UNRESOLVED, WRITING, RESOLVED, MARKED
    }

}