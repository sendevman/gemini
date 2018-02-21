package com.gemini.resources;

import com.gemini.beans.responses.RegisterResponse;
import com.gemini.beans.UserBean;
import com.gemini.beans.requests.UserActivationRequest;
import com.gemini.services.MailService;
import com.gemini.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private MailService mailService;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<RegisterResponse> registerAccount(@RequestBody UserBean userBean) {

        //todo: form data validation
        if (userService.existsUser(userBean.getEmail())) {
            return ResponseEntity.ok(RegisterResponse.error("User already exists"));
        }

        //todo: make a schedule process to resent activation emails
        String activationCode = userService.createUser(userBean);
        boolean mailSent = mailService.sendRegisterEmail(userBean, activationCode);
        userService.saveSentActivationResult(userBean.getEmail(), mailSent);
        return ResponseEntity.ok(RegisterResponse.success());
    }

    @RequestMapping(value = "/activate/{code}")
    public ResponseEntity<Boolean> existsCode(@PathVariable String code) {
        return ResponseEntity.ok(userService.activationCodeExists(code));
    }

    @RequestMapping(value = "/activate", method = RequestMethod.POST)
    public ResponseEntity<RegisterResponse> activateAccount(@RequestBody UserActivationRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword()))
            return ResponseEntity.ok(RegisterResponse.error("password fields missmatch"));
        boolean activated = userService.activateUser(request);
        if (activated)
            return ResponseEntity.ok(RegisterResponse.success());
        return ResponseEntity.ok(RegisterResponse.error("unknown error"));
    }

//    @RequestMapping(value = "/forgot/password", method = RequestMethod.POST)
//    public ResponseEntity forgotPassword(@RequestBody UserBean userBean){
//        return null;
//    }
//
//    @RequestMapping(value = "/forgot/password", method = RequestMethod.POST)
//    public ResponseEntity forgotUsername(@RequestBody UserBean userBean){
//        return null;
//    }
}