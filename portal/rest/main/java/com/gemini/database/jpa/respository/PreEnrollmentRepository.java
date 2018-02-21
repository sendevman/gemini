package com.gemini.database.jpa.respository;

import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import org.springframework.data.repository.CrudRepository;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:18 PM
 */
public interface PreEnrollmentRepository extends CrudRepository<PreEnrollmentRequestEntity, Long> {
}