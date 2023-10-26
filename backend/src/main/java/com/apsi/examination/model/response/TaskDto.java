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
public class TaskDto {
    private Long id;
    private Long taskPoolId;
    private String title;
    private String content;
    private BigDecimal penaltyWeight;
    private List<AnswerEntity> answers;
    private String fileFormat;
    private Integer maxFileSize;

    public static TaskDto from(AbstractTaskEntity entity, Long taskPoolId) {
        if (entity instanceof OpenTaskEntity) {
            return TaskDto.builder()
                    .id(entity.getId())
                    .taskPoolId(taskPoolId)
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .penaltyWeight(null)
                    .answers(null)
                    .fileFormat(null)
                    .maxFileSize(null)
                    .build();
        } else if (entity instanceof ClosedTaskEntity) {
            return TaskDto.builder()
                    .id(entity.getId())
                    .taskPoolId(taskPoolId)
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .penaltyWeight(((ClosedTaskEntity) entity).getPenaltyWeight())
                    .answers(((ClosedTaskEntity) entity).getAnswers())
                    .fileFormat(null)
                    .maxFileSize(null)
                    .build();
        } else {
            return TaskDto.builder()
                    .id(entity.getId())
                    .taskPoolId(taskPoolId)
                    .title(entity.getTitle())
                    .content(entity.getContent())
                    .penaltyWeight(null)
                    .answers(null)
                    .fileFormat(((FileTaskEntity) entity).getFormat())
                    .maxFileSize(((FileTaskEntity) entity).getMaximumSize())
                    .build();
        }
    }
}