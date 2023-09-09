package com.apsi.examination.model.response;

import com.apsi.examination.domain.ExamTemplateEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExamTemplateDto {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dateTimeStart;
    private LocalDateTime dateTimeEnd;
    private Integer duration;
    private ExamTemplateEntity.ExamTemplateStatus status;

    private Integer percentage30;
    private Integer percentage35;
    private Integer percentage40;
    private Integer percentage45;
    private Integer percentage50;

    public static ExamTemplateDto from(ExamTemplateEntity entity){
        return ExamTemplateDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .dateTimeStart(entity.getDateTimeStart())
                .dateTimeEnd(entity.getDateTimeEnd())
                .duration(entity.getDuration())
                .status(entity.getStatus())
                .percentage30(entity.getGradeScale().getPercentage30())
                .percentage35(entity.getGradeScale().getPercentage35())
                .percentage40(entity.getGradeScale().getPercentage40())
                .percentage45(entity.getGradeScale().getPercentage45())
                .percentage50(entity.getGradeScale().getPercentage50())
                .build();
    }
}
