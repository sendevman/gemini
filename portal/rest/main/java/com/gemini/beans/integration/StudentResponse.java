package com.gemini.beans.integration;

import java.util.Date;
import java.util.Optional;
import java.util.StringTokenizer;
import java.util.stream.Collector;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 12:27 AM
 */
public class StudentResponse {

    private Long studentNumber;
    private String firstName;
    private String middleName;
    private String fatherLastName;
    private String motherLastName;
    private Date dateOfBirth;
    private String gender;
    private boolean isEnrolled;
    private int currentGradeLevel;
    private boolean found;


    public Long getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(Long studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getFatherLastName() {
        return fatherLastName;
    }

    public void setFatherLastName(String fatherLastName) {
        this.fatherLastName = fatherLastName;
    }

    public String getMotherLastName() {
        return motherLastName;
    }

    public void setMotherLastName(String motherLastName) {
        this.motherLastName = motherLastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isEnrolled() {
        return isEnrolled;
    }

    public void setEnrolled(boolean enrolled) {
        isEnrolled = enrolled;
    }

    public int getCurrentGradeLevel() {
        return currentGradeLevel;
    }

    public void setCurrentGradeLevel(int currentGradeLevel) {
        this.currentGradeLevel = currentGradeLevel;
    }

    public boolean isFound() {
        return found;
    }

    public void setFound(boolean found) {
        this.found = found;
    }

    public void setLastName(String lastName) {
        StringTokenizer tokenizer = new StringTokenizer(lastName.trim(), " ");
        this.fatherLastName = tokenizer.hasMoreTokens() ? tokenizer.nextToken() : "";
        this.motherLastName = tokenizer.hasMoreTokens() ? tokenizer.nextToken() : "";
    }

    public String getFullName() {
        return Stream.of(firstName, middleName, fatherLastName, motherLastName)
                .filter(s -> s != null && !s.isEmpty())
                .collect(joining(" "));
    }

}