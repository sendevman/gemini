package com.gemini.database.jpa.entities;

import javax.persistence.*;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/21/18
 * Time: 5:34 PM
 */
//Todo: this should move to admin portal
@Entity
@Table(name = "config")
public class ConfigEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Long currentSchoolYear;

    @Column(nullable = false)
    private Long preEnrollmentSchoolYear;

    @Column
    private Date preEnrollmentStart;

    @Column
    private Date preEnrollmentEnd;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCurrentSchoolYear() {
        return currentSchoolYear;
    }

    public void setCurrentSchoolYear(Long currentSchoolYear) {
        this.currentSchoolYear = currentSchoolYear;
    }

    public Long getPreEnrollmentSchoolYear() {
        return preEnrollmentSchoolYear;
    }

    public void setPreEnrollmentSchoolYear(Long preEnrollmentSchoolYear) {
        this.preEnrollmentSchoolYear = preEnrollmentSchoolYear;
    }

    public Date getPreEnrollmentStart() {
        return preEnrollmentStart;
    }

    public void setPreEnrollmentStart(Date preEnrollmentStart) {
        this.preEnrollmentStart = preEnrollmentStart;
    }

    public Date getPreEnrollmentEnd() {
        return preEnrollmentEnd;
    }

    public void setPreEnrollmentEnd(Date preEnrollmentEnd) {
        this.preEnrollmentEnd = preEnrollmentEnd;
    }
}