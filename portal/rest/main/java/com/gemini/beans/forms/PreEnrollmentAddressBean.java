package com.gemini.beans.forms;


/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:23 PM
 */
public class PreEnrollmentAddressBean {

    private Long preEnrollmentId;
    private AddressBean physical;
    private AddressBean postal;


    public Long getPreEnrollmentId() {
        return preEnrollmentId;
    }

    public void setPreEnrollmentId(Long preEnrollmentId) {
        this.preEnrollmentId = preEnrollmentId;
    }

    public AddressBean getPhysical() {
        return physical;
    }

    public void setPhysical(AddressBean physical) {
        this.physical = physical;
    }

    public AddressBean getPostal() {
        return postal;
    }

    public void setPostal(AddressBean postal) {
        this.postal = postal;
    }

}