package com.gemini.beans.requests;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/19/18
 * Time: 4:07 PM
 */
public class StudentSearchRequest {
    @NotNull
    private String firstName;
    private String lastName;
    private Long studentNumber;
    private Long lastSsn;
    @NotNull
    private Date dateOfBirth;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getLastSsn() {
        return lastSsn;
    }

    public void setLastSsn(Long lastSsn) {
        this.lastSsn = lastSsn;
    }

    public Long getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(Long studentNumber) {
        this.studentNumber = studentNumber;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}