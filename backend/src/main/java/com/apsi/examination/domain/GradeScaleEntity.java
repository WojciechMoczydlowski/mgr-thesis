package com.apsi.examination.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "gradescale")
public class GradeScaleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private Integer percentage30 = 50;

    @Builder.Default
    private Integer percentage35 = 60;

    @Builder.Default
    private Integer percentage40 = 70;

    @Builder.Default
    private Integer percentage45 = 80;

    @Builder.Default
    private Integer percentage50 = 90;

}
