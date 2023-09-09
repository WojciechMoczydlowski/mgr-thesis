package com.apsi.examination.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@DiscriminatorValue("CLOSED")
public class ClosedTaskEntity extends AbstractTaskEntity {

    private BigDecimal penaltyWeight;

    @OneToMany(mappedBy = "task")
    private List<AnswerEntity> answers;

    public ClosedTaskEntity() {
        super();
    }

    @Builder
    public ClosedTaskEntity(Long taskId, String taskTitle, String taskContent, TaskPoolEntity taskPool, BigDecimal penaltyWeight, List<AnswerEntity> answers) {
        super(taskId, taskTitle, taskContent, taskPool);
        this.penaltyWeight = penaltyWeight;
        this.answers = answers;
    }

    @JsonManagedReference
    public List<AnswerEntity> getAnswers() {
        return answers;
    }

}