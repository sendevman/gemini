package com.gemini.beans;

import com.gemini.beans.types.Gender;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/8/18
 * Time: 9:43 AM
 */
public interface IdentityForm {

    String getFirstName();

    void setFirstName(String firstName);

    String getMiddleName();

    void setMiddleName(String middleName);

    String getFatherLastName();

    void setFatherLastName(String fatherLastName);

    String getMotherLastName();

    void setMotherLastName(String motherLastName);

    Date getDateOfBirth();

    void setDateOfBirth(Date dateOfBirth);

    Gender getGender();

    void setGender(Gender gender);
}