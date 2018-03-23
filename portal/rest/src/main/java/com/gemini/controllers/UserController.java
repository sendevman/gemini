package com.gemini.controllers;

import com.gemini.beans.forms.User;
import com.gemini.beans.requests.ParentProfileInfoRequest;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.services.CommonService;
import com.gemini.services.UserService;
import com.gemini.utils.DateUtils;
import com.gemini.utils.MessageHelper;
import com.gemini.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/6/18
 * Time: 2:24 PM
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CommonService commonService;
    @Autowired
    private MessageHelper messageHelper;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> save(@RequestBody ParentProfileInfoRequest request, @AuthenticationPrincipal User loggedUser, BindingResult result) {
        if (!ValidationUtils.valid(request.getRelationType(), request.getDateOfBirth(), request.getFirstName(), request.getLastName()))
            return ResponseEntity.ok(ResponseBase.error( messageHelper.processMessages("user.missing.required.fields")));

        int userAge = DateUtils.toYears(request.getDateOfBirth());
        if (userAge < commonService.getMinUserAgeToSubmitRequest()) {
            ResponseBase response =
                    ResponseBase.error(messageHelper.processMessages("user.min.age.validation"));
            return ResponseEntity.ok(response);
        }

        request.setId(loggedUser.getId());
        boolean saved = userService.updateUser(request);
        if (!saved)
            return ResponseEntity.ok(ResponseBase.error(messageHelper.processMessage("error.saving.profile")));
        else
            updatePrincipal(request, loggedUser);

        return ResponseEntity.ok(ResponseBase.success(loggedUser));
    }

    private void updatePrincipal(ParentProfileInfoRequest request, User loggedUser) {
        loggedUser.setFirstName(request.getFirstName());
        loggedUser.setMiddleName(request.getMiddleName());
        loggedUser.setLastName(request.getLastName());
        loggedUser.setProfileCompleted(true);
    }


}