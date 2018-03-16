package com.gemini.beans.requests.user;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/6/18
 * Time: 2:33 PM
 */
public class RegisterRequest {

    private String email;
    private String confirmEmail;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getConfirmEmail() {
        return confirmEmail;
    }

    public void setConfirmEmail(String confirmEmail) {
        this.confirmEmail = confirmEmail;
    }
}