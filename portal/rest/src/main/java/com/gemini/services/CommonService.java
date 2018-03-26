package com.gemini.services;

import com.gemini.database.dao.beans.EnrollmentInfo;
import com.gemini.database.jpa.entities.ConfigEntity;
import com.gemini.database.jpa.jdbc.CommonDao;
import com.gemini.database.jpa.respository.ConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/13/18
 * Time: 12:51 AM
 */
@Service
public class CommonService {
    @Autowired
    private CommonDao commonDao;
    @Autowired
    private ConfigRepository configRepository;

    //todo: fran this system config can load if the current date is in a specific date range
    private ConfigEntity systemConfig() {
        return configRepository.findOne(1L);
    }

    public Date getCurrentDate() {
        return commonDao.getCurrentDate();
    }

    public Long getPreEnrollmentYear() {
        return systemConfig().getPreEnrollmentSchoolYear();
    }

    public Long getCurrentSchoolYear() {
        return systemConfig().getCurrentSchoolYear();
    }

    public int getMinUserAgeToSubmitRequest() {
        return systemConfig().getMinUserAgeToPreEnroll();
    }

    public int getActivationKeyInHours() {
        return systemConfig().getActivationKeyExpireInHours();
    }

    public int getCredentialKeyExpireInMinutes() {
        return systemConfig().getCredKeyExpireInMinutes();
    }

    public boolean isOldEnrollment(EnrollmentInfo enrollmentInfo){
        return enrollmentInfo.getSchoolYear() < systemConfig().getCurrentSchoolYear();
    }

    public boolean isPreviousEnrollment(EnrollmentInfo enrollmentInfo){
        return systemConfig().getCurrentSchoolYear().equals(enrollmentInfo.getSchoolYear());
    }

    public boolean isPreEnrollmentYear(EnrollmentInfo enrollmentInfo){
        return systemConfig().getPreEnrollmentSchoolYear().equals(enrollmentInfo.getSchoolYear());
    }
}