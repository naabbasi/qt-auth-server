package com.qterminals.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
  private final CORSCustomizer corsCustomizer;

  public SecurityConfig(CORSCustomizer corsCustomizer) {
    this.corsCustomizer = corsCustomizer;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    this.corsCustomizer.corsCustomizer(http);

    return http.oauth2ResourceServer(
        j -> j.jwt().jwkSetUri("http://hpitdlp20795:9000/oauth2/jwks")
    ).authorizeRequests()
        .anyRequest().authenticated()
        .and().build();
  }

}

// http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:3000/authorized&code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&code_challenge_method=S256
