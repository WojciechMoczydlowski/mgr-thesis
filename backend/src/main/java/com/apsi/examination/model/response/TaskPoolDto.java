package com.apsi.examination.model.response;

import com.apsi.examination.domain.TaskPoolEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskPoolDto {
   private Long id;
   private String taskType;
   private String title;
   private String description;
   private BigDecimal pointsPerTask;
   private BigDecimal minPointsPerTask;
   private Integer taskDrawNumber;


   public static TaskPoolDto from(TaskPoolEntity entity) {
      return TaskPoolDto.builder()
              .id(entity.getId())
              .taskType(entity.getTaskType())
              .title(entity.getTitle())
              .description(entity.getDescription())
              .pointsPerTask(entity.getPointsPerTask())
              .minPointsPerTask(entity.getMinPointsPerTask())
              .taskDrawNumber(entity.getTaskDrawNumber())
              .build();
   }
}
