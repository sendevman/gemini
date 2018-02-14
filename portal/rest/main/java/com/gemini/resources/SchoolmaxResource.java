package com.gemini.resources;

import com.gemini.utils.CopyUtils;
import com.gemini.beans.integration.ParentResponse;
import com.gemini.beans.integration.StudentResponse;
import com.gemini.database.dao.beans.ParentBean;
import com.gemini.database.dao.beans.StudentBean;
import com.gemini.services.SchoolmaxService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
        Date dateOfBirth = validDate(dob);
        if (!(StringUtils.hasLength(lastname)
                && StringUtils.hasLength(lastSSN) && lastSSN.matches("[0-9]{4}")
                && dateOfBirth != null))
            return ResponseEntity.badRequest().body(null);


        ParentBean parentBean = smaxService.retrieveHouseHeadInfo(lastSSN, dateOfBirth, lastname);
        return ResponseEntity.ok().body(CopyUtils.convert(parentBean, ParentResponse.class));
    }

    @RequestMapping(value = "/search/student/lastssn/{lastSSN}/student/number/{studentNumber}/dob/{dob}")
    public ResponseEntity<StudentResponse> searchStudent(@PathVariable(value = "lastSSN") String lastSSN,
                                                         @PathVariable(value = "studentNumber") Long studentNumber,
                                                         @PathVariable(value = "dob") @DateTimeFormat(pattern = "yyyyMMdd") String dob) {
        Date dateOfBirth = validDate(dob);
        if (!(dateOfBirth != null
                && StringUtils.hasLength(lastSSN) && lastSSN.matches("[0-9]{4}")
                && studentNumber != null && studentNumber > 0L))
            return ResponseEntity.badRequest().body(null);

        StudentBean studentBean = smaxService.retrieveStudentInfo(lastSSN, studentNumber, dateOfBirth);
        StudentResponse response = new StudentResponse();
        BeanUtils.copyProperties(studentBean, response);
        return ResponseEntity.ok().body(response);

    }


    private Date validDate(String dateParam) {
        Date date = null;
        try {
            if (StringUtils.hasLength(dateParam)) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
                date = sdf.parse(dateParam);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }


}