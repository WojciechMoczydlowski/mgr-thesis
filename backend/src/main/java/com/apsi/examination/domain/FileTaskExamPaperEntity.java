package com.apsi.examination.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@DiscriminatorValue("FILE")
public class FileTaskExamPaperEntity extends AbstractTaskExamPaperEntity {

    private String fileName;
    private String fileFormat;
    private Integer fileMaxSize;

    @Lob
    private byte[] data;

    private String fileStatus; //PUBLISHED OR UNPUBLISHED
}