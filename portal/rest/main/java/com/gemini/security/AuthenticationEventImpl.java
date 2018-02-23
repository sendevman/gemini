package com.gemini.security;

import org.springframework.security.authentication.AuthenticationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/23/18
 * Time: 3:15 PM
 */
public class AuthenticationEventImpl implements AuthenticationEventPublisher {
    @Override
    public void publishAuthenticationSuccess(Authentication authentication) {

    }

    @Override
    public void publishAuthenticationFailure(AuthenticationException exception, Authentication authentication) {

    }
}