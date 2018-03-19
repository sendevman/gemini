package com.gemini.beans.forms;

import com.gemini.beans.IdentityForm;
import com.gemini.beans.types.Gender;
import com.gemini.beans.types.Type;
import com.gemini.utils.Utils;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/8/18
 * Time: 8:15 AM
 */
public class PreEnrollmentStudentInfoBean implements IdentityForm {

    private Long studentNumber;
    private String firstName;
    private String middleName;
    private String lastName;
    private Date dateOfBirth;
    private Gender gender;
    private Type type;

    public Long getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(Long studentNumber) {
        this.studentNumber = studentNumber;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getMiddleName() {
        return middleName;
    }

    @Override
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    @Override
    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public Gender getGender() {
        return gender;
    }

    @Override
    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getFullName(){
        return Utils.toFullName(firstName, middleName, lastName);
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}