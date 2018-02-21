package com.gemini.services;

import com.gemini.database.dao.SchoolmaxDao;
import com.gemini.database.dao.beans.ParentBean;
import com.gemini.database.dao.beans.StudentAddress;
import com.gemini.database.dao.beans.StudentBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 1:01 AM
 */
@Service
public class SchoolmaxService {
    @Autowired
    private SchoolmaxDao smaxDao;


    public ParentBean retrieveHouseHeadInfo(String lastSsn, Date dob, String lastname) {
        return smaxDao.findHouseHead(lastSsn, dob, lastname);
    }

    public StudentBean retrieveStudentInfo(String lastSsn, Long studentNumber, Date dob) {
        return smaxDao.findStudent(lastSsn, dob, studentNumber);
    }

    public StudentBean retrieveStudentInfo(Long studentNumber) {
        return smaxDao.findStudent(studentNumber);
    }

    public StudentAddress retrieveStudentAddress(Long studentNumber) {
        return smaxDao.findAddress(studentNumber);
    }

}