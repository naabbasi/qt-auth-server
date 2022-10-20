package com.qterminals;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class PkceUtil {
    String generateCodeVerifier() throws UnsupportedEncodingException {
        SecureRandom secureRandom = new SecureRandom();
        byte[] codeVerifier = new byte[32];
        secureRandom.nextBytes(codeVerifier);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(codeVerifier);
    }

    String generateCodeChallange(String codeVerifier) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        byte[] bytes = codeVerifier.getBytes("US-ASCII");
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(bytes, 0, bytes.length);
        byte[] digest = messageDigest.digest();
        return Base64.getUrlEncoder().withoutPadding().encodeToString(digest);
    }

    public static void main(String[] args) {
        try {

            PkceUtil pkce = new PkceUtil();

            String codeVerifier = pkce.generateCodeVerifier();
            System.out.println("Code verifier = " + codeVerifier);

            String codeChallenge = pkce.generateCodeChallange(codeVerifier);
            System.out.println("Code challenge = " + codeChallenge);

        } catch (UnsupportedEncodingException | NoSuchAlgorithmException ex) {
            ex.printStackTrace();
        }
    }
}