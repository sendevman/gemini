package com.gemini.services;

import com.gemini.database.dao.beans.EnrollmentInfo;
import com.gemini.database.jpa.entities.ConfigEntity;
import com.gemini.database.jpa.jdbc.CommonDao;
import com.gemini.database.jpa.respository.ConfigRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/13/18
 * Time: 12:51 AM
 */
@Service
public class CommonService {
    final static Logger logger = LoggerFactory.getLogger(CommonService.class.getName());

    @Autowired
    private CommonDao commonDao;
    @Autowired
    private ConfigRepository configRepository;

    //todo: fran this system config can load if the current date is in a specific date range
    @Cacheable
    public ConfigEntity systemConfig() {
        return configRepository.findAll().iterator().next();
    }

    public Date getCurrentDate() {
        Date currDate = commonDao.getCurrentDate();
        logger.info("current date is: " + currDate);
        return currDate;
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

    public boolean isInvalidMinAlternateSchools(Collection collection){
        Integer min = systemConfig().getMinAlternateSchools();
        return (collection == null || collection.isEmpty() || collection.size() < min);
    }
}