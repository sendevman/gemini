package com.gemini.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 2:58 PM
 */
@RestController
@RequestMapping("/account")
public class AccountResource {

    @Autowired
    private JavaMailSender mailSender;


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    ResponseEntity registerAccount() {
        return null;
    }
}