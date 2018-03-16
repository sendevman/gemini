package com.gemini.beans.requests.user;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/13/18
 * Time: 8:27 PM
 */
public class UserActivationRequest {
    
    private String activationCode;
    private String password;
    private String confirmPassword;

    public String getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(String activationCode) {
        this.activationCode = activationCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}