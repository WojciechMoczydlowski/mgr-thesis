package com.apsi.examination.model.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskExamPaperRequest {

    //specific for open tasks
    private String answerOpenTask;

    //specific for closed tasks
    private List<AnswerExamPaperRequest> answersClosedTask;

    //specific for file tasks
    private MultipartFile file;
}
