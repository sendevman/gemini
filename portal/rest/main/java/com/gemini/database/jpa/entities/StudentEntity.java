package com.gemini.database.jpa.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/16/18
 * Time: 2:29 PM
 */
@Entity
@Table(name = "students")
public class StudentEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Long externalStudentNumber;

    @Column(nullable = false)
    private Long sisStudentId;

    @Column(nullable = false)
    private Date dateOfBirth;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @OneToOne
    @JoinColumn(name = "physical_address_id")
    private AddressEntity physical;

    @OneToOne
    @JoinColumn(name = "postal_address_id")
    private AddressEntity postal;

    @CreatedDate
    @Column(nullable = false, updatable = false, columnDefinition = "timestamp default CURRENT_TIMESTAMP")
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

    public Long getExternalStudentNumber() {
        return externalStudentNumber;
    }

    public void setExternalStudentNumber(Long externalStudentNumber) {
        this.externalStudentNumber = externalStudentNumber;
    }

    public Long getSisStudentId() {
        return sisStudentId;
    }

    public void setSisStudentId(Long sisStudentId) {
        this.sisStudentId = sisStudentId;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public AddressEntity getPhysical() {
        return physical;
    }

    public void setPhysical(AddressEntity physical) {
        this.physical = physical;
    }

    public AddressEntity getPostal() {
        return postal;
    }

    public void setPostal(AddressEntity postal) {
        this.postal = postal;
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