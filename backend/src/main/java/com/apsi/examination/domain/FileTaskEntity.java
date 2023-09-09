package com.apsi.examination.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("FILE")
public class FileTaskEntity extends AbstractTaskEntity {

    private String format;
    private Integer maximumSize;

    public FileTaskEntity() {
        super();
    }

    @Builder
    public FileTaskEntity(Long taskId, String taskTitle, String taskContent, TaskPoolEntity taskPool, String fileFormat, int maxFileSize) {
        super(taskId, taskTitle, taskContent, taskPool);
        this.format = fileFormat;
        this.maximumSize = maxFileSize;
    }
}