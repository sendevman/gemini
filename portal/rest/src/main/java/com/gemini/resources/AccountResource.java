package com.gemini.resources;

import com.gemini.beans.requests.user.ForgotPasswordRequest;
import com.gemini.beans.requests.user.RegisterRequest;
import com.gemini.beans.requests.user.ResetPasswordRequest;
import com.gemini.beans.requests.user.UserActivationRequest;
import com.gemini.beans.responses.RegisterResponse;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.services.MailService;
import com.gemini.services.UserService;
import com.gemini.utils.MessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
    @Autowired
    private MessageHelper messageHelper;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<RegisterResponse> registerAccount(@RequestBody RegisterRequest request, HttpServletRequest servletRequest) {

        if (userService.existsUserOnRegister(request.getEmail())) {
            return ResponseEntity.ok(RegisterResponse.error(messageHelper.processMessage("user.already.exists")));
        }

        //todo: make a schedule process to resent activation emails
        String key = userService.createUser(request, servletRequest);
        boolean mailSent = mailService.sendRegisterEmail(request, key);
        userService.saveSentActivationResult(request.getEmail(), mailSent);

        return ResponseEntity.ok(RegisterResponse.success());
    }

    @RequestMapping(value = "/activate/{code}")
    public ResponseEntity<Boolean> existsCode(@PathVariable String code) {
        return ResponseEntity.ok(userService.activationCodeExists(code));
    }

    @RequestMapping(value = "/activate", method = RequestMethod.POST)
    public ResponseEntity<RegisterResponse> activateAccount(@RequestBody UserActivationRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword()))
            return ResponseEntity.ok(RegisterResponse.error(messageHelper.processMessage("password.mismatch")));
        boolean activated = userService.activateUser(request);
        if (activated)
            return ResponseEntity.ok(RegisterResponse.success());
        return ResponseEntity.ok(RegisterResponse.error(messageHelper.processMessage("general.unknown.error")));
    }

    @RequestMapping(value = "/forgot/password", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> forgotPassword(@RequestBody ForgotPasswordRequest request, HttpServletRequest servletRequest) {
        boolean validRequest = userService.processForgetEmailRequest(request, servletRequest);
        if (!validRequest) {
            return ResponseEntity.ok(ResponseBase.error(messageHelper.processMessage("invalid.forgot.password.request")));
        }
        return ResponseEntity.ok(ResponseBase.success());
    }

    @RequestMapping(value = "/reset/password/{key}")
    public ResponseEntity<Boolean> existsCredentialLostKey(@PathVariable String key) {
        return ResponseEntity.ok(userService.credentialKeyExists(key));
    }

    @RequestMapping(value = "/reset/password", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean reset = userService.resetPassword(request);
        if (!reset) {
            return ResponseEntity.ok().body(ResponseBase.error(messageHelper.processMessage("reset.password.invalid")));
        }
        return ResponseEntity.ok(ResponseBase.success());
    }

    @RequestMapping(value = "/cancel/reset/password/{key}")
    public ResponseEntity<ResponseBase> cancelResetPassword(@PathVariable String key, HttpServletRequest servletRequest) {
        boolean cancel = userService.cancelResetPassword(key, servletRequest);
        if (!cancel)
            return ResponseEntity.ok().body(ResponseBase.error(messageHelper.processMessage("cancel.reset.password.invalid")));

        return ResponseEntity.ok(ResponseBase.success());
    }

}