package com.apsi.examination.model.response;

import com.apsi.examination.domain.ExamPaperEntity;
import com.apsi.examination.domain.ExamTemplateEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExamPaperDto {
    private Long id;
    private UserDto student;
    private String title;
    private String description;
    private LocalDateTime dateTimeStart;
    private LocalDateTime dateTimeEnd;
    private Integer duration;
    private BigDecimal overallPoints;
    private BigDecimal grade;
    private ExamPaperEntity.ExamPaperStatus status;

    public static ExamPaperDto from(ExamPaperEntity entity){
        return ExamPaperDto.builder()
                .id(entity.getId())
                .student(UserDto.from(entity.getStudent()))
                .title(entity.getExam().getTitle())
                .description(entity.getExam().getDescription())
                .dateTimeStart(entity.getExam().getDateTimeStart())
                .dateTimeEnd(entity.getExam().getDateTimeEnd())
                .duration(entity.getExam().getDuration())
                .overallPoints(entity.getOverallPoints())
                .grade(entity.getGrade())
                .status(entity.getStatus())
                .build();
    }
}
