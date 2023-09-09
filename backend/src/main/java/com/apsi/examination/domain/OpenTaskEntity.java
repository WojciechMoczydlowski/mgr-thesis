package com.apsi.examination.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;


@Entity
@DiscriminatorValue("OPEN")
public class OpenTaskEntity extends AbstractTaskEntity {

    public OpenTaskEntity() {
        super();
    }

    @Builder
    public OpenTaskEntity(Long taskId, String taskTitle, String taskContent, TaskPoolEntity taskPool) {
        super(taskId, taskTitle, taskContent, taskPool);
    }
}