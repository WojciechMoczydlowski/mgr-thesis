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
@Table(name = "answer")
public class AnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Integer weight;

    private Boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "closedtask_id")
    private ClosedTaskEntity task;

    @JsonBackReference
    public ClosedTaskEntity getTask(){
        return task;
    }
}