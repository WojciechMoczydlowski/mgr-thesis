package com.apsi.examination.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerExamPaperRequest {
    private Long id;
    private Boolean isMarked;
}
