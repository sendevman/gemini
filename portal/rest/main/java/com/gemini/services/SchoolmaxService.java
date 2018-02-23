package com.gemini.services;

import com.gemini.database.dao.SchoolmaxDao;
import com.gemini.database.dao.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 1:01 AM
 */
@Service
public class SchoolmaxService {

    static Map<String, String> gradeLevels = new TreeMap<>();

    static {
        gradeLevels.put("PK", "Pre-Kinder");
        gradeLevels.put("KG", "Kindergarten");
        gradeLevels.put("01", "Primero");
        gradeLevels.put("02", "Segundo");
        gradeLevels.put("03", "Tercero");
        gradeLevels.put("04", "Cuarto");
        gradeLevels.put("05", "Quinto");
        gradeLevels.put("06", "Sexto");
        gradeLevels.put("07", "Septimo");
        gradeLevels.put("08", "Octavo");
        gradeLevels.put("09", "Noveno");
        gradeLevels.put("10", "Decimo");
        gradeLevels.put("11", "Undécimo");
        gradeLevels.put("12", "Duodécimo");
    }

    @Autowired
    private SchoolmaxDao smaxDao;

    public Parent retrieveHouseHeadInfo(String lastSsn, Date dob, String lastname) {
        return smaxDao.findHouseHead(lastSsn, dob, lastname);
    }

    public Student retrieveStudentInfo(String lastSsn, Long studentNumber, Date dob) {
        return smaxDao.findStudent(lastSsn, dob, studentNumber);
    }

    public Student retrieveStudentInfo(Long studentNumber) {
        return smaxDao.findStudent(studentNumber);
    }

    public StudentAddress retrieveStudentAddress(Long studentNumber) {
        return smaxDao.findAddress(studentNumber);
    }

    public EnrollmentInfo retrieveMostRecentEnrollment(Long studentId) {
        return smaxDao.findRecentStudentEnrollment(studentId);
    }

    public School findSchoolById(Long schoolId) {
        return smaxDao.findSchoolById(schoolId);
    }

    @Cacheable
    public List<School> findSchoolByRegionAndGradeLevel(Long regionId, String gradeLevel) {
        //todo: fran this should come from yaml or a config table
        Long schoolYear = (PreEnrollmentService.PRE_ENROLLMENT_SCHOOL_YEAR - 1);
        return smaxDao.findSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel);
    }

    @Cacheable
    public SchoolGradeLevel findSchoolLevel(Long schoolYear, Long schoolId, String gradeLevel) {
        return smaxDao.findGradeLevelInfo(schoolYear, schoolId, gradeLevel);
    }

    @Cacheable
    public List<Region> getAllRegions() {
        return smaxDao.getAllRegions();
    }

    @Cacheable
    public List<GradeLevel> getAllGradeLevels() {
        return gradeLevels.entrySet()
                .stream()
                .sorted(Comparator.comparing(Map.Entry::getKey))
                .map(gl -> new GradeLevel(gl.getKey(), gl.getValue()))
                .collect(Collectors.toList());
    }

    public GradeLevel getGradeLevelByCode(String code) {
        String value = gradeLevels.get(code);
        return value != null ? new GradeLevel(code, value) : null;
    }

}