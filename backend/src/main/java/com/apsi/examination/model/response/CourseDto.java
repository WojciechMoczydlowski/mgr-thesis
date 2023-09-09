package com.apsi.examination.model.response;

import com.apsi.examination.domain.CourseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private String code;
    private String name;
    private String description;

    public static CourseDto from(CourseEntity entity) {
        return CourseDto.builder()
                .code(entity.getCode())
                .name(entity.getName())
                .description(entity.getDescription())
                .build();
    }
}
