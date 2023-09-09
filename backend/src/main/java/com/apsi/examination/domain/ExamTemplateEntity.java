package com.apsi.examination.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "examtemplate")
public class ExamTemplateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDateTime dateTimeStart;

    private LocalDateTime dateTimeEnd;

    private Integer duration;

    @Enumerated(EnumType.STRING)
    private ExamTemplateEntity.ExamTemplateStatus status;

    @ManyToOne
    @JoinColumn(name = "gradescale_id")
    private GradeScaleEntity gradeScale;

    @ManyToOne
    @JoinColumn(name = "course_code")
    private CourseEntity course;

    @OneToMany(mappedBy = "exam")
    private List<TaskPoolEntity> taskPools;

    @OneToMany(mappedBy = "exam")
    private List<ExamPaperEntity> examPapers;

    public enum ExamTemplateStatus {
        CREATED, GENERATED, FINISHED
    }
}
