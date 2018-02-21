package com.gemini.resources;

import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.services.PreEnrollmentService;
import com.gemini.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/16/18
 * Time: 2:24 PM
 */
@RestController
@RequestMapping("/enrollment/pre")
public class PreEnrollmentRequestResource {

    @Autowired
    private PreEnrollmentService preEnrollmentService;

    @RequestMapping(value = "/{requestId}")
    public ResponseEntity<ResponseBase> retrieve(@PathVariable Long requestId) {
        return ResponseEntity.ok(ResponseBase.success());
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> savePreEnrollmentRequest(@RequestBody PreEnrollmentInitialRequest initialRequest) {

        boolean created;
        if (ValidationUtils.valid(initialRequest.getStudentNumber())
                || ValidationUtils.valid(
                initialRequest.getFirstName(),
                initialRequest.getFatherLastName(),
                initialRequest.getMotherLastName(),
                initialRequest.getDateOfBirth(),
                initialRequest.getGender()))
            created = preEnrollmentService.createPreEnrollment(initialRequest);
        else
            return ResponseEntity.badRequest().body(ResponseBase.error("Missing fields to create pre-enrollment"));

        return ResponseEntity.ok(created ? ResponseBase.success() : ResponseBase.error("Error saving pre-enrollment"));

    }
}