package com.gemini.services;

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
    private ConfigRepository configRepository;

    public Date getCurrentDate() {
        return commonDao.getCurrentDate();
    }

    public Long getPreEnrollmentYear(){
        return 2019L;
    }

    public Long getCurrentSchoolYear(){
        return this.getPreEnrollmentYear() - 1L;
    }

    public int getMinUserAgeToSubmitRequest(){
        return 18;
    }
}