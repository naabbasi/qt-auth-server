package com.qterminals;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Component
public class CORSCustomizer {
    public void corsCustomizer(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors(c -> {
            CorsConfigurationSource corsConfigurationSource = cs -> {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.setAllowCredentials(true);
                corsConfiguration.setAllowedOrigins(List.of("http://127.0.0.1:3000"));
                corsConfiguration.setAllowedHeaders(List.of("*"));
                corsConfiguration.setAllowedMethods(List.of("*"));

                return corsConfiguration;
            };

            c.configurationSource(corsConfigurationSource);
        });
    }
}
