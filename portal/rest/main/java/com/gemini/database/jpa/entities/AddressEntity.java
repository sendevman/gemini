package com.gemini.database.jpa.entities;

import com.gemini.beans.types.AddressType;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/18/18
 * Time: 5:48 PM
 */
@Entity
@Table(name = "addresses")
public class AddressEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AddressType type;

    @Column
    private String line1;

    @Column
    private String line2;

    @Column
    private String city;

    @Column(nullable = false)
    private String country = "PR";

    @Column
    private String zipcode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AddressType getType() {
        return type;
    }

    public void setType(AddressType type) {
        this.type = type;
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }
}