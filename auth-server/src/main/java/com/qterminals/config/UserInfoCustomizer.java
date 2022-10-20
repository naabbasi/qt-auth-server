package com.qterminals.config;

import org.springframework.security.config.annotation.web.configurers.oauth2.server.authorization.OidcConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.authorization.OidcUserInfoEndpointConfigurer;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;

import java.util.HashMap;
import java.util.Map;

public class UserInfoCustomizer {
    private OidcConfigurer oidcConfigurer;

    private UserInfoCustomizer() {
    }

    public UserInfoCustomizer(OidcConfigurer oidcConfigurer) {
        this.oidcConfigurer = oidcConfigurer;
    }

    public OidcConfigurer build() {
        if (this.oidcConfigurer != null) {
            oidcConfigurer.userInfoEndpoint(oidcUserInfoEndpointConfigurer -> customizeUserInfoResponse(oidcUserInfoEndpointConfigurer));
        }

        return this.oidcConfigurer;
    }

    private OidcUserInfoEndpointConfigurer customizeUserInfoResponse(OidcUserInfoEndpointConfigurer oidcUserInfoEndpointConfigurer) {
        oidcUserInfoEndpointConfigurer.userInfoMapper((oidcUserInfoAuthenticationContext) -> {
            OAuth2Authorization oAuth2Authorization = oidcUserInfoAuthenticationContext.getAuthorization();

            Map<String, Object> claims = new HashMap<>();
            claims.put("sub", oAuth2Authorization.getPrincipalName());
            claims.put("username", "Noman Ali Abbasi");
            OidcUserInfo oidcUserInfo = new OidcUserInfo(claims);
            return oidcUserInfo;
        });

        return oidcUserInfoEndpointConfigurer;
    }
}
