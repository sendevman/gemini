package com.gemini.database.jpa.respository;

import com.gemini.database.jpa.entities.FailureLoginLogEntity;
import org.springframework.data.repository.CrudRepository;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/27/18
 * Time: 11:31 AM
 */
public interface FailureLoginLogRepository extends CrudRepository<FailureLoginLogEntity, Long>{
}