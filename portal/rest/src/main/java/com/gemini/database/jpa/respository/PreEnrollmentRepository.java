package com.gemini.database.jpa.respository;

import com.gemini.beans.types.RequestStatus;
import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:18 PM
 */
public interface PreEnrollmentRepository extends CrudRepository<PreEnrollmentRequestEntity, Long> {

    @Query(value = "select CASE WHEN COUNT(e) > 0 THEN true ELSE false END from PreEnrollmentRequestEntity e  " +
            "inner join e.student s where s.extStudentNumber = :studentNumber")
    boolean existsByStudentNumber(@Param("studentNumber") Long studentNumber);

    @Query(value = "select e from PreEnrollmentRequestEntity e " +
            " inner join e.student s where s.extStudentNumber = :studentNumber")
    PreEnrollmentRequestEntity findByStudentNumber(@Param("studentNumber") Long studentNumber);

    PreEnrollmentRequestEntity findByIdAndRequestStatusIs(Long id, RequestStatus requestStatus);

    List<PreEnrollmentRequestEntity> findByUserIdOrderBySubmitDateDesc(@Param("userId") Long userId);

}