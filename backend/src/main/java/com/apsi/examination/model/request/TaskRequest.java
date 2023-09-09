package com.apsi.examination.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {
    //for all types of tasks
    private String title;
    private String content;

    //specific for closed tasks
    private BigDecimal penaltyWeight;
    private List<AnswerRequest> answers;

    //specific for tasks with file
    private String fileFormat;
    private Integer maxFileSize;
}
