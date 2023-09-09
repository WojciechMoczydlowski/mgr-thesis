package com.apsi.examination.model.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MarkRequest {

    private BigDecimal earnedPoints;

    private String teacherComment;
}

