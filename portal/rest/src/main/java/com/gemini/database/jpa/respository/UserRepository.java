package com.gemini.database.jpa.respository;

import com.gemini.database.jpa.entities.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 3:20 PM
 */
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    UserEntity findByEmail(String email);

    UserEntity findByEmailAndActivationKeyExpireDateIsAfterAndEnabledFalse(String email, Date currentDate);

    UserEntity findByEmailAndEnabledTrueAndActivationKeyIsNull(String email);

    UserEntity findByActivationKeyAndActivationKeyExpireDateIsAfter(String activationKey, Date currentDate);

    UserEntity findByCredLostKeyAndCredLostKeyExpireDateIsAfter(String credLostKey, Date currentDate);

    @Query(value = "select e from PreEnrollmentRequestEntity e " +
            " inner join e.student s where s.extStudentNumber = :studentNumber", nativeQuery = true)
    boolean isUserRequest(Long requestId);

}