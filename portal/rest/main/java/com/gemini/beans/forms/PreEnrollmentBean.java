package com.gemini.beans.forms;

import com.gemini.beans.types.RequestStatus;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/21/18
 * Time: 11:58 AM
 */
public class PreEnrollmentBean{

    private Long id;
    private RequestStatus requestStatus;
    private Long previousSchoolId;
    private String previousSchoolName;
    private String gradeLevel;
    private Long schoolYear;
    private Long regionId = -1L;
    private Long districtId = -1L;
    private String municipalityCode = "NONE";
    private Long schoolId = -1L;
    private Long extSchoolNumber = -1L;
    private String comments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    public Long getPreviousSchoolId() {
        return previousSchoolId;
    }

    public void setPreviousSchoolId(Long previousSchoolId) {
        this.previousSchoolId = previousSchoolId;
    }

    public String getPreviousSchoolName() {
        return previousSchoolName;
    }

    public void setPreviousSchoolName(String previousSchoolName) {
        this.previousSchoolName = previousSchoolName;
    }

    public String getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(String gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public Long getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(Long schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public String getMunicipalityCode() {
        return municipalityCode;
    }

    public void setMunicipalityCode(String municipalityCode) {
        this.municipalityCode = municipalityCode;
    }

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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}