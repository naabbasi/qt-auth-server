package com.qterminals.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.core.oidc.endpoint.OidcParameterNames;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;

@Configuration
public class TokenCustomizerConfig {
    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer(/*OidcUserInfoService userInfoService*/) {
        return (context) -> {
            if (OidcParameterNames.ID_TOKEN.equals(context.getTokenType().getValue())) {
                //OidcUserInfo userInfo = userInfoService.loadUser(context.getPrincipal().getName());
                JwtClaimsSet jwtClaimsSet = context.getClaims().build();
                System.out.println(jwtClaimsSet.getClaims());
                //context.getClaims().claims(claims -> claims.putAll(userInfo.getClaims()));
            } else if ("access_token".equals(context.getTokenType().getValue())) {
                JwtClaimsSet.Builder claimsBuilder = context.getClaims();
                claimsBuilder.claims(claims -> {
                    claims.put("SCOPE", "OPERATOR");
                    claims.put("USER_CONTEXT", "USER_CONTEXT");
                });

                JwtClaimsSet jwtClaimsSet = claimsBuilder.build();
                System.out.println(jwtClaimsSet.getClaims());
            }
        };
    }
}