package com.qterminals.config.keys;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Component
public class CORSCustomizer {

  public void corsCustomizer(HttpSecurity http) throws Exception {
    http.cors(cors -> {
      CorsConfigurationSource source = s -> {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(List.of("http://127.0.0.1:3000", "http://hpitdlp20795:8080"));
        corsConfiguration.setAllowedHeaders(List.of("Accept", "Origin", "X-Requested-With", "Content-Type", "Accept-Language", "X-Auth-Token", "Authorization", "X-Forwarded-For"));
        corsConfiguration.setAllowedMethods(List.of("OPTIONS", "GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setExposedHeaders(List.of("Access-Control-Expose-Headers", "Set-Cookie"));
        return corsConfiguration;
      };

      cors.configurationSource(source);
    });
  }
}
