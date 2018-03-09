package com.gemini.database.dao.beans;

import com.gemini.beans.types.Gender;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/8/18
 * Time: 10:54 PM
 */
public class StudentSearchCriteria {
    private String firstName;
    private String lastName;
    private Gender gender;
    private String last4Ssn;
    private Long studentNumber;
    private boolean immigrant;
    private Date immigrantDate;
    private String birthCountry;

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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getLast4Ssn() {
        return last4Ssn;
    }

    public void setLast4Ssn(String last4Ssn) {
        this.last4Ssn = last4Ssn;
    }

    public Long getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(Long studentNumber) {
        this.studentNumber = studentNumber;
    }

    public boolean isImmigrant() {
        return immigrant;
    }

    public void setImmigrant(boolean immigrant) {
        this.immigrant = immigrant;
    }

    public Date getImmigrantDate() {
        return immigrantDate;
    }

    public void setImmigrantDate(Date immigrantDate) {
        this.immigrantDate = immigrantDate;
    }

    public String getBirthCountry() {
        return birthCountry;
    }

    public void setBirthCountry(String birthCountry) {
        this.birthCountry = birthCountry;
    }
}