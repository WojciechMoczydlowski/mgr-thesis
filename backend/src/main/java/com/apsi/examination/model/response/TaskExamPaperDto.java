package com.apsi.examination.model.response;

import com.apsi.examination.domain.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskExamPaperDto {
    //for all types of tasks
    private Long id;
    private String type;
    private String title;
    private String content;
    private BigDecimal maxPoints;
    private BigDecimal earnedPoints;
    private String teacherComment;

    //specific for open tasks
    private String answer;

    //specific for closed tasks
    private BigDecimal penaltyWeight;
    private BigDecimal minPoints;
    private List<AnswerExamPaperEntity> answersExamPaper;

    //specific for file tasks
    private String fileName;
    private String fileFormat;
    private byte[] data;
    private String fileStatus;

    public static TaskExamPaperDto from(AbstractTaskExamPaperEntity entity) {
        if (entity instanceof OpenTaskExamPaperEntity) {
            return TaskExamPaperDto.builder()
                    .id(entity.getId())
                    .type("OPEN")
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .maxPoints(entity.getMaxPoints())
                    .earnedPoints(entity.getEarnedPoints())
                    .teacherComment(entity.getTeacherComment())
                    .answer(((OpenTaskExamPaperEntity) entity).getAnswer())
                    .penaltyWeight(null)
                    .minPoints(null)
                    .answersExamPaper(null)
                    .fileName(null)
                    .fileFormat(null)
                    .data(null)
                    .fileStatus(null)
                    .build();
        } else if (entity instanceof ClosedTaskExamPaperEntity) {
            return TaskExamPaperDto.builder()
                    .id(entity.getId())
                    .type("CLOSED")
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .maxPoints(entity.getMaxPoints())
                    .earnedPoints(entity.getEarnedPoints())
                    .teacherComment(entity.getTeacherComment())
                    .answer(null)
                    .penaltyWeight(((ClosedTaskExamPaperEntity) entity).getPenaltyWeight())
                    .minPoints((((ClosedTaskExamPaperEntity) entity).getMinPoints()))
                    .answersExamPaper(((ClosedTaskExamPaperEntity) entity).getAnswersExamPaper())
                    .fileName(null)
                    .fileFormat(null)
                    .data(null)
                    .fileStatus(null)
                    .build();
        } else {
            return TaskExamPaperDto.builder()
                    .id(entity.getId())
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .maxPoints(entity.getMaxPoints())
                    .earnedPoints(entity.getEarnedPoints())
                    .teacherComment(entity.getTeacherComment())
                    .answer(null)
                    .penaltyWeight(null)
                    .minPoints(null)
                    .answersExamPaper(null)
                    .fileName(((FileTaskExamPaperEntity) entity).getFileName())
                    .fileFormat(((FileTaskExamPaperEntity) entity).getFileFormat())
                    .data(((FileTaskExamPaperEntity) entity).getData())
                    .fileStatus(((FileTaskExamPaperEntity) entity).getFileStatus())
                    .build();
        }
    }

}
