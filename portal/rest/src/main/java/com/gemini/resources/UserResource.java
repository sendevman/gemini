package com.gemini.resources;

import com.gemini.beans.forms.User;
import com.gemini.beans.requests.ParentProfileInfoRequest;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.services.CommonService;
import com.gemini.services.UserService;
import com.gemini.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Arrays;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/6/18
 * Time: 2:24 PM
 */
@RestController
@RequestMapping("/user")
public class UserResource {

    @Autowired
    private UserService userService;
    @Autowired
    private CommonService commonService;
    @Autowired
    private Environment env;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<ResponseBase> save(@RequestBody @Valid ParentProfileInfoRequest request, @AuthenticationPrincipal User loggedUser, BindingResult result) {
        if (result.hasErrors())
            return ResponseEntity.ok(ResponseBase.error("Missing require fields"));

        int userAge = DateUtils.toYears(request.getDateOfBirth());
        if (userAge < commonService.getMinUserAgeToSubmitRequest()) {
            return ResponseEntity.ok(ResponseBase.error("Error unable to save profile", Arrays.asList(env.getProperty("messages.user.min.age.validation"))));
        }

        request.setId(loggedUser.getId());
        boolean saved = userService.updateUser(request);
        if (!saved)
            return ResponseEntity.ok(ResponseBase.error("Error saving profile info"));
        else
            updatePrincipal(request, loggedUser);

        return ResponseEntity.ok(ResponseBase.success(loggedUser));
    }

    private void updatePrincipal(ParentProfileInfoRequest request, User loggedUser) {
        loggedUser.setFirstName(request.getFirstName());
        loggedUser.setFatherLastName(request.getFatherLastName());
        loggedUser.setMotherLastName(request.getMotherLastName());
        loggedUser.setProfileCompleted(true);
    }


}