package com.apsi.examination.auth;

import lombok.Data;

@Data
class AuthenticationRequest {
    private String email;
    private String password;
}