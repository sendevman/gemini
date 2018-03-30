package com.gemini.services;

import com.gemini.beans.requests.StudentSearchRequest;
import com.gemini.beans.types.SchoolCategory;
import com.gemini.beans.types.SpecializedSchoolCategory;
import com.gemini.database.dao.SchoolMaxDaoInterface;
import com.gemini.database.dao.beans.*;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.collect.FluentIterable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
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

    final Logger logger = LoggerFactory.getLogger(SchoolmaxService.class.getName());
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

//        Educacion Especial
        gradeLevels.put("EE", "EE-Elemental");
        gradeLevels.put("EI", "EE-Intermedia");
        gradeLevels.put("ES", "EE-Superior");

    }

    final Integer OCCUPATIONAL_MIN_GRADE_LEVEL = 9;

    @Autowired
    private SchoolMaxDaoInterface smaxDao;
    @Autowired
    private CommonService commonService;

    @PostConstruct
    public void check() {
        logger.info(String.format("*****Smax Interface Use is %s*****", smaxDao.getClass().getSimpleName()));
    }

    public Parent retrieveHouseHeadInfo(String lastSsn, Date dob, String lastname) {
        return smaxDao.findHouseHead(lastSsn, dob, lastname);
    }

    public Student retrieveStudentInfo(StudentSearchRequest searchRequest) {
        return smaxDao.findStudent(searchRequest);
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

    public List<School> findOccupationalSchoolsByRegionAndGradeLevel(Long regionId, String gradeLevel) {
        Long schoolYear = commonService.getCurrentSchoolYear();
        return smaxDao.findOccupationalSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel);
    }

    public List<School> findSpecializedSchoolsByRegionAndGradeLevel(Long regionId, String gradeLevel, SpecializedSchoolCategory category) {
        Long schoolYear = commonService.getCurrentSchoolYear();
        return smaxDao.findSpecializedSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel, category);
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
    public List<GradeLevel> getAllGradeLevels(final SchoolCategory category) {
        return FluentIterable
                .from(gradeLevels.entrySet())
                .filter(new Predicate<Map.Entry<String, String>>() {
                    @Override
                    public boolean apply(Map.Entry<String, String> entry) {

                        if (SchoolCategory.OCCUPATIONAL.equals(category)) {
                            try {
                                int gradeLevelInt = Integer.valueOf(entry.getKey());
                                return gradeLevelInt >= OCCUPATIONAL_MIN_GRADE_LEVEL;
                            } catch (NumberFormatException e) {
                                return false;
                            }
                        }

                        return true;
                    }
                })
                .transform(new Function<Map.Entry<String, String>, GradeLevel>() {
                    @Override
                    public GradeLevel apply(Map.Entry<String, String> entry) {
                        return new GradeLevel(entry.getKey(), entry.getValue());
                    }
                }).toList();
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