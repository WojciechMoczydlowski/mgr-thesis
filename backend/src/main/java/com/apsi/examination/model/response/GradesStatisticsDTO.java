package com.apsi.examination.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GradesStatisticsDTO {
    private Map<BigDecimal, Integer> gradesHistogramMap;
    private Map<BigDecimal, Integer> pointsHistogramMap;
    private BigDecimal averagePoints;
    private BigDecimal averageGrade;
}
