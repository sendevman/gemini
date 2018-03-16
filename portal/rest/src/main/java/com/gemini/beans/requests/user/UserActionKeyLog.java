package com.gemini.beans.requests.user;

import com.gemini.beans.internal.UserAction;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/16/18
 * Time: 2:46 PM
 */
public class UserActionKeyLog {
    private UserAction action;
    private String remoteIp;
    private String key;

    public UserAction getAction() {
        return action;
    }

    public void setAction(UserAction action) {
        this.action = action;
    }

    public String getRemoteIp() {
        return remoteIp;
    }

    public void setRemoteIp(String remoteIp) {
        this.remoteIp = remoteIp;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}