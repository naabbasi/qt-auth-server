package com.qterminals;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OAuth2LoginController {

    @GetMapping
    public Map<String, Object> index(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                                     @AuthenticationPrincipal OAuth2User oauth2User) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userName", oauth2User.getName());
        userInfo.put("clientName", authorizedClient.getClientRegistration().getClientName());
        userInfo.put("userAttributes", oauth2User.getAttributes());
        return userInfo;
    }

    @GetMapping("/authorized")
    public Map<String, Object> authorized(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                                     @AuthenticationPrincipal OAuth2User oauth2User) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userName", oauth2User.getName());
        userInfo.put("clientName", authorizedClient.getClientRegistration().getClientName());
        userInfo.put("userAttributes", oauth2User.getAttributes());
        return userInfo;
    }

    @GetMapping("/oauth/redirect")
    public void redirect(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                                        @AuthenticationPrincipal OAuth2User oauth2User, HttpServletResponse httpServletResponse) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userName", oauth2User.getName());
        userInfo.put("clientName", authorizedClient.getClientRegistration().getClientName());
        userInfo.put("userAttributes", oauth2User.getAttributes());


		try {
			if(oauth2User != null){
                OAuth2AccessToken oAuth2AccessToken = authorizedClient.getAccessToken();
				httpServletResponse.sendRedirect("http://127.0.0.1:3000/authorized?token=" + oAuth2AccessToken.getTokenValue());
			} else {
				httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
    }
}