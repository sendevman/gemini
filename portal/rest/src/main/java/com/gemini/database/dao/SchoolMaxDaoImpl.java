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

    //  TODO: fran create views of these queries to keep the code more readable
    private final String PARENT_SQL = "SELECT \n" +
            "A.FAMILY_ID\n" +
            ",A.DATE_OF_BIRTH AS DOB\n" +
            ",A.SSN\n" +
            ",A.GENDER\n" +
            ",A.FIRST_NAME\n" +
            ",A.LAST_NAME\n" +
            ",A.HOUSE_HEAD_NUMBER\n" +
            ",A.HOUSE_HEAD_ID\n" +
            ",C.RELATION_CD\n" +
            ",C.STUDENT_ID\n" +
            ",D.PRIMARY_FAMILY_IND\n" +
            ",D.LIVES_WITH_IND\n" +
            ",E.FIELD_1  AS \"OCCUPATION\"\n" +
            "FROM CE_HOUSE_HEAD A\n" +
            "INNER JOIN CE_FAMILY B ON A.FAMILY_ID = B.FAMILY_ID\n" +
            "INNER JOIN CE_HOUSE_HEAD_TO_MEMBER C ON A.FAMILY_ID = C.FAMILY_ID AND A.HOUSE_HEAD_ID = C.HOUSE_HEAD_ID\n" +
            "INNER JOIN CE_FAMILY_TO_MEMBER D ON A.FAMILY_ID = D.FAMILY_ID AND C.STUDENT_ID = D.STUDENT_ID\n" +
            "INNER JOIN SY_FLEX_DATA E ON A.HOUSE_HEAD_ID = E.TYPE_ID \n" +
            "WHERE E.FLEX_OWNER_ID = 602 ";

    private final String STUDENT_SQL = "SELECT \n" +
            "DISTINCT(A.STUDENT_ID), \n" +
            "A.EXT_STUDENT_NUMBER,\n" +
            "A.FIRST_NAME, \n" +
            "A.MIDDLE_NAME, \n" +
            "A.LAST_NAME, \n" +
            "A.GENDER AS GENDER_VALUE, \n" +
            "A.DATE_OF_BIRTH, \n" +
            "A.SSN,\n" +
            "A.INACTIVE_IND, \n" +
            "A.LIMITED_ENGLISH_IND,\n" +
            "A.IMMIGRANT_IND,\n" +
            "A.PREVIOUS_ID_NUMBER,\n" +
            "A.CREATED_BY,\n" +
            "A.CREATE_TS,   \n" +
            "A.UPDATED_BY,  \n" +
            "A.UPDATE_TS,  \n" +
            "B.FIELD_16 AS \"IMPEDIMENTO_PRIMARIO\",\n" +
            "b.field_21 AS \"STUDENT_TYPE\",\n" +
            "c.ethnic_cd,\n" +
            "CASE c.ethnic_cd\n" +
            "  WHEN 2 THEN 'Blanco no Hispano'\n" +
            "  WHEN 5 THEN 'Indio Americano/Nativo de Alaska'\n" +
            "  WHEN 6 THEN 'Nativo Hawaiano/Islas del Pacífico'\n" +
            "  WHEN 7 THEN 'Puertorriqueño'\n" +
            "  WHEN 8 THEN 'Hispano no Puertorriqueño'\n" +
            "  WHEN 9 THEN 'Negro o Afroamericano'\n" +
            "  WHEN 10 THEN 'Asiatico'\n" +
            "END AS \"ETHNIC_CODE\",\n" +
            "J.NAME AS \"LENGUAJE\" \n" +
            "FROM CE_FAMILY_MEMBER A\n" +
            "LEFT JOIN SY_FLEX_DATA B ON a.STUDENT_ID = B.TYPE_ID \n" +
            "LEFT JOIN CE_FAMILY_MEMBER_ETHNIC_CODE C ON A.STUDENT_ID = C.STUDENT_ID\n" +
            "LEFT JOIN CE_FAMILY_MEMBER_LANGUAGE_CODE I ON A.STUDENT_ID = I.STUDENT_ID\n" +
            "LEFT JOIN ENUM_CE_LANGUAGE_CODE J ON I.LANGUAGE_CD = J.VALUE   \n" +
            "WHERE A.INACTIVE_IND = 0\n" +
            "AND (C.SEQ = 1 OR C.SEQ IS NULL)                 \n" +
            "AND B.FLEX_OWNER_ID = 603             \n" +
            "AND ((I.SEQ = 1 AND J.IS_ACTIVE_IND = 1) OR I.SEQ IS NULL) ";

    private final String STUDENT_ADDRESS_SQL = "SELECT a.family_id,\n" +
            "       C.STUDENT_ID,\n" +
            "       D.EXT_STUDENT_NUMBER,\n" +
            "       a.address_line_1 AS \"POSTAL_ADDRESS_1\",\n" +
            "       a.address_line_2 AS \"POSTAL_ADDRESS_2\",\n" +
            "       a.city           AS \"POSTAL_CITY\",\n" +
            "       a.state          AS \"POSTAL_STATE\",\n" +
            "       a.zip_code       AS \"POSTAL_ZIPCODE\",\n" +
            "       B.FIELD_3        AS \"PHYSICAL_ADDRESS_1\",\n" +
            "       B.FIELD_4        AS \"PHYSICAL_ADDRESS_2\",\n" +
            "       B.FIELD_5        AS \"PHYSICAL_CITY\",\n" +
            "       B.FIELD_9        AS \"PHYSICAL_STATE\",\n" +
            "       B.FIELD_6        AS \"PHYSICAL_ZIPCODE\"\n" +
            "  FROM CE_FAMILY A\n" +
            "  LEFT JOIN SY_FLEX_DATA B ON A.FAMILY_ID = B.TYPE_ID AND B.FLEX_OWNER_ID = 601\n" +
            "  LEFT JOIN CE_FAMILY_TO_MEMBER C ON A.FAMILY_ID =C.FAMILY_ID \n" +
            "  LEFT JOIN CE_FAMILY_MEMBER D ON D.STUDENT_ID = C.STUDENT_ID " +
            " WHERE C.LIVES_WITH_IND = 1\n" +
            "   AND C.PRIMARY_FAMILY_IND = 1\n";

    private final String REGION_SQL = "SELECT " +
            "DISTRICT_ZONE_ID AS REGION_ID " +
            ",EXT_ZONE_NUMBER " +
            ",NAME " +
            ",DESCRIPTION " +
            "FROM SY_DISTRICT_ZONE WHERE DISTRICT_NUMBER = 1000 AND IS_ACTIVE_IND = 1 ";

    private final String ENROLLMENT_SQL = "SELECT * FROM VW_SIE_STUDENT_ENROLLMENT ";

    private final String SCHOOL_SQL = "SELECT \n" +
            "S.SCHOOL_ID\n" +
            ", S.EXT_SCHOOL_NUMBER\n" +
            ", S.CAMPUS_ID AS DISTRICT_ID\n" +
            ", C.DESCRIPTION AS DISTRICT_NAME\n" +
            ", C.DISTRICT_ZONE_ID AS REGION_ID \n" +
            ", D.DESCRIPTION AS REGION_NAME\n" +
            ", S.SCHOOL_NAME\n" +
            ", ET.VALUE AS SCHOOL_TYPE_CD\n" +
            ", ET.DESCRIPTION AS SCHOOL_TYPE\n" +
            ", (CASE WHEN (FIELD_36 IS NOT NULL) THEN 1  ELSE 0 END) AS IS_VOCATIONAL\n" +
            ", S.ADDRESS_LINE_1\n" +
            ", S.ADDRESS_LINE_2\n" +
            ", CC.VALUE AS CITY_CD\n" +
            ", CC.DESCRIPTION AS CITY\n" +
            ", S.COUNTRY\n" +
            ", S.STATE\n" +
            ", S.ZIP_CODE\n" +
            ", S.EMAIL\n" +
            ", (S.PHONE_AREA_CODE || S.PHONE_NUMBER) AS PHONE\n" +
            "FROM SY_SCHOOL S\n" +
            "LEFT JOIN SY_CAMPUS C ON S.CAMPUS_ID = C.CAMPUS_ID AND C.IS_ACTIVE_IND = 1\n" +
            "LEFT JOIN SY_DISTRICT_ZONE D ON C.DISTRICT_ZONE_ID = D.DISTRICT_ZONE_ID AND D.IS_ACTIVE_IND = 1\n" +
            "LEFT JOIN ENUM_SY_SCHOOL_TYPE ET ON S.SCHOOL_TYPE_CD = ET.VALUE\n" +
            "LEFT JOIN ENUM_CE_COUNTY_CODE CC ON S.COUNTY_CD = CC.VALUE AND CC.IS_ACTIVE_IND = 1\n" +
            "LEFT JOIN SY_FLEX_DATA FD ON S.SCHOOL_ID = FD.TYPE_ID AND FD.FLEX_OWNER_ID =604 ";

    private final String SCHOOL_GRADE_LEVELS = "SELECT \n" +
            "NAME, DESCRIPTION, VALUE, SCHOOL_ID, SCHOOL_YEAR, NEXT_YEAR_GRADE \n" +
            "FROM ENUM_SY_SCHOOL_GRADE_LEVEL\n" +
            "WHERE IS_ACTIVE_IND = 1";


    @PostConstruct
    private void init() {
        setDataSource(smaxDatasource);
    }

    @Override
    public Parent findHouseHead(String lastSsn, Date dob, String lastname) {
        String sql = PARENT_SQL.concat(" AND SUBSTR(A.SSN, -4) = ? AND DATE_OF_BIRTH = ? and LAST_NAME like '" + lastname + "%'");
        List<Parent> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Parent.class), lastSsn, dob);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public Student findStudent(String lastSsn, Date dob, Long studentNumber) {
        String sql = STUDENT_SQL.concat(" AND SUBSTR(A.SSN, -4) = ? AND DATE_OF_BIRTH = ? and EXT_STUDENT_NUMBER = ?");
        List<Student> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Student.class), lastSsn, dob, studentNumber);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public Student findStudent(Long studentNumber) {
        String sql = STUDENT_SQL.concat(" AND EXT_STUDENT_NUMBER = ?");
        List<Student> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(Student.class), studentNumber);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public StudentAddress findAddress(Long studentNumber) {
        String sql = STUDENT_ADDRESS_SQL.concat(" AND EXT_STUDENT_NUMBER = ? ");
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
        String sql = SCHOOL_SQL.concat(" WHERE S.IS_ACTIVE_IND = 1 " +
                "AND C.DISTRICT_ZONE_ID = ? " +
                "AND EXISTS(SELECT 1 FROM ENUM_SY_SCHOOL_GRADE_LEVEL SGL \n" +
                "WHERE SGL.SCHOOL_ID = S.SCHOOL_ID AND SGL.IS_ACTIVE_IND = 1\n" +
                "AND SGL.SCHOOL_YEAR = ? AND SGL.VALUE = ?) ORDER BY SCHOOL_NAME");
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(School.class), regionId, schoolYear, gradeLevel);
    }

    @Override
    public School findSchoolById(Long schoolId) {
        String sql = SCHOOL_SQL.concat(" WHERE SCHOOL_ID = ?");
        return getJdbcTemplate().queryForObject(sql, new BeanPropertyRowMapper<>(School.class), schoolId);
    }

    @Override
    public List<Region> getAllRegions() {
        return getJdbcTemplate().query(REGION_SQL, new BeanPropertyRowMapper<>(Region.class));
    }

    @Override
    public SchoolGradeLevel findGradeLevelInfo(Long schoolYear, Long schoolId, String gradeLevel) {
        String sql = SCHOOL_GRADE_LEVELS.concat(" AND SCHOOL_YEAR = ? AND SCHOOL_ID = ? AND VALUE = ?");
        List<SchoolGradeLevel> levels = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(SchoolGradeLevel.class), schoolYear, schoolId, gradeLevel);
        return levels.isEmpty() ? null : levels.get(0);
    }

}