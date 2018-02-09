package com.gemini.database.dao;

import com.gemini.database.beans.ParentBean;
import com.gemini.database.beans.StudentBean;
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
@Repository
public class SchoolmaxDao extends JdbcDaoSupport {
    @Autowired
    @Qualifier(value = "smaxDatasource")
    DataSource smaxDatasource;

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
            "A.GENDER, \n" +
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

    //    123Abc
    @PostConstruct
    private void init() {
        setDataSource(smaxDatasource);
    }

    public ParentBean findHouseHead(String lastSsn, Date dob, String lastname) {
        String sql = PARENT_SQL.concat(" AND SUBSTR(A.SSN, -4) = ? AND DATE_OF_BIRTH = ? and LAST_NAME like '" + lastname + "%'");
        List<ParentBean> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(ParentBean.class), lastSsn, dob);
        return list.isEmpty() ? null : list.get(0);
    }

    public StudentBean findStudent(String lastSsn, Date dob, Long studentNumber) {
        String sql = STUDENT_SQL.concat(" AND SUBSTR(A.SSN, -4) = ? AND DATE_OF_BIRTH = ? and EXT_STUDENT_NUMBER = ?");
        List<StudentBean> list = getJdbcTemplate().query(sql, new BeanPropertyRowMapper<>(StudentBean.class), lastSsn, dob, studentNumber);
        return list.isEmpty() ? null : list.get(0);
    }

//    void findStudentDemographicsInfo() {
//    }
//
//    void findAddress() {
//    }
//
//    void findSchoolsByCity() {
//    }
//
//    void findGradeLevelBySchool() {
//    }

}