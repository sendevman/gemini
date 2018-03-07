package com.gemini.beans.responses;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:24 PM
 */
public class ResponseBase<T> {
    private Long requestId;
    private String message;
    private boolean successfulOperation;
    private boolean errorOperation;
    private T content;

    public ResponseBase() {
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
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

    public T getContent() {
        return content;
    }

    public void setContent(T content) {
        this.content = content;
    }

    public static ResponseBase success() {
        return success(null);
    }

    public static ResponseBase success(Long requestId) {
        ResponseBase base = new ResponseBase();
        base.successfulOperation = true;
        base.requestId = requestId;
        return base;
    }

    public static <T> ResponseBase success(Long requestId, T responseBean) {
        ResponseBase base = success(requestId);
        base.content = responseBean;
        return base;
    }

    public static ResponseBase error(String message) {
        ResponseBase base = new ResponseBase();
        base.errorOperation = true;
        base.message = message;
        return base;
    }


}