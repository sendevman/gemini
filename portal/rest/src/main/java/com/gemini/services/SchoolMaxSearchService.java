package com.gemini.services;

import com.gemini.beans.forms.User;
import com.gemini.beans.requests.StudentSearchRequest;
import com.gemini.database.dao.beans.Student;
import com.gemini.database.jpa.entities.StudentSearchLogEntity;
import com.gemini.database.jpa.respository.StudentSearchLogRepository;
import com.gemini.utils.CopyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/22/18
 * Time: 6:00 PM
 */
//todo: fran check if this can be implemented with spring aspect
@Service
public class SchoolMaxSearchService {

    static final Logger logger = LoggerFactory.getLogger(SchoolMaxSearchService.class.getName());

    @Autowired
    private SchoolmaxService schoolmaxService;
    @Autowired
    private StudentSearchLogRepository searchLogRepository;

    public Student retrieveStudentInfo(StudentSearchRequest searchRequest, User user) {

        Student student = schoolmaxService.retrieveStudentInfo(searchRequest);
        try {
            StudentSearchLogEntity log = CopyUtils.convert(searchRequest, StudentSearchLogEntity.class);
            log.setUserId(user.getId());
            log.setFound(student != null);
            searchLogRepository.save(log);
        } catch (Exception e) {
            logger.error("error logging search request for user " + user.getId(), e);
        }

        return student;
    }
}