package com.apsi.examination.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequest {
    private Long id;
    private String content;
    private Integer weight;
    private Boolean isCorrect;
}