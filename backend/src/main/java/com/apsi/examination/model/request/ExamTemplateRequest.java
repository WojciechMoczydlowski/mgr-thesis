package com.apsi.examination.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExamTemplateRequest {
    private String title;
    private String description;
    private LocalDateTime dateTimeStart;
    private LocalDateTime dateTimeEnd;
    private Integer duration;

    private Integer percentage30 = 50;
    private Integer percentage35 = 60;
    private Integer percentage40 = 70;
    private Integer percentage45 = 80;
    private Integer percentage50 = 90;
}
