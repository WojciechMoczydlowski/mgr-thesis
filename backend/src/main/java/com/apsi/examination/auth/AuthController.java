package com.apsi.examination.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
class AuthController {
    private final AuthService authService;

    @PostMapping("/authenticate")
    AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest) {
        return authService.authenticate(authenticationRequest);
    }
}