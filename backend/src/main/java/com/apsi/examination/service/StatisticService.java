package com.apsi.examination.service;


import com.apsi.examination.auth.AuthService;
import com.apsi.examination.domain.ExamPaperEntity;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import com.apsi.examination.model.response.GradesStatisticsDTO;
import com.apsi.examination.repository.ExamPaperRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticService {

    private final ExamPaperRepository examPaperRepository;
    private final AuthService authService;

    public GradesStatisticsDTO getExamStatistics(Long examTemplateId) {
        var user = authService.getCurrentUser();
        var allExamPapers = examPaperRepository.findAllByExamIdAndStatusMarked(examTemplateId);

        if (allExamPapers.size() == 0) {
            throw new RuntimeExceptionWithHttpStatus("Given exam don't have any finished exam paper", HttpStatus.NOT_FOUND);
        }

        var examTemplate = allExamPapers.get(0).getExam();
//        if (!Objects.equals(examTemplate.getCourse().getCoordinator().getId(), user.getId()) || allExamPapers.stream().noneMatch(exam -> exam.getStudent().getId().equals(user.getId()))) {
//            throw new RuntimeExceptionWithHttpStatus("Current user must be cordinator of given exam or student who participated", HttpStatus.FORBIDDEN);
//        }

        Map<BigDecimal, Integer> gradesMap = getGradesMap(allExamPapers);
        Map<BigDecimal, Integer> pointsMap = getPointsMap(allExamPapers);
        BigDecimal avgPoints = getAveragePoints(allExamPapers);
        BigDecimal avgGrade = getAverageGrade(allExamPapers);

        return new GradesStatisticsDTO(gradesMap, pointsMap, avgPoints, avgGrade);
    }

    private BigDecimal getAverageGrade(List<ExamPaperEntity> allExamPapers) {
        var sum = allExamPapers.stream()
                .map(ExamPaperEntity::getGrade)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return sum.divide(new BigDecimal(allExamPapers.size()), 2, RoundingMode.HALF_DOWN);
    }

    private BigDecimal getAveragePoints(List<ExamPaperEntity> allExamPapers) {
        var sum = allExamPapers.stream()
                .map(ExamPaperEntity::getOverallPoints)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return sum.divide(new BigDecimal(allExamPapers.size()), 2, RoundingMode.HALF_DOWN);
    }

    private Map<BigDecimal, Integer> getGradesMap(List<ExamPaperEntity> allExamPapers) {
        return allExamPapers.stream()
                .map(ExamPaperEntity::getGrade)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().intValue()));
    }

    private Map<BigDecimal, Integer> getPointsMap(List<ExamPaperEntity> allExamPapers) {
        return allExamPapers.stream()
                .map(ExamPaperEntity::getOverallPoints)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().intValue()));
    }
}
