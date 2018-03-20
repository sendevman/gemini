package com.gemini.controllers;

import com.gemini.beans.forms.*;
import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.requests.PreEnrollmentSubmitRequest;
import com.gemini.beans.requests.VocationalPreEnrollmentSubmitRequest;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.services.MailService;
import com.gemini.services.PreEnrollmentService;
import com.gemini.utils.ValidationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/16/18
 * Time: 2:24 PM
 */
@RestController
@RequestMapping("/enrollment/pre")
public class PreEnrollmentRequestController {
    static Logger logger = LoggerFactory.getLogger(PreEnrollmentRequestController.class.getName());

    @Autowired
    private PreEnrollmentService preEnrollmentService;
    @Autowired
    private MailService mailService;

    @RequestMapping(value = "/{requestId}")
    public ResponseEntity<ResponseBase> retrieve(@PathVariable Long requestId) {
        PreEnrollmentStudentInfoBean studentInfo = null;
        //todo: validate user has access to this enrollment
        if (ValidationUtils.valid(requestId))
            studentInfo = preEnrollmentService.findPreEnrollmentById(requestId);
        return ResponseEntity.ok(ResponseBase.success(requestId, studentInfo));
    }

    @RequestMapping(value = "/vocational/{requestId}")
    public ResponseEntity<ResponseBase> retrieveVocationalPreEnrollment(@PathVariable Long requestId) {
        VocationalPreEnrollmentBean vocationalPreEnrollment = null;
        //todo: validate user has access to this enrollment
        if (ValidationUtils.valid(requestId))
            vocationalPreEnrollment = preEnrollmentService.findVocationalPreEnrollmentById(requestId);
        return ResponseEntity.ok(ResponseBase.success(requestId, vocationalPreEnrollment));
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> savePreEnrollmentRequest(@RequestBody PreEnrollmentInitialRequest initialRequest, @AuthenticationPrincipal User loggedUser) {
        boolean exists = preEnrollmentService.exists(initialRequest, loggedUser);
        ResponseEntity<ResponseBase> response;
        if (!exists) {
            response = handleCreatePreEnrollment(initialRequest, loggedUser);
        } else {
            response = handleEditPreEnrollment(initialRequest);
        }

        return response;
    }

    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> submitPreEnrollment(@RequestBody PreEnrollmentSubmitRequest submitRequest, @AuthenticationPrincipal User loggedUser) {
        boolean saved = false;
        try {
            mailService.sendPreEnrollmentSubmitEmail(loggedUser, submitRequest);
            saved = preEnrollmentService.submitPreEnrollment(submitRequest);
            loggedUser.setWorkingPreEnrollmentId(null);
        } catch (Exception e) {
            logger.error("error submitted pre-enrollment " + submitRequest.getRequestId(), e);
        }
        if (saved)
            return ResponseEntity.ok(ResponseBase.success(submitRequest.getRequestId()));
        return ResponseEntity.ok(ResponseBase.error("Error submitting pre-enrolmment"));
    }

    @RequestMapping(value = "/vocational/partial/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> partialVocationalSubmit(@RequestBody VocationalPreEnrollmentSubmitRequest request) {
        boolean saved = preEnrollmentService.partialVocationalPreEnrollmentSave(request);
        if (saved)
            return ResponseEntity.ok(ResponseBase.success(request.getRequestId()));
        return ResponseEntity.ok(ResponseBase.error("Error submitting vocational pre-enrolmment"));
    }

    @RequestMapping(value = "/vocational/submit", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> vocationalSubmit(@RequestBody VocationalPreEnrollmentSubmitRequest request, @AuthenticationPrincipal User loggedUser) {
        boolean saved = false;
        try {
//            mailService.sendPreEnrollmentSubmitEmail(loggedUser, request);
            saved = preEnrollmentService.vocationalPreEnrollmentSubmit(request);
            loggedUser.setWorkingPreEnrollmentId(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (saved)
            return ResponseEntity.ok(ResponseBase.success(request.getRequestId()));
        return ResponseEntity.ok(ResponseBase.error("Error submitting vocational pre-enrollment"));
    }

    @RequestMapping(value = "/{requestId}/address")
    public ResponseEntity<PreEnrollmentAddressBean> getPreEnrollmentAddress(@PathVariable Long requestId) {
        PreEnrollmentAddressBean addressBean = preEnrollmentService.getAddress(requestId);
        return ResponseEntity.ok(addressBean);
    }

    @RequestMapping(value = "/{requestId}/address/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> savePreEnrollmentAddress(@PathVariable Long requestId, @RequestBody PreEnrollmentAddressBean request) {
        boolean validRequest = preEnrollmentService.validAddressForRequestId(requestId, request.getPhysical(), request.getPostal());
        if (validRequest) {
            boolean saved;
            saved = preEnrollmentService.updateStudentAddress(request.getPhysical());
            saved &= preEnrollmentService.updateStudentAddress(request.getPostal());
            return ResponseEntity.ok(saved ? ResponseBase.success(requestId) : ResponseBase.error("Error saving address"));
        }
        return ResponseEntity.badRequest().body(ResponseBase.error("Address are not attached to this request"));
    }

    private ResponseEntity<ResponseBase> handleCreatePreEnrollment(PreEnrollmentInitialRequest initialRequest, User loggedUser) {
        PreEnrollmentBean preEnrollmentBean;
        if (ValidationUtils.valid(initialRequest.getStudentNumber())
                || ValidationUtils.valid(
                initialRequest.getFirstName(),
                initialRequest.getLastName(),
                initialRequest.getDateOfBirth(),
                initialRequest.getGender()))
            preEnrollmentBean = preEnrollmentService.createPreEnrollment(initialRequest, loggedUser);
        else
            return ResponseEntity.badRequest().body(ResponseBase.error("Missing fields to create pre-enrollment"));

        ResponseBase response;
        if (preEnrollmentBean != null)
            response = ResponseBase.success(preEnrollmentBean.getId(), preEnrollmentBean);
        else
            response = ResponseBase.error("Error saving pre-enrollment");
        return ResponseEntity.ok(response);
    }

    private ResponseEntity<ResponseBase> handleEditPreEnrollment(PreEnrollmentInitialRequest initialRequest) {
        PreEnrollmentBean preEnrollmentBean = preEnrollmentService.updatePreEnrollment(initialRequest);
        if (preEnrollmentBean != null)
            return ResponseEntity.ok(ResponseBase.success(preEnrollmentBean.getId(), preEnrollmentBean));
        return ResponseEntity.ok(ResponseBase.error("Error updating pre-enrollment"));
    }


}