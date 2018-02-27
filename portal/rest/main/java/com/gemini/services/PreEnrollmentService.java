package com.gemini.services;

import com.gemini.beans.forms.AddressBean;
import com.gemini.beans.forms.PreEnrollmentAddressBean;
import com.gemini.beans.forms.PreEnrollmentBean;
import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.requests.PreEnrollmentSubmitRequest;
import com.gemini.beans.types.AddressType;
import com.gemini.beans.types.EntryType;
import com.gemini.beans.types.Gender;
import com.gemini.beans.types.RequestStatus;
import com.gemini.database.dao.beans.*;
import com.gemini.database.jpa.entities.AddressEntity;
import com.gemini.database.jpa.entities.PreEnrollmentRequestEntity;
import com.gemini.database.jpa.entities.StudentEntity;
import com.gemini.database.jpa.respository.AddressRepository;
import com.gemini.database.jpa.respository.PreEnrollmentRepository;
import com.gemini.database.jpa.respository.StudentRepository;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.Utils;
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

    public static final Long PRE_ENROLLMENT_SCHOOL_YEAR = 2019L;
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
        PreEnrollmentAddressBean addressBean = new PreEnrollmentAddressBean(requestId);
        if (entity != null && entity.getStudent() != null) {
            addressBean.setPhysical(CopyUtils.convert(entity.getStudent().getPhysical(), AddressBean.class));
            addressBean.setPostal(CopyUtils.convert(entity.getStudent().getPostal(), AddressBean.class));
        }
        return addressBean;
    }

    public boolean exists(PreEnrollmentInitialRequest request) {
        boolean exists = false;
        if (ValidationUtils.valid(request.getRequestId())) {
            exists = preEnrollmentRepository.exists(request.getRequestId());
        }
        if (!exists && ValidationUtils.valid(request.getStudentNumber())) {
            exists = preEnrollmentRepository.existsByStudentId(request.getStudentNumber());
        }
        return exists;
    }

    public PreEnrollmentBean createPreEnrollment(PreEnrollmentInitialRequest request) {
        PreEnrollmentBean preEnrollmentBean = null;
        PreEnrollmentRequestEntity entity = new PreEnrollmentRequestEntity();
        entity.setSchoolYear(PRE_ENROLLMENT_SCHOOL_YEAR);
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
                    entity.setPreviousEnrollmentId(enrollmentInfo.getEnrollmentId());
                    entity.setPreviousEnrollmentYear(enrollmentInfo.getSchoolYear());
                    entity.setPreviousGradeLevel(enrollmentInfo.getGradeLevel());
                    preEnrollmentBean = CopyUtils.convert(entity, PreEnrollmentBean.class);
                    School school = setNextEnrollmentSchoolInfo(enrollmentInfo.getSchoolId(), preEnrollmentBean, enrollmentInfo.getGradeLevel(), enrollmentInfo.getSchoolYear());
                    preEnrollmentBean.setHasPreviousEnrollment(school != null);
                }
                AddressEntity postal = copyAddressFrom(address, AddressType.POSTAL);
                AddressEntity physical = copyAddressFrom(address, AddressType.PHYSICAL);
                postal = save(postal);
                physical = save(physical);

                StudentEntity studentEntity = save(student, postal, physical);
                entity.setStudent(studentEntity);
                entity = preEnrollmentRepository.save(entity);
            }

        } else {
            AddressEntity postal = copyAddressFrom(null, AddressType.POSTAL);
            AddressEntity physical = copyAddressFrom(null, AddressType.PHYSICAL);
            StudentEntity studentEntity = CopyUtils.convert(request, StudentEntity.class);
            //saving addresses
            postal = save(postal);
            physical = save(physical);
            studentEntity.setPhysical(physical);
            studentEntity.setPostal(postal);
            studentEntity.setEntryType(EntryType.NEW_ENTRY);
            studentEntity.setLastName(Utils.toLastName(request.getFatherLastName(), request.getMotherLastName()));
            //saving student
            studentEntity = save(studentEntity);
            entity.setStudent(studentEntity);
            entity = preEnrollmentRepository.save(entity);
            preEnrollmentBean = CopyUtils.convert(entity, PreEnrollmentBean.class);
        }

        if (preEnrollmentBean != null && entity != null)
            preEnrollmentBean.setId(entity.getId());
        return preEnrollmentBean;

    }

    public boolean submitPreEnrollment(PreEnrollmentSubmitRequest request) {
        PreEnrollmentRequestEntity requestEntity = preEnrollmentRepository.findOne(request.getRequestId());
        School school = smaxService.findSchoolById(request.getSchoolId());
        requestEntity.setGradeLevel(request.getNextGradeLevel());
        requestEntity.setExtSchoolNumber(school.getExtSchoolNumber());
        requestEntity.setSchoolId(school.getSchoolId());
        requestEntity.setRegionId(school.getRegionId());
        requestEntity.setDistrictId(school.getDistrictId());
        requestEntity.setMunicipalityCode(school.getCityCd());
        requestEntity.setRequestStatus(RequestStatus.PENDING_TO_REVIEW);
        requestEntity = preEnrollmentRepository.save(requestEntity);
        return requestEntity != null;
    }

    public boolean updatePreEnrollment(PreEnrollmentInitialRequest request) {
        boolean updated = true;
        PreEnrollmentRequestEntity requestEntity = preEnrollmentRepository.findOne(request.getRequestId());
        StudentEntity entity = studentRepository.findOne(requestEntity.getStudent().getId());
        //todo: check if personal data will be able to modified on found students
        if (EntryType.NEW_ENTRY.equals(entity.getEntryType())) {
            entity.setFirstName(request.getFirstName());
            entity.setMiddleName(request.getMiddleName());
            entity.setLastName(Utils.toLastName(request.getFatherLastName(), request.getMotherLastName()));
            entity.setDateOfBirth(request.getDateOfBirth());
            entity.setGender(request.getGender());
            entity = studentRepository.save(entity);
            updated = entity != null;
        }

        return updated;
    }

    public boolean updateStudentAddress(AddressBean address) {
        AddressEntity entity = CopyUtils.convert(address, AddressEntity.class);
        entity = save(entity);
        return entity != null;
    }

    private StudentEntity save(Student bean, AddressEntity postal, AddressEntity physical) {
        StudentEntity entity = CopyUtils.convert(bean, StudentEntity.class);
        entity.setGender(Gender.valueOf(bean.getGender()));
        entity.setSisStudentId(bean.getStudentId());
        entity.setPostal(postal);
        entity.setPhysical(physical);
        return studentRepository.save(entity);
    }

    private AddressEntity save(AddressEntity entity) {
        return addressRepository.save(entity);
    }

    private StudentEntity save(StudentEntity entity) {
        return studentRepository.save(entity);
    }

    private AddressEntity copyAddressFrom(StudentAddress address, AddressType type) {
        AddressEntity entity = new AddressEntity();
        entity.setType(type);
        if (address == null)
            return entity;
        switch (type) {
            case POSTAL:
                entity.setLine1(address.getPostalAddress_1());
                entity.setLine2(address.getPostalAddress_2());
                entity.setCity(address.getPostalCity());
                entity.setCountry(PR_COUNTRY);
                entity.setZipcode(address.getPostalZipcode());
                break;
            case PHYSICAL:
                entity.setLine1(address.getPhysicalAddress_1());
                entity.setLine2(address.getPhysicalAddress_2());
                entity.setCity(address.getPhysicalCity());
                entity.setCountry(PR_COUNTRY);
                entity.setZipcode(address.getPhysicalZipcode());

                break;
        }
        return entity;
    }

    private School setNextEnrollmentSchoolInfo(Long schoolId, PreEnrollmentBean enrollmentBean, String previousGradeLevel, Long previousSchoolYear) {
//        if (!(previousSchoolYear == (PRE_ENROLLMENT_SCHOOL_YEAR - 1)) {
//            return null;
//        }
        School school = smaxService.findSchoolById(schoolId);
        //validating if the schoolYear enrolled is the current school year
        if (school != null) {
            SchoolGradeLevel gradeLevelInfo = smaxService.findSchoolLevel(previousSchoolYear, schoolId, previousGradeLevel);
            enrollmentBean.setPreviousSchoolId(schoolId);
            enrollmentBean.setPreviousSchoolName(school.getSchoolName());
            if (gradeLevelInfo != null) {
                GradeLevel gradeLevel = smaxService.getGradeLevelByCode(gradeLevelInfo.getNextYearGrade());
                enrollmentBean.setNextGradeLevel(gradeLevel.getName());
                enrollmentBean.setNextGradeLevelDescription(gradeLevel.getDescription());
            }
        }
        return school;
    }

}