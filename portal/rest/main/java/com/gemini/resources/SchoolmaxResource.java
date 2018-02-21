package com.gemini.resources;

import com.gemini.beans.integration.ParentResponse;
import com.gemini.beans.integration.StudentResponse;
import com.gemini.database.dao.beans.Parent;
import com.gemini.database.dao.beans.Student;
import com.gemini.services.SchoolmaxService;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 12:22 AM
 */
@RestController
@RequestMapping("/smax/interface")
public class SchoolmaxResource {

    @Autowired
    private SchoolmaxService smaxService;

    @RequestMapping(value = "/search/parent/lastssn/{lastSSN}/dob/{dob}/lastname/{lastname}")
    public ResponseEntity<ParentResponse> searchParent(@PathVariable(value = "lastSSN") String lastSSN,
                                                       @PathVariable(value = "dob") @DateTimeFormat(pattern = "yyyyMMdd") String dob,
                                                       @PathVariable(value = "lastname") String lastname) {
        Date dateOfBirth = ValidationUtils.validDate(dob);
        if (!(StringUtils.hasLength(lastname)
                && StringUtils.hasLength(lastSSN) && lastSSN.matches("[0-9]{4}")
                && dateOfBirth != null))
            return ResponseEntity.badRequest().body(null);


        Parent parentBean = smaxService.retrieveHouseHeadInfo(lastSSN, dateOfBirth, lastname);
        return ResponseEntity.ok().body(CopyUtils.convert(parentBean, ParentResponse.class));
    }

    @RequestMapping(value = "/search/student/lastssn/{lastSSN}/student/number/{studentNumber}/dob/{dob}")
    public ResponseEntity<StudentResponse> searchStudent(@PathVariable(value = "lastSSN") String lastSSN,
                                                         @PathVariable(value = "studentNumber") Long studentNumber,
                                                         @PathVariable(value = "dob") @DateTimeFormat(pattern = "yyyyMMdd") String dob) {
        Date dateOfBirth = ValidationUtils.validDate(dob);
        if (!(dateOfBirth != null
                && StringUtils.hasLength(lastSSN) && lastSSN.matches("[0-9]{4}")
                && studentNumber != null && studentNumber > 0L))
            return ResponseEntity.badRequest().body(null);

        Student studentBean = smaxService.retrieveStudentInfo(lastSSN, studentNumber, dateOfBirth);
        StudentResponse response = CopyUtils.convert(studentBean, StudentResponse.class);
        response.setFound(studentBean != null);
        if (studentBean != null)
            response.setStudentNumber(studentBean.getExtStudentNumber());
        return ResponseEntity.ok().body(response);

    }


}