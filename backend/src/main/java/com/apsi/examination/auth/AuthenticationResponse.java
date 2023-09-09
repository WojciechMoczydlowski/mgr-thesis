package com.apsi.examination.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
class AuthenticationResponse {
    private String jwt;
    private String username;
}
