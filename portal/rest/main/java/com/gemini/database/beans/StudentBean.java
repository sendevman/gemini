package com.gemini.database.beans;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 1:25 AM
 */
public class StudentBean {
    private Long studentId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private Date dateOfBirth;
    private String ssn;
    private Integer inactiveInd;
    private Integer limitedEnglishInd;
    private Integer immigrantInd;
    private Long previousIdNumber;
    private Long createBy;
    private Date createTs;
    private Long updateBy;
    private Date updateTs;
    private String impedimentoPrimario;
    private String studentType;
    private String ethnicCd;
    private String ethnicCode;
    private String lenguaje;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public Integer getInactiveInd() {
        return inactiveInd;
    }

    public void setInactiveInd(Integer inactiveInd) {
        this.inactiveInd = inactiveInd;
    }

    public Integer getLimitedEnglishInd() {
        return limitedEnglishInd;
    }

    public void setLimitedEnglishInd(Integer limitedEnglishInd) {
        this.limitedEnglishInd = limitedEnglishInd;
    }

    public Integer getImmigrantInd() {
        return immigrantInd;
    }

    public void setImmigrantInd(Integer immigrantInd) {
        this.immigrantInd = immigrantInd;
    }

    public Long getPreviousIdNumber() {
        return previousIdNumber;
    }

    public void setPreviousIdNumber(Long previousIdNumber) {
        this.previousIdNumber = previousIdNumber;
    }

    public Long getCreateBy() {
        return createBy;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public Date getCreateTs() {
        return createTs;
    }

    public void setCreateTs(Date createTs) {
        this.createTs = createTs;
    }

    public Long getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public Date getUpdateTs() {
        return updateTs;
    }

    public void setUpdateTs(Date updateTs) {
        this.updateTs = updateTs;
    }

    public String getImpedimentoPrimario() {
        return impedimentoPrimario;
    }

    public void setImpedimentoPrimario(String impedimentoPrimario) {
        this.impedimentoPrimario = impedimentoPrimario;
    }

    public String getStudentType() {
        return studentType;
    }

    public void setStudentType(String studentType) {
        this.studentType = studentType;
    }

    public String getEthnicCd() {
        return ethnicCd;
    }

    public void setEthnicCd(String ethnicCd) {
        this.ethnicCd = ethnicCd;
    }

    public String getEthnicCode() {
        return ethnicCode;
    }

    public void setEthnicCode(String ethnicCode) {
        this.ethnicCode = ethnicCode;
    }

    public String getLenguaje() {
        return lenguaje;
    }

    public void setLenguaje(String lenguaje) {
        this.lenguaje = lenguaje;
    }
}