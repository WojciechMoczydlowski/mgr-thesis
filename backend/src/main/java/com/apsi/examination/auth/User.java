package com.apsi.examination.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class User {
    private String name;
    private Long id;
    private Role role;

    static User from(UserEntity entity) {
        return new User(entity.getUsername(),entity.getId(), entity.getRole());
    }
}
