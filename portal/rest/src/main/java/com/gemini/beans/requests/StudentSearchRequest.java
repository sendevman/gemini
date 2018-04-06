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
    @NotNull
    private String lastName;
    private Long studentNumber;
    private String lastSsn;
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

    public String getLastSsn() {
        return lastSsn;
    }

    public void setLastSsn(String lastSsn) {
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

    @Override
    public String toString() {
        return "StudentSearchRequest{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", studentNumber=" + studentNumber +
                ", lastSsn=" + lastSsn +
                ", dateOfBirth=" + dateOfBirth +
                '}';
    }
}