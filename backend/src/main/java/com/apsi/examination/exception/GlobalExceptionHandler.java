package com.apsi.examination.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeExceptionWithHttpStatus.class)
    public ResponseEntity<String> handleResourceNotFoundException(RuntimeExceptionWithHttpStatus ex) {
        return ResponseEntity.status(ex.status).body(ex.getMessage());
    }
}
