package com.gemini.database.dao;

import com.gemini.database.dao.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 12:57 AM
 */
@Repository("realSchoolMaxDao")
public class SchoolMaxDaoImpl extends JdbcDaoSupport implements SchoolMaxDaoInterface {
    @Autowired
    @Qualifier(value = "smaxDatasource")
    DataSource smaxDatasource;

    private final String PARENT_SQL = "SELECT * FROM VW_PARENT ";
    private final String STUDENT_SQL = "select * from VW_STUDENT ";
    private final String STUDENT_ADDRESS_SQL = "SELECT * FROM VW_STUDENT_ADDRESS ";
    private final String REGION_SQL = "SELECT * FROM VW_REGIONS ";
    private final String ENROLLMENT_SQL = "SELECT * FROM VW_SIE_STUDENT_ENROLLMENT ";
    private final String SCHOOL_SQL = "SELECT * FROM VW_VOCATIONAL_SCHOOLS S ";
    private final String VOCATIONAL_SCHOOLS = "SELECT * FROM VW_VOCATIONAL_SCHOOLS S ";
    private final String VOCATIONAL_PROGRAMS = "SELECT * FROM VW_VOCATIONAL_PROGRAMS ";
    private final String SCHOOL_GRADE_LEVELS = "SELECT * FROM VW_SCHOOLS_GRADE_LEVELS ";

    @PostConstruct
    private void init() {
        setDataSource(smaxDatasource);
    }

    @Override
    public Parent findHouseHead(String lastSsn, Date dob, String lastname) {
        String sql = PARENT_SQL.concat(" AND SUBSTR(SSN, -4) = ? AND DATE_OF_BIRTH = ? and LAST_NAME like '" + lastname + "%'");
        List<Parent> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Parent.class), lastSsn, dob);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public Student findStudent(String lastSsn, Date dob, Long studentNumber) {
        String sql = STUDENT_SQL.concat(" WHERE SUBSTR(SSN, -4) = ? AND DATE_OF_BIRTH = ? and EXT_STUDENT_NUMBER = ? ORDER BY EXT_STUDENT_NUMBER DESC ");
        List<Student> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Student.class), lastSsn, dob, studentNumber);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public Student findStudent(Long studentNumber) {
        String sql = STUDENT_SQL.concat(" WHERE EXT_STUDENT_NUMBER = ?");
        List<Student> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Student.class), studentNumber);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public StudentAddress findAddress(Long studentNumber) {
        String sql = STUDENT_ADDRESS_SQL.concat(" WHERE EXT_STUDENT_NUMBER = ? ");
        List<StudentAddress> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(StudentAddress.class), studentNumber);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public EnrollmentInfo findRecentStudentEnrollment(Long studentId) {
        String sql = ENROLLMENT_SQL.concat(" WHERE ENROLLMENT_ID = (SELECT MAX(ENROLLMENT_ID) FROM VW_SIE_STUDENT_ENROLLMENT WHERE STUDENT_ID = ? )");
        List<EnrollmentInfo> enrollments = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(EnrollmentInfo.class), studentId);
        return enrollments.isEmpty() ? null : enrollments.get(0);
    }

    @Override
    public List<School> findSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel) {
        String sql = SCHOOL_SQL.concat("WHERE REGION_ID = ? " +
                "AND EXISTS(SELECT 1 FROM VW_SCHOOLS_GRADE_LEVELS SGL " +
                "WHERE SGL.SCHOOL_ID = S.SCHOOL_ID " +
                "AND SGL.SCHOOL_YEAR = ? AND SGL.VALUE = ?) ORDER BY SCHOOL_NAME");
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(School.class), regionId, schoolYear, gradeLevel);
    }

    @Override
    public List<School> findVocationalSchoolsByRegionAndGradeLevel(Long regionId, Long schoolYear, String gradeLevel) {
        String sql = VOCATIONAL_SCHOOLS.concat(" WHERE REGION_ID = ? " +
                "AND EXISTS(SELECT 1 FROM VW_SCHOOLS_GRADE_LEVELS SGL " +
                "WHERE SGL.SCHOOL_ID = S.SCHOOL_ID " +
                "AND SGL.SCHOOL_YEAR = ? AND SGL.VALUE = ?) ORDER BY SCHOOL_NAME");
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(School.class), regionId, schoolYear, gradeLevel);
    }

    @Override
    public School findSchoolById(Long schoolId) {
        String sql = SCHOOL_SQL.concat(" WHERE SCHOOL_ID = ?");
        List<School> schools = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(School.class), schoolId);
        return schools.isEmpty() ? null : schools.get(0);
    }

    @Override
    public List<Region> getAllRegions() {
        return getJdbcTemplate().query(REGION_SQL, new BeanPropertyRowMapper<>(Region.class));
    }

    @Override
    public List<Region> getVocationalRegions() {
        String sql = REGION_SQL.concat(" WHERE REGION_ID IN (select distinct REGION_ID from VW_VOCATIONAL_SCHOOLS) ");
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Region.class));
    }

    @Override
    public SchoolGradeLevel findGradeLevelInfo(Long schoolYear, Long schoolId, String gradeLevel) {
        String sql = SCHOOL_GRADE_LEVELS.concat(" WHERE SCHOOL_YEAR = ? AND SCHOOL_ID = ? AND VALUE = ?");
        List<SchoolGradeLevel> levels = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(SchoolGradeLevel.class), schoolYear, schoolId, gradeLevel);
        return levels.isEmpty() ? null : levels.get(0);
    }

    @Override
    public List<VocationalProgram> getVocationalPrograms(Long schoolId, Long schoolYear) {
        String sql = VOCATIONAL_PROGRAMS.concat(" WHERE SCHOOL_ID = ? AND SCHOOL_YEAR = ?");
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(VocationalProgram.class), schoolId, schoolYear);
    }
}