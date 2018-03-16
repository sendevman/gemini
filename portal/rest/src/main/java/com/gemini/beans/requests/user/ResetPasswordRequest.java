package com.gemini.beans.requests.user;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/16/18
 * Time: 1:26 AM
 */
public class ResetPasswordRequest {

    private String credentialLostKey;
    private String password;
    private String confirmPassword;

    public String getCredentialLostKey() {
        return credentialLostKey;
    }

    public void setCredentialLostKey(String credentialLostKey) {
        this.credentialLostKey = credentialLostKey;
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