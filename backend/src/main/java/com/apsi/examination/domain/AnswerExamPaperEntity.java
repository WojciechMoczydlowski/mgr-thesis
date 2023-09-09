package com.apsi.examination.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "answerexampaper")
public class AnswerExamPaperEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Integer weight;

    private Boolean isCorrect;

    private Boolean isMarked;

    @ManyToOne
    @JoinColumn(name = "closedtaskexampaper_id")
    private ClosedTaskExamPaperEntity taskExamPaper;

    @JsonBackReference
    public ClosedTaskExamPaperEntity getTaskExamPaper(){
        return taskExamPaper;
    }

}
