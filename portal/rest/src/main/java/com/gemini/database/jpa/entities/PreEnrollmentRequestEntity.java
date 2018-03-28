package com.gemini.database.jpa.entities;

import com.gemini.beans.types.RequestStatus;
import com.gemini.beans.types.EnrollmentType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/16/18
 * Time: 2:28 PM
 */
@Entity
@Table(name = "pre_enrollment_requests")
public class PreEnrollmentRequestEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus requestStatus = RequestStatus.ACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EnrollmentType type = EnrollmentType.REGULAR;

//    @ManyToOne(targetEntity = UserEntity.class, optional = false)
//    private UserEntity user;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    private StudentEntity student;

    @Column
    private Long previousEnrollmentId;

    @Column
    private Long previousEnrollmentYear;

    @Column
    private String previousGradeLevel = "00";

    @Column
    private Long preEnrollmentId;

    @Column(nullable = false)
    private String gradeLevel = "00";

    @Column(nullable = false)
    private Long schoolYear;

    @Column(nullable = false)
    private Long regionId = -1L;

    @Column(nullable = false)
    private Long districtId = -1L;

    @Column(nullable = false)
    private String municipalityCode = "NONE";

    @Column(nullable = false)
    private Long schoolId = -1L;

    @Column(nullable = false)
    private Long extSchoolNumber = -1L;

    @Column
    private String comments;

    @Column
    private Date submitDate;

    @OneToMany(mappedBy = "preEnrollment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreEnrollmentAlternateSchoolEntity> alternateSchools;

    @OneToMany(mappedBy = "preEnrollment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreEnrollmentVocationalSchoolEntity> vocationalSchools;

    @CreatedDate
    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "timestamp default CURRENT_TIMESTAMP")
    private Date creationDate;
    @LastModifiedDate
    @Column()
    private Date revisionDate;

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

    public EnrollmentType getType() {
        return type;
    }

    public void setType(EnrollmentType type) {
        this.type = type;
    }

//    public UserEntity getUser() {
//        return user;
//    }
//
//    public void setUser(UserEntity user) {
//        this.user = user;
//    }

    public StudentEntity getStudent() {
        return student;
    }

    public void setStudent(StudentEntity student) {
        this.student = student;
    }

    public Long getPreviousEnrollmentId() {
        return previousEnrollmentId;
    }

    public void setPreviousEnrollmentId(Long previousEnrollmentId) {
        this.previousEnrollmentId = previousEnrollmentId;
    }

    public Long getPreviousEnrollmentYear() {
        return previousEnrollmentYear;
    }

    public void setPreviousEnrollmentYear(Long previousEnrollmentYear) {
        this.previousEnrollmentYear = previousEnrollmentYear;
    }

    public String getPreviousGradeLevel() {
        return previousGradeLevel;
    }

    public void setPreviousGradeLevel(String previousGradeLevel) {
        this.previousGradeLevel = previousGradeLevel;
    }

    public Long getPreEnrollmentId() {
        return preEnrollmentId;
    }

    public void setPreEnrollmentId(Long preEnrollmentId) {
        this.preEnrollmentId = preEnrollmentId;
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

    public Date getSubmitDate() {
        return submitDate;
    }

    public void setSubmitDate(Date submitDate) {
        this.submitDate = submitDate;
    }

    public List<PreEnrollmentAlternateSchoolEntity> getAlternateSchools() {
        return alternateSchools;
    }

    public void setAlternateSchools(List<PreEnrollmentAlternateSchoolEntity> alternateSchools) {
        this.alternateSchools = alternateSchools;
    }

    public List<PreEnrollmentVocationalSchoolEntity> getVocationalSchools() {
        return vocationalSchools;
    }

    public void setVocationalSchools(List<PreEnrollmentVocationalSchoolEntity> vocationalSchools) {
        this.vocationalSchools = vocationalSchools;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getRevisionDate() {
        return revisionDate;
    }

    public void setRevisionDate(Date revisionDate) {
        this.revisionDate = revisionDate;
    }
}