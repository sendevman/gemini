package com.gemini.services;

import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.types.AddressType;
import com.gemini.database.dao.beans.StudentAddress;
import com.gemini.database.dao.beans.StudentBean;
import com.gemini.database.jpa.entities.AddressEntity;
import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import com.gemini.database.jpa.entities.StudentEntity;
import com.gemini.database.jpa.respository.AddressRepository;
import com.gemini.database.jpa.respository.PreEnrollmentRepository;
import com.gemini.database.jpa.respository.StudentRepository;
import com.gemini.utils.CopyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.StringJoiner;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/20/18
 * Time: 10:21 PM
 */
@Service
public class PreEnrollmentService {

    final String PR_COUNTRY = "PR";
    @Autowired
    private UserService userService;
    @Autowired
    private SchoolmaxService smaxService;
    @Autowired
    private PreEnrollmentRepository preEnrollmentRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AddressRepository addressRepository;

    public boolean createPreEnrollment(PreEnrollmentInitialRequest request) {
        PreEnrollmentRequestEntity preEnrollmentEntity = new PreEnrollmentRequestEntity();
        preEnrollmentEntity.setSchoolYear(2019L);
        Long studentNumber = request.getStudentNumber();
        StudentBean student = null;
        StudentAddress address = null;
        if (studentNumber != null && studentNumber > 0L) {
            student = smaxService.retrieveStudentInfo(studentNumber);
            if (student != null) {
                address = smaxService.retrieveStudentAddress(studentNumber);
            }
            AddressEntity postal = new AddressEntity();
            AddressEntity physical = new AddressEntity();
            if (address != null) {
                postal = copyAddressFrom(address, AddressType.POSTAL);
                physical = copyAddressFrom(address, AddressType.PHYSICAL);
                postal = save(postal);
                physical = save(physical);
            }
            StudentEntity studentEntity = save(student, postal, physical);
            preEnrollmentEntity.setStudent(studentEntity);
            preEnrollmentEntity = preEnrollmentRepository.save(preEnrollmentEntity);

        } else {
            StudentEntity studentEntity = CopyUtils.convert(request, StudentEntity.class);
            preEnrollmentEntity.setStudent(studentEntity);
            preEnrollmentEntity = preEnrollmentRepository.save(preEnrollmentEntity);
        }
        return preEnrollmentEntity != null;

    }

    public boolean updateStudentInfo() {
        return false;
    }

    public boolean updateStudentAddress(AddressType type) {
        return false;
    }


    private StudentEntity save(StudentBean bean, AddressEntity postal, AddressEntity physical) {
        StudentEntity entity = CopyUtils.convert(bean, StudentEntity.class);
        entity.setSisStudentId(bean.getStudentId());
        entity.setPostal(postal);
        entity.setPhysical(physical);
        return studentRepository.save(entity);
    }

    private AddressEntity save(AddressEntity entity) {
        return addressRepository.save(entity);
    }

    private AddressEntity copyAddressFrom(StudentAddress address, AddressType type) {
        AddressEntity entity = new AddressEntity();
        switch (type) {
            case POSTAL:
                entity.setType(AddressType.POSTAL);
                entity.setLine1(address.getPostalAddress_1());
                entity.setLine2(address.getPostalAddress_2());
                entity.setCity(address.getPostalCity());
                entity.setCountry(PR_COUNTRY);
                entity.setZipcode(address.getPostalZipcode());
                break;
            case PHYSICAL:
                entity.setType(AddressType.PHYSICAL);
                entity.setLine1(address.getPhysicalAddress_1());
                entity.setLine2(address.getPhysicalAddress_2());
                entity.setCity(address.getPhysicalCity());
                entity.setCountry(PR_COUNTRY);
                entity.setZipcode(address.getPhysicalZipcode());

                break;
        }
        return entity;
    }
}