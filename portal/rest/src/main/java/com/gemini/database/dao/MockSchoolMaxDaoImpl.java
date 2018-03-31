package com.gemini.database.dao;

import com.gemini.beans.requests.StudentSearchRequest;
import com.gemini.beans.types.SpecializedSchoolCategory;
import com.gemini.database.dao.beans.*;
import com.gemini.utils.ValidationUtils;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/27/18
 * Time: 9:05 AM
 */
public class MockSchoolMaxDaoImpl implements SchoolMaxDaoInterface {
    private Student student;
    private final String currentGradeLevel = "01";
    private final String nextGradeLevel = "02";
    private final String nextGradeLevelDescription = "02-Segundo";

    public MockSchoolMaxDaoImpl() {
        student = new Student();
        student.setFirstName("Estudioso");
        student.setLastName("Sie Smax");
        student.setGenderValue("M");
        student.setDateOfBirth(new Date());
    }

    @Override
    public Parent findHouseHead(String lastSsn, Date dob, String lastname) {
        return new Parent();
    }

    @Override
    public Student findStudent(StudentSearchRequest request) {
        student.setDateOfBirth(request.getDateOfBirth());
        if (ValidationUtils.valid(request.getStudentNumber())) {
            student.setExtStudentNumber(request.getStudentNumber());
            student.setStudentId(request.getStudentNumber());
        }
        if (ValidationUtils.valid(request.getLastSsn()))
            student.setSsn(request.getLastSsn().toString());
        return student;
    }

    @Override
    public Student findStudent(Long studentNumber) {
        student.setExtStudentNumber(studentNumber);
        student.setStudentId(studentNumber);
        return student;
    }

    @Override
    public StudentAddress findAddress(Long studentNumber) {
        StudentAddress address = new StudentAddress();
        address.setPhysicalAddress_1("Ave. Tnte. César González,esq. Calle Juan Calaf");
        address.setPhysicalAddress_2("Urb. Industrial Tres Monjitas");
        address.setPhysicalCity("SNJN");
        address.setPhysicalCityDesc("San Juan");
        address.setPhysicalState("PR");
        address.setPhysicalZipcode("00917");
        address.setPostalAddress_1("P.O. Box 190759");
        address.setPostalCity("SNJN");
        address.setPostalCityDesc("San Juan");
        address.setPostalState("PR");
        address.setPostalZipcode("00919");
        return address;
    }

    @Override
    public EnrollmentInfo findRecentStudentEnrollment(Long studentId) {
        EnrollmentInfo enrollmentInfo = new EnrollmentInfo();
        enrollmentInfo.setSchoolYear(2019L);
        enrollmentInfo.setGradeLevel(currentGradeLevel);
        enrollmentInfo.setSchoolId(1L);
        enrollmentInfo.setEnrollmentId(1L);
        return enrollmentInfo;
    }

    @Override
    public List<School> findSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel) {
        final List<String> schoolNames = Arrays.asList("Mejor Aprovechamiento", "Lealtad", "Honestidad", "Persistente", "Resiliente");

        Function<String, School> stringToSchool =
                new Function<String, School>() {
                    public School apply(String schoolName) {
                        School school = new School();
                        Integer schoolId = schoolNames.indexOf(schoolName) + 1;
                        school.setSchoolId(schoolId.longValue());
                        school.setExtSchoolNumber(schoolId.longValue());
                        school.setRegionId(1L);
                        school.setDistrictId(1L);
                        school.setAddressLine_1(String.format("Calle Felicidad #%s", schoolId));
                        school.setAddressLine_2("Urb Progreso");
                        school.setCityCd("");
                        school.setCity("San Juan");
                        school.setState("PR");
                        school.setZipCode("00918");
                        school.setSchoolName(schoolName);
                        return school;
                    }
                };

        return Lists.transform(schoolNames, stringToSchool);

    }

    @Override
    public School findSchoolById(final Long schoolId) {
        return FluentIterable
                .from(findSchoolsByRegionAndGradeLevel(null, null, null))
                .firstMatch(new Predicate<School>() {
                    @Override
                    public boolean apply(School school) {
                        return school.getSchoolId().equals(schoolId);
                    }
                }).orNull();
    }

    @Override
    public List<Region> getAllRegions() {
        final List<String> regionNames = Arrays.asList("Arecibo", "Bayamon", "Caguas", "Humacao", "Mayaguez", "Ponce");
        Function<String, Region> strToRegion = new Function<String, Region>() {
            @Override
            public Region apply(String regionName) {
                Region region = new Region();
                Integer regionId = regionNames.indexOf(regionName) + 1;
                region.setRegionId(regionId.longValue());
                region.setName(regionName);
                region.setDescription(regionName);
                return region;
            }
        };
        return Lists.transform(regionNames, strToRegion);
    }

    @Override
    public SchoolGradeLevel findGradeLevelInfo(Long schoolYear, Long schoolId, String gradeLevel) {
        SchoolGradeLevel schoolGradeLevel = new SchoolGradeLevel();
        schoolGradeLevel.setSchoolId(1L);
        schoolGradeLevel.setSchoolYear(2019L);
        schoolGradeLevel.setNextYearGrade(nextGradeLevel);
        return schoolGradeLevel;
    }

    @Override
    public List<School> findOccupationalSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel) {
        return findSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel);
    }

    @Override
    public List<School> findSpecializedSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel, SpecializedSchoolCategory category) {
        return findSchoolsByRegionAndGradeLevel(regionId, schoolYear, gradeLevel);
    }

    @Override
    public List<School> findTechnicalSchools(Long schoolYear) {
        return findSchoolsByRegionAndGradeLevel(1L, schoolYear, "00");
    }

    @Override
    public List<Region> getVocationalRegions() {
        return getAllRegions();
    }

    @Override
    public List<VocationalProgram> getVocationalPrograms(Long schoolId, Long schoolYear) {
        final Map<String, String> samplePrograms = ImmutableMap.of(
                "AARN", "Agricultura, Alimentos y Recursos Naturales",
                "GEAD", "Gerencia y Administración",
                "VNPR", "Ventas Profesionales",
                "FINA", "Finanzas");

        Function<String, VocationalProgram> toPrograms = new Function<String, VocationalProgram>() {
            @Override
            public VocationalProgram apply(String prog) {
                VocationalProgram program = new VocationalProgram();
                program.setCode(prog.substring(0, 4));
                program.setDescription(samplePrograms.get(prog));
                return program;
            }
        };
        return Lists.transform(Lists.newArrayList(samplePrograms.keySet()), toPrograms);
    }
}
