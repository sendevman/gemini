package com.gemini.beans.forms;

import com.gemini.beans.types.AddressType;
import com.google.common.base.Joiner;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/21/18
 * Time: 10:31 AM
 */
public class AddressBean {

    private Long id;
    @NotNull
    private AddressType type;
    @NotNull
    @NotBlank
    private String line1;
    private String line2;
    @NotNull
    @NotBlank
    private String city;
    private String country = "PR";
    @NotNull
    @NotBlank
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

    public String getAddressFormatted() {
        return Joiner.on(" ")
                .skipNulls()
                .join(line1, line2, city, country.concat(","), zipcode);
    }
}