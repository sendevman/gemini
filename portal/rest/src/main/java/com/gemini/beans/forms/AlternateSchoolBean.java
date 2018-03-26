package com.gemini.beans.forms;

import com.gemini.beans.integration.SchoolResponse;

import java.util.Objects;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/24/18
 * Time: 4:01 PM
 */
public class AlternateSchoolBean {

    private Integer priority;
    private SchoolResponse school = new SchoolResponse();

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public SchoolResponse getSchool() {
        return school;
    }

    public void setSchool(SchoolResponse school) {
        this.school = school;
    }

    public Long getSchoolId(){
        return school.getSchoolId();
    }

    public void setSchoolId(Long schoolId){
        school.setSchoolId(schoolId);
    }

    public String getSchoolName(){
        return school.getSchoolName();
    }

    public AddressBean getSchoolAddress(){
        return school.getAddress();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AlternateSchoolBean)) return false;
        AlternateSchoolBean that = (AlternateSchoolBean) o;
        return Objects.equals(priority, that.priority)
                && Objects.equals(getSchoolId(), that.getSchoolId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(priority, getSchoolId());
    }
}