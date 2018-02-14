package com.gemini.services;

import com.gemini.beans.UserBean;
import com.gemini.beans.requests.UserActivationRequest;
import com.gemini.database.jpa.entities.UserEntity;
import com.gemini.database.jpa.respository.UserRepository;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static com.gemini.utils.DateUtils.toDate;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 6:21 PM
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    Long expireInHours = 48L;

    public boolean existsUser(String username) {
        return userRepository.findByEmail(username) != null;
    }

    public UserBean findUserByUsername(String username) {
        UserEntity entity = userRepository.findByEmail(username);
        UserBean userBean = CopyUtils.convert(entity, UserBean.class);
        copyLastNames(entity, userBean);
        return userBean;
    }

    public boolean activationCodeExists(String activationCode){
        UserEntity entity = userRepository.findByActivationKeyAndActivationKeyExpireDateIsAfter(activationCode, DateUtils.getCurrentDate());
        return entity != null;
    }

    public boolean activateUser(UserActivationRequest request) {
        boolean activate = false;
        UserEntity entity = userRepository.findByActivationKeyAndActivationKeyExpireDateIsAfter(request.getActivationCode(), DateUtils.getCurrentDate());
        if (entity != null) {
            entity.setPassword(request.getPassword());
            entity.setEnabled(true);
            entity.setActivationKey(null);
            entity.setActivationDate(new Date());
            entity = userRepository.save(entity);
            activate = entity != null;
        }

        return activate;
    }

    public boolean updateUser(UserBean userBean) {
        UserEntity entity = CopyUtils.convert(userBean, UserEntity.class);
        entity = userRepository.save(entity);
        return entity != null;
    }

    public String createUser(UserBean userBean) {
        String activationKey = CopyUtils.generateActivationCode(userBean.getFatherLastName());
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

    private void copyLastNames(UserBean userBean, UserEntity entity) {
        String fatherLastName = StringUtils.capitalize(userBean.getFatherLastName().trim());
        String motherLastName = StringUtils.capitalize(userBean.getMotherLastName().trim());
        entity.setLastName(String.format("%s %s", fatherLastName, motherLastName));
    }

    private void copyLastNames(UserEntity entity, UserBean userBean) {
        String lastName = entity.getLastName();
        String tokens[] = lastName.split(" ");
        String fatherLastName = tokens[0];
        String motherLastName = tokens[1];
        userBean.setFatherLastName(fatherLastName);
        userBean.setMotherLastName(motherLastName);
    }

}