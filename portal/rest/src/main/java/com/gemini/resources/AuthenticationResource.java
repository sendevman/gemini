package com.gemini.resources;

import com.gemini.beans.forms.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/23/18
 * Time: 3:29 PM
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationResource {
    @Autowired
    AuthenticationManager authenticationManager;

    @RequestMapping(method = RequestMethod.POST)
    private User authenticate(@AuthenticationPrincipal User principal) {
        return principal;
    }


}