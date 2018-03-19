package com.gemini.services;

import com.gemini.beans.forms.User;
import com.gemini.beans.internal.FailureLogin;
import com.gemini.beans.internal.UserAction;
import com.gemini.beans.requests.ParentProfileInfoRequest;
import com.gemini.beans.requests.user.ForgotPasswordRequest;
import com.gemini.beans.requests.user.RegisterRequest;
import com.gemini.beans.requests.user.ResetPasswordRequest;
import com.gemini.beans.requests.user.UserActivationRequest;
import com.gemini.beans.types.RequestStatus;
import com.gemini.database.jpa.entities.FailureLoginLogEntity;
import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import com.gemini.database.jpa.entities.UserActionsLogEntity;
import com.gemini.database.jpa.entities.UserEntity;
import com.gemini.database.jpa.respository.FailureLoginLogRepository;
import com.gemini.database.jpa.respository.PreEnrollmentRepository;
import com.gemini.database.jpa.respository.UserActionsLogRepository;
import com.gemini.database.jpa.respository.UserRepository;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.DateUtils;
import com.gemini.utils.Utils;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 6:21 PM
 */
@Service
@Order(SecurityProperties.IGNORED_ORDER)
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserActionsLogRepository userActionsLogRepository;
    @Autowired
    private PreEnrollmentRepository preEnrollmentRepository;
    @Autowired
    private FailureLoginLogRepository failureLoginLogRepository;
    @Autowired
    private CommonService commonService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MailService mailService;

    public boolean existsUserOnRegister(String username) {
        return userRepository.findByEmailAndActivationKeyExpireDateIsAfter(username, commonService.getCurrentDate()) != null;
    }

    public User findUserByUsername(String username) {
        UserEntity entity = userRepository.findByEmail(username);
        User userBean = CopyUtils.convert(entity, User.class);
        Utils.copyLastNames(entity, userBean);
        return userBean;
    }

    public User findUserByUsernameForAuth(String username) {
        UserEntity entity = userRepository.findByEmailAndEnabledTrueAndActivationKeyIsNull(username);
        if (entity == null)
            return null;
        User userBean = CopyUtils.convert(entity, User.class);
        Utils.copyLastNames(entity, userBean);
        List<PreEnrollmentRequestEntity> preEnrollments = preEnrollmentRepository.findByUserIdOrderBySubmitDateDesc(entity.getId());
        userBean.setTotalPreEnrollments(preEnrollments.size());
        userBean.setWorkingPreEnrollmentId(null);
        if (preEnrollments.isEmpty())
            userBean.setWorkingPreEnrollmentId(-1L);
        else if (preEnrollments.size() == 1) {
            PreEnrollmentRequestEntity preEnrollment = preEnrollments.get(0);
            if (RequestStatus.ACTIVE.equals(preEnrollment.getRequestStatus()))
                userBean.setWorkingPreEnrollmentId(preEnrollment.getId());
        }

        return userBean;
    }

    public boolean activationCodeExists(String activationCode) {
        UserEntity entity = userRepository.findByActivationKeyAndActivationKeyExpireDateIsAfter(activationCode, commonService.getCurrentDate());
        return entity != null;
    }

    public boolean credentialKeyExists(String activationCode) {
        UserEntity entity = userRepository.findByCredentialLostKeyAndCredentialLostKeyExpireDateIsAfter(activationCode, commonService.getCurrentDate());
        return entity != null;
    }

    public boolean activateUser(UserActivationRequest request) {
        boolean activate = false;
        UserEntity entity = userRepository.findByActivationKeyAndActivationKeyExpireDateIsAfter(request.getActivationCode(), commonService.getCurrentDate());
        if (entity != null) {
            String pwd = passwordEncoder.encode(request.getPassword());
            entity.setPassword(pwd);
            entity.setEnabled(true);
            entity.setActivationKey(null);
            entity.setActivationKeyExpireDate(null);
            entity.setActivationDate(commonService.getCurrentDate());
            entity = userRepository.save(entity);
            activate = entity != null;
        }

        return activate;
    }

    public boolean updateUser(ParentProfileInfoRequest request) {
        UserEntity entity = userRepository.findOne(request.getId());
        entity.setRelationType(request.getRelationType());
        entity.setDateOfBirth(request.getDateOfBirth());
        entity.setFirstName(request.getFirstName());
        entity.setMiddleName(request.getMiddleName());
        entity.setLastName(request.getLastName());
        entity.setProfileCompleted(true);
        entity = userRepository.save(entity);
        return entity != null;
    }

    public boolean resetPassword(ResetPasswordRequest request) {
        boolean reset = false;
        UserEntity entity = userRepository.findByCredentialLostKeyAndCredentialLostKeyExpireDateIsAfter(request.getCredentialLostKey(), commonService.getCurrentDate());
        if (entity != null) {
            String pwd = passwordEncoder.encode(request.getPassword());
            entity.setCredentialLostKey(null);
            entity.setCredentialLostKeyExpireDate(null);
            entity.setPassword(pwd);
            entity = userRepository.save(entity);
            reset = entity != null;
        }

        return reset;
    }

    public boolean cancelResetPassword(String key, HttpServletRequest servletRequest) {
        boolean cancel = false;
        UserEntity entity = userRepository.findByCredentialLostKeyAndCredentialLostKeyExpireDateIsAfter(key, commonService.getCurrentDate());
        if (entity != null) {
            entity.setCredentialLostKey(null);
            entity.setCredentialLostKeyExpireDate(null);
            entity = userRepository.save(entity);
            cancel = entity != null;
            logUserAction(key, UserAction.CANCEL_RESET_PASSWORD, entity.getId(), servletRequest);
        }
        return cancel;
    }

    public String createUser(RegisterRequest request, HttpServletRequest servletRequest) {
        String activationKey = Utils.generateKey();
        UserEntity entity = userRepository.findByEmail(request.getEmail());
        if (entity == null)
            entity = new UserEntity();
        entity.setEmail(request.getEmail());
        entity.setActivationKey(activationKey);
        entity = userRepository.save(entity);
        logUserAction(activationKey, UserAction.ACCOUNT_ACTIVATION, entity.getId(), servletRequest);
        return entity != null ? activationKey : null;
    }

    public void saveLastLogin(User user) {
        UserEntity entity = userRepository.findOne(user.getId());
        entity.setLastLogin(commonService.getCurrentDate());
        userRepository.save(entity);
    }

    public void saveFailureLogin(FailureLogin failureLogin) {
        FailureLoginLogEntity loginLogEntity = CopyUtils.convert(failureLogin, FailureLoginLogEntity.class);
        failureLoginLogRepository.save(loginLogEntity);
    }

    public void saveSentActivationResult(String email, boolean result) {
        UserEntity entity = userRepository.findByEmail(email);
        Date expireActivation = DateUtils.toDate(LocalDateTime.now().plusHours(commonService.getActivationKeyInHours()));
        entity.setActivationCodeSent(result ? commonService.getCurrentDate() : null);
        entity.setActivationKeyExpireDate(result ? expireActivation : null);
        userRepository.save(entity);
    }

    public boolean processForgetEmailRequest(ForgotPasswordRequest request, HttpServletRequest servletRequest) {
        UserEntity userEntity = userRepository.findByEmailAndEnabledTrueAndActivationKeyIsNull(request.getEmail());
        if (userEntity != null) {
            String key = Utils.generateKey();
            userEntity.setCredentialLostKey(key);
            userEntity.setCredentialLostKeyExpireDate(DateUtils.toDate(LocalDateTime.now().plusMinutes(commonService.getCredentialKeyExpireInMinutes())));
            userRepository.save(userEntity);
            mailService.sendPasswordForgotEmail(request.getEmail(), key);
            logUserAction(key, UserAction.RESET_PASSWORD, userEntity.getId(), servletRequest);
        }
        return userEntity != null;
    }

    public void logUserAction(String key, UserAction action, HttpServletRequest servletRequest) {
        logUserAction(key, action, null, servletRequest);
    }

    public void logUserAction(String key, UserAction action, Long userId, HttpServletRequest servletRequest) {
        UserActionsLogEntity userActionsLog = new UserActionsLogEntity();
        userActionsLog.setUserId(userId);
        userActionsLog.setKeyString(key);
        userActionsLog.setAction(action);
        userActionsLog.setRemoteIp(servletRequest.getRemoteAddr());
        userActionsLogRepository.save(userActionsLog);
    }
}