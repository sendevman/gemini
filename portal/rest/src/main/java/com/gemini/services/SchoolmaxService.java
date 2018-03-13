package com.gemini.services;

import com.gemini.database.dao.SchoolMaxDaoInterface;
import com.gemini.database.dao.beans.*;
import com.google.common.base.Function;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

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

//        ask for these grade levels
        gradeLevels.put("EE", "EE-Elemental");
        gradeLevels.put("EI", "EE-Intermedia");
        gradeLevels.put("ES", "EE-Superior");

    }

    @Autowired
    @Qualifier("realSchoolMaxDao")
    private SchoolMaxDaoInterface smaxDao;
    @Autowired
    private CommonService commonService;

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
        Long schoolYear = commonService.getCurrentSchoolYear();
        return smaxDao.findSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel);
    }

    public List<School> findVocationalSchoolsByRegionAndGradeLevel(Long regionId, String gradeLevel) {
        Long schoolYear = commonService.getCurrentSchoolYear();
        return smaxDao.findVocationalSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel);
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
    public List<Region> geVocationalRegions() {
        return smaxDao.getVocationalRegions();
    }

    @Cacheable
    public List<GradeLevel> getAllGradeLevels() {
        Function<Map.Entry<String, String>, GradeLevel> mapToGradeLevel = new Function<Map.Entry<String, String>, GradeLevel>() {
            @Override
            public GradeLevel apply(Map.Entry<String, String> entry) {
                return new GradeLevel(entry.getKey(), entry.getValue());
            }
        };
        return Lists.newArrayList(Iterables.transform(gradeLevels.entrySet(), mapToGradeLevel));
    }

    public GradeLevel getGradeLevelByCode(String code) {
        String value = gradeLevels.get(code);
        return value != null ? new GradeLevel(code, value) : null;
    }

    public List<VocationalProgram> getVocationalPrograms(Long schoolId) {
        Long schoolYear = commonService.getCurrentSchoolYear();
        return smaxDao.getVocationalPrograms(schoolId, schoolYear);
    }

}