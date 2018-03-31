package com.gemini.database.dao;

import com.gemini.beans.requests.StudentSearchRequest;
import com.gemini.beans.types.SpecializedSchoolCategory;
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

    Student findStudent(StudentSearchRequest searchRequest);

    Student findStudent(Long studentNumber);

    StudentAddress findAddress(Long studentNumber);

    EnrollmentInfo findRecentStudentEnrollment(Long studentId);

    //regular schools
    List<School> findSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel);

    //occupational schools
    List<School> findOccupationalSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel);

    //specialized schools
    List<School> findSpecializedSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel, SpecializedSchoolCategory category);

    //technical schools
    List<School> findTechnicalSchools(Long schoolYear);

    School findSchoolById(Long schoolId);

    List<Region> getAllRegions();

    List<Region> getVocationalRegions();

    SchoolGradeLevel findGradeLevelInfo(Long schoolYear, Long schoolId, String gradeLevel);

    List<VocationalProgram> getVocationalPrograms(Long schoolId, Long schoolYear);

}
