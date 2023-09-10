package com.apsi.examination.auth;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("local")
@Configuration(value = "userBootstrapBean")
@RequiredArgsConstructor
class BootstrapConfig {

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        UserEntity entity = UserEntity.builder()
                .firstname("Jan")
                .lastname("student")
                .password("$2a$10$RQKsiiViCvNo30TvOc/A5uZZxhE4KDjNfxNpn.JCCjFbC2KR5SKru") //password
                .email("jan.student@student.com")
                .role(Role.STUDENT)
                .build();

        UserEntity teacher = UserEntity.builder()
                .firstname("Rafał")
                .lastname("teacher")
                .password("$2a$10$RQKsiiViCvNo30TvOc/A5uZZxhE4KDjNfxNpn.JCCjFbC2KR5SKru") //password
                .email("rafal.teacher@teacher.com")
                .role(Role.TEACHER)
                .build();
        userRepository.save(entity);
        userRepository.save(teacher);
    }
}
