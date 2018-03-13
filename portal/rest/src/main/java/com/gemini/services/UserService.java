package com.gemini.services;

import com.gemini.beans.forms.User;
import com.gemini.beans.internal.FailureLogin;
import com.gemini.beans.requests.ParentProfileInfoRequest;
import com.gemini.beans.requests.RegisterRequest;
import com.gemini.beans.requests.UserActivationRequest;
import com.gemini.beans.types.RequestStatus;
import com.gemini.database.jpa.entities.FailureLoginLogEntity;
import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import com.gemini.database.jpa.entities.UserEntity;
import com.gemini.database.jpa.jdbc.CommonDao;
import com.gemini.database.jpa.respository.FailureLoginLogRepository;
import com.gemini.database.jpa.respository.PreEnrollmentRepository;
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
    private PreEnrollmentRepository preEnrollmentRepository;
    @Autowired
    private FailureLoginLogRepository failureLoginLogRepository;
    @Autowired
    private CommonService commonService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private int expireInHours = 48;

    public boolean existsUser(String username) {
        return userRepository.findByEmail(username) != null;
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
        List<PreEnrollmentRequestEntity> preEnrollments = preEnrollmentRepository.findByParentId(entity.getId());
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
        entity.setLastName(Utils.toLastName(request.getFatherLastName(), request.getMotherLastName()));
        entity.setProfileCompleted(true);
        entity = userRepository.save(entity);
        return entity != null;
    }

    public String createUser(RegisterRequest request) {
        String activationKey = Utils.generateActivationCode();
        UserEntity entity = new UserEntity();
        entity.setEmail(request.getEmail());
        entity.setActivationKey(activationKey);
        entity = userRepository.save(entity);
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
        Date expireActivation = DateUtils.toDate(LocalDateTime.now().plusHours(expireInHours));
        entity.setActivationCodeSent(result ? commonService.getCurrentDate() : null);
        entity.setActivationKeyExpireDate(result ? expireActivation : null);
        userRepository.save(entity);
    }


}