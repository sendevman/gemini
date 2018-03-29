package com.gemini.beans.internal;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/29/18
 * Time: 8:06 AM
 */
public class RequestSearchResult {
    private Long requestId;
    boolean exists;
    boolean belongsToUser;
    boolean completed;

    public boolean cannotUseRequest(){
        return exists && !belongsToUser;
    }

    public boolean requestIsCompleted(){
        return exists && belongsToUser && completed;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    public boolean isBelongsToUser() {
        return belongsToUser;
    }

    public void setBelongsToUser(boolean belongsToUser) {
        this.belongsToUser = belongsToUser;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }
}