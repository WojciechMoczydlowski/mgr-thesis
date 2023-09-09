package com.apsi.examination.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskPoolRequest {
    private String taskType;
    private String title;
    private String description;
    private BigDecimal pointsPerTask;
    private BigDecimal minPointsPerTask = BigDecimal.ZERO;
    private Integer taskDrawNumber;
}
