package com.gemini.beans.integration;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/30/18
 * Time: 9:57 AM
 */
public class SchoolResponseResponse {

    private Long schoolId;
    private Long extSchoolNumber;
    private String schoolName;
    private String gradeLevel;
    private boolean full;

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Long getExtSchoolNumber() {
        return extSchoolNumber;
    }

    public void setExtSchoolNumber(Long extSchoolNumber) {
        this.extSchoolNumber = extSchoolNumber;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(String gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public boolean isFull() {
        return full;
    }

    public void setFull(boolean full) {
        this.full = full;
    }

    public String toDisplayName(){
        return String.format("%s - %s", extSchoolNumber, schoolName);
    }
}