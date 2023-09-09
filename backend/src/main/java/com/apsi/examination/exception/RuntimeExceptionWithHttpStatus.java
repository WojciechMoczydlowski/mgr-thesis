package com.apsi.examination.exception;

import org.springframework.http.HttpStatus;

public class RuntimeExceptionWithHttpStatus extends RuntimeException {
    protected HttpStatus status;

    public RuntimeExceptionWithHttpStatus(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
