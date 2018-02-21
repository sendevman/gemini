package com.gemini.services;

import com.gemini.beans.forms.AddressBean;
import com.gemini.beans.forms.PreEnrollmentAddressBean;
import com.gemini.beans.forms.PreEnrollmentBean;
import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.types.AddressType;
import com.gemini.database.dao.beans.EnrollmentInfo;
import com.gemini.database.dao.beans.Student;
import com.gemini.database.dao.beans.StudentAddress;
import com.gemini.database.jpa.entities.AddressEntity;
import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import com.gemini.database.jpa.entities.StudentEntity;
import com.gemini.database.jpa.respository.AddressRepository;
import com.gemini.database.jpa.respository.PreEnrollmentRepository;
import com.gemini.database.jpa.respository.StudentRepository;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public boolean validAddressForRequestId(Long id, AddressBean physical, AddressBean postal) {
        boolean valid = false;
        PreEnrollmentRequestEntity entity = preEnrollmentRepository.findOne(id);
        if (entity != null && entity.getStudent() != null) {
            AddressEntity physicalEntity = entity.getStudent().getPhysical();
            AddressEntity postalEntity = entity.getStudent().getPostal();
            if (ValidationUtils.valid(physical.getId(), physicalEntity.getId())) {
                valid = physical.getId().equals(physicalEntity.getId());
            }

            if (ValidationUtils.valid(postal.getId(), postalEntity.getId())) {
                valid &= postal.getId().equals(postalEntity.getId());
            }

        }
        return valid;
    }

    public PreEnrollmentAddressBean getAddress(Long requestId) {
        PreEnrollmentRequestEntity entity = preEnrollmentRepository.findOne(requestId);
        PreEnrollmentAddressBean addressBean = new PreEnrollmentAddressBean();
        if (entity != null && entity.getStudent() != null) {
            addressBean.setPhysical(CopyUtils.convert(entity.getStudent().getPhysical(), AddressBean.class));
            addressBean.setPostal(CopyUtils.convert(entity.getStudent().getPostal(), AddressBean.class));
        }
        return addressBean;
    }

    public PreEnrollmentBean createPreEnrollment(PreEnrollmentInitialRequest request) {
        PreEnrollmentBean preEnrollmentBean = null;
        PreEnrollmentRequestEntity preEnrollmentEntity = new PreEnrollmentRequestEntity();
        preEnrollmentEntity.setSchoolYear(2019L);
        Long studentNumber = request.getStudentNumber();
        Student student = null;
        StudentAddress address = null;
        if (studentNumber != null && studentNumber > 0L) {
            student = smaxService.retrieveStudentInfo(studentNumber);
            if (student != null) {
                preEnrollmentBean = new PreEnrollmentBean();
                address = smaxService.retrieveStudentAddress(studentNumber);
                //let's find the most recent enrollment from SIS
                EnrollmentInfo enrollmentInfo = smaxService.retrieveMostRecentEnrollment(student.getStudentId());
                if (enrollmentInfo != null) {
                    preEnrollmentEntity.setPreviousEnrollmentId(enrollmentInfo.getEnrollmentId());
                    preEnrollmentEntity.setPreviousEnrollmentYear(enrollmentInfo.getSchoolYear());
                    preEnrollmentEntity.setPreviousGradeLevel(enrollmentInfo.getGradeLevel());
                    preEnrollmentBean = CopyUtils.convert(preEnrollmentEntity, PreEnrollmentBean.class);
//                    preEnrollmentBean.setPreviousSchoolId();
//                    preEnrollmentBean.setPreviousSchoolName();
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
            }

        } else {
            StudentEntity studentEntity = CopyUtils.convert(request, StudentEntity.class);
            preEnrollmentEntity.setStudent(studentEntity);
            preEnrollmentEntity = preEnrollmentRepository.save(preEnrollmentEntity);
            preEnrollmentBean = CopyUtils.convert(preEnrollmentEntity, PreEnrollmentBean.class);
        }
        return preEnrollmentBean;

    }

    public boolean updateStudentInfo() {
        return false;
    }

    public boolean updateStudentAddress(AddressBean address) {
        AddressEntity entity = CopyUtils.convert(address, AddressEntity.class);
        entity = save(entity);
        return entity != null;
    }

    private StudentEntity save(Student bean, AddressEntity postal, AddressEntity physical) {
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