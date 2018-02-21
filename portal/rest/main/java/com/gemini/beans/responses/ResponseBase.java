package com.gemini.beans.responses;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:24 PM
 */
public class ResponseBase {
    private String message;
    private boolean successfulOperation;
    private boolean errorOperation;

    public ResponseBase() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccessfulOperation() {
        return successfulOperation;
    }

    public void setSuccessfulOperation(boolean successfulOperation) {
        this.successfulOperation = successfulOperation;
    }

    public boolean isErrorOperation() {
        return errorOperation;
    }

    public void setErrorOperation(boolean errorOperation) {
        this.errorOperation = errorOperation;
    }

    public static ResponseBase success() {
        ResponseBase base = new ResponseBase();
        base.successfulOperation = true;
        return base;
    }

    public static ResponseBase error(String message) {
        ResponseBase base = new ResponseBase();
        base.errorOperation = true;
        base.message = message;
        return base;
    }


}