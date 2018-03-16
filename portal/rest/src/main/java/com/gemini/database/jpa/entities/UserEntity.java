package com.gemini.database.jpa.entities;

import com.gemini.beans.types.Gender;
import com.gemini.beans.types.RelationType;
import com.gemini.database.IdentityEntity;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 3:04 PM
 */
@Entity
@Table(name = "users")
public class UserEntity implements IdentityEntity {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column
    private RelationType relationType;

    @Column(nullable = false)
    private String email;

    @Column
    private String password;

    @Column
    private Gender gender;

    @Column
    private String firstName;

    @Column
    private String middleName;

    @Column
    private String lastName;

    @Column
    private Date dateOfBirth;

    @Column
    private Date lastLogin;

    @Column
    private Long familyPortalId;

    @Column
    private String activationKey;

    @Column
    private Date activationDate;

    @Column
    private Date activationKeyExpireDate;

    @Column
    private Date activationCodeSent;

    @Column
    private boolean enabled = false;

    @Column
    private boolean credentialsNonExpired = true;

    @Column
    private String credentialLostKey;

    @Column
    private Date credentialLostKeyExpireDate;

    @Column
    private boolean profileCompleted = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreEnrollmentRequestEntity> requests;

    @CreatedDate
    @Column(nullable = false, insertable = false, updatable = false, columnDefinition = "timestamp default CURRENT_TIMESTAMP")
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

    public RelationType getRelationType() {
        return relationType;
    }

    public void setRelationType(RelationType relationType) {
        this.relationType = relationType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Long getFamilyPortalId() {
        return familyPortalId;
    }

    public void setFamilyPortalId(Long familyPortalId) {
        this.familyPortalId = familyPortalId;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(Date activationDate) {
        this.activationDate = activationDate;
    }

    public Date getActivationKeyExpireDate() {
        return activationKeyExpireDate;
    }

    public void setActivationKeyExpireDate(Date activationKeyExpireDate) {
        this.activationKeyExpireDate = activationKeyExpireDate;
    }

    public Date getActivationCodeSent() {
        return activationCodeSent;
    }

    public void setActivationCodeSent(Date activationCodeSent) {
        this.activationCodeSent = activationCodeSent;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public String getCredentialLostKey() {
        return credentialLostKey;
    }

    public void setCredentialLostKey(String credentialLostKey) {
        this.credentialLostKey = credentialLostKey;
    }

    public Date getCredentialLostKeyExpireDate() {
        return credentialLostKeyExpireDate;
    }

    public void setCredentialLostKeyExpireDate(Date credentialLostKeyExpireDate) {
        this.credentialLostKeyExpireDate = credentialLostKeyExpireDate;
    }

    public boolean isProfileCompleted() {
        return profileCompleted;
    }

    public void setProfileCompleted(boolean profileCompleted) {
        this.profileCompleted = profileCompleted;
    }

    public List<PreEnrollmentRequestEntity> getRequests() {
        return requests;
    }

    public void setRequests(List<PreEnrollmentRequestEntity> requests) {
        this.requests = requests;
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