package com.gemini.services;

import com.gemini.beans.forms.User;
import com.gemini.beans.requests.UserActivationRequest;
import com.gemini.beans.types.RelationType;
import com.gemini.database.jpa.entities.UserEntity;
import com.gemini.database.jpa.respository.UserRepository;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.DateUtils;
import com.gemini.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringTokenizer;

import static com.gemini.utils.DateUtils.toDate;

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
    private PasswordEncoder passwordEncoder;
    private Long expireInHours = 48L;

    public boolean existsUser(String username) {
        return userRepository.findByEmail(username) != null;
    }

    public User findUserByUsername(String username) {
        UserEntity entity = userRepository.findByEmail(username);
        User userBean = CopyUtils.convert(entity, User.class);
        copyLastNames(entity, userBean);
        return userBean;
    }

    public User findUserByUsernameForAuth(String username) {
//        UserEntity u = new UserEntity();
//        u.setEmail("bla@g.com");
//        u.setPassword(passwordEncoder.encode("123"));
//        u.setFirstName("Bla");
//        u.setLastName("Bla");
//        u.setRelationType(RelationType.FATHER);
//        u.setDateOfBirth(new Date());
//        u.setEnabled(true);
//        userRepository.save(u);
//
        UserEntity entity = userRepository.findByEmailAndEnabledTrueAndActivationKeyIsNull(username);
        if (entity == null)
            return null;
        User userBean = CopyUtils.convert(entity, User.class);
        copyLastNames(entity, userBean);

        return userBean;
    }

    public boolean activationCodeExists(String activationCode) {
        UserEntity entity = userRepository.findByActivationKeyAndActivationKeyExpireDateIsAfter(activationCode, DateUtils.getCurrentDate());
        return entity != null;
    }

    public boolean activateUser(UserActivationRequest request) {
        boolean activate = false;
        UserEntity entity = userRepository.findByActivationKeyAndActivationKeyExpireDateIsAfter(request.getActivationCode(), DateUtils.getCurrentDate());
        if (entity != null) {
            String pwd = passwordEncoder.encode(request.getPassword());
            entity.setPassword(pwd);
            entity.setEnabled(true);
            entity.setActivationKey(null);
            entity.setActivationDate(new Date());
            entity = userRepository.save(entity);
            activate = entity != null;
        }

        return activate;
    }

    public boolean updateUser(User userBean) {
        UserEntity entity = CopyUtils.convert(userBean, UserEntity.class);
        entity = userRepository.save(entity);
        return entity != null;
    }

    public String createUser(User userBean) {
        String activationKey = Utils.generateActivationCode(userBean.getFatherLastName());
        UserEntity entity = CopyUtils.convert(userBean, UserEntity.class);
        entity.setActivationKey(activationKey);
        copyLastNames(userBean, entity);
        entity = userRepository.save(entity);
        return entity != null ? activationKey : null;
    }

    public void saveSentActivationResult(String email, boolean result) {
        UserEntity entity = userRepository.findByEmail(email);
        Date expireActivation = toDate(LocalDateTime.now().plus(expireInHours, ChronoUnit.HOURS));
        entity.setActivationCodeSent(result ? new Date() : null);
        entity.setActivationKeyExpireDate(result ? expireActivation : null);
        userRepository.save(entity);
    }

    private void copyLastNames(User userBean, UserEntity entity) {
        String lastName = Utils.toLastName(userBean.getFatherLastName(), userBean.getMotherLastName());
        entity.setLastName(lastName);
    }

    private void copyLastNames(UserEntity entity, User userBean) {
        StringTokenizer tokenizer = new StringTokenizer(entity.getLastName().trim(), " ");
        String fatherLastName = tokenizer.hasMoreTokens() ? tokenizer.nextToken() : "";
        String motherLastName = tokenizer.hasMoreTokens() ? tokenizer.nextToken() : "";
        userBean.setFatherLastName(fatherLastName);
        userBean.setMotherLastName(motherLastName);
    }

}