package com.gemini.database.dao;

import com.gemini.database.dao.beans.*;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/27/18
 * Time: 9:05 AM
 */
@Repository("mockSchoolMaxDao")
public class MockSchoolMaxDaoImpl implements SchoolMaxDaoInterface {
    private Student student;
    private final String currentGradeLevel = "01";
    private final String nextGradeLevel = "02";
    private final String nextGradeLevelDescription = "02-Segundo";

    public MockSchoolMaxDaoImpl() {
        student = new Student();
        student.setFirstName("Estudioso");
        student.setLastName("Sie Smax");
        student.setGender("M");
        student.setDateOfBirth(new Date());
    }

    @Override
    public Parent findHouseHead(String lastSsn, Date dob, String lastname) {
        return new Parent();
    }

    @Override
    public Student findStudent(String lastSsn, Date dob, Long studentNumber) {
        student.setDateOfBirth(dob);
        student.setExtStudentNumber(studentNumber);
        student.setStudentId(studentNumber);
        student.setSsn(lastSsn);
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
        enrollmentInfo.setSchoolYear(2018L);
        enrollmentInfo.setGradeLevel(currentGradeLevel);
        enrollmentInfo.setSchoolId(1L);
        enrollmentInfo.setEnrollmentId(1L);
        return enrollmentInfo;
    }

    @Override
    public List<School> findSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel) {
        List<String> schoolName = Arrays.asList("Mejor Aprovechamiento", "Lealtad", "Honestidad", "Persistente", "Resiliente");
        return schoolName.stream().map(s -> {
            School school = new School();
            Integer schoolId = schoolName.indexOf(s) + 1;
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
            school.setSchoolName(s);
            return school;
        }).collect(Collectors.toList());
    }

    @Override
    public School findSchoolById(Long schoolId) {
        School school = new School();
        school.setSchoolName("Mejor Aprovechamiento");
        school.setSchoolId(1L);
        school.setRegionId(1L);
        school.setDistrictId(1L);
        school.setExtSchoolNumber(1L);
        school.setAddressLine_1("Calle Felicidad");
        school.setAddressLine_2("Urb Progreso");
        school.setCityCd("");
        school.setCity("San Juan");
        school.setState("PR");
        school.setZipCode("00918");
        return school;
    }

    @Override
    public List<Region> getAllRegions() {
        List<String> regionNames = Arrays.asList("Arecibo", "Bayamon", "Caguas", "Humacao", "Mayaguez", "Ponce");
        return regionNames.stream().map(r -> {
            Region region = new Region();
            Integer regionId = regionNames.indexOf(r) + 1;
            region.setRegionId(regionId.longValue());
            region.setName(r);
            region.setDescription(r);
            return region;
        }).collect(Collectors.toList());
    }

    @Override
    public SchoolGradeLevel findGradeLevelInfo(Long schoolYear, Long schoolId, String gradeLevel) {
        SchoolGradeLevel schoolGradeLevel = new SchoolGradeLevel();
        schoolGradeLevel.setSchoolId(1L);
        schoolGradeLevel.setSchoolYear(2019L);
        schoolGradeLevel.setNextYearGrade(nextGradeLevel);
        return schoolGradeLevel;
    }
}
