package com.apsi.examination.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;


@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@DiscriminatorValue("CLOSED")
public class ClosedTaskExamPaperEntity extends AbstractTaskExamPaperEntity {

    private BigDecimal penaltyWeight;

    private BigDecimal minPoints;

    @OneToMany(mappedBy = "taskExamPaper", cascade = CascadeType.ALL)
    private List<AnswerExamPaperEntity> answersExamPaper;

    @JsonManagedReference
    public List<AnswerExamPaperEntity> getAnswersExamPaper() {
        return answersExamPaper;
    }
}