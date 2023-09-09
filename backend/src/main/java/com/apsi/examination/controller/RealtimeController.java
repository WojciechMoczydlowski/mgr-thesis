package com.apsi.examination.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/server")
public class RealtimeController {

    @GetMapping("/time")
    public LocalDateTime getServerTime() {
        return LocalDateTime.now();
    }
}
