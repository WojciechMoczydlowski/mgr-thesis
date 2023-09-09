package com.apsi.examination.test;

import com.apsi.examination.auth.AuthService;
import com.apsi.examination.auth.User;
import com.apsi.examination.exception.RuntimeExceptionWithHttpStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    private final AuthService authService;

    @GetMapping("/user/details")
    User getCurrentUserEmail() {
        return authService.getCurrentUser();
    }
}
