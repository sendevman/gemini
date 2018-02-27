package com.gemini.database.dao;

import com.gemini.database.dao.beans.*;

import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/27/18
 * Time: 9:08 AM
 */
public interface SchoolMaxDaoInterface {
  Parent findHouseHead(String lastSsn, Date dob, String lastname);

  Student findStudent(String lastSsn, Date dob, Long studentNumber);

  Student findStudent(Long studentNumber);

  StudentAddress findAddress(Long studentNumber);

  EnrollmentInfo findRecentStudentEnrollment(Long studentId);

  List<School> findSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel);

  School findSchoolById(Long schoolId);

  List<Region> getAllRegions();

  SchoolGradeLevel findGradeLevelInfo(Long schoolYear, Long schoolId, String gradeLevel);
}
