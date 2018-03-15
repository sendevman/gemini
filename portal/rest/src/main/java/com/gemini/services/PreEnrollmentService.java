package com.gemini.services;

import com.gemini.beans.forms.*;
import com.gemini.beans.requests.PreEnrollmentInitialRequest;
import com.gemini.beans.requests.PreEnrollmentSubmitRequest;
import com.gemini.beans.requests.VocationalPreEnrollmentSubmitRequest;
import com.gemini.beans.types.AddressType;
import com.gemini.beans.types.EntryType;
import com.gemini.beans.types.RequestStatus;
import com.gemini.database.dao.beans.*;
import com.gemini.database.jpa.entities.*;
import com.gemini.database.jpa.respository.AddressRepository;
import com.gemini.database.jpa.respository.PreEnrollmentRepository;
import com.gemini.database.jpa.respository.StudentRepository;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.Utils;
import com.gemini.utils.ValidationUtils;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.collect.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @Autowired
    private CommonService commonService;

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

    public boolean exists(PreEnrollmentInitialRequest request, User loggedUser) {
        boolean exists = false;
        if (ValidationUtils.valid(request.getRequestId())) {
            exists = preEnrollmentRepository.exists(request.getRequestId());
        }
        if (!exists && ValidationUtils.valid(request.getStudentNumber())) {
            exists = preEnrollmentRepository.existsByStudentNumber(request.getStudentNumber());
        }
        return exists;
    }

    public PreEnrollmentBean createPreEnrollment(PreEnrollmentInitialRequest request, User loggedUser) {
        PreEnrollmentBean preEnrollmentBean = null;
        PreEnrollmentRequestEntity entity = new PreEnrollmentRequestEntity();
        Long studentNumber = request.getStudentNumber();
        UserEntity parent = CopyUtils.convert(loggedUser, UserEntity.class);

        entity.setType(request.getType());
        entity.setUser(parent);
        entity.setSchoolYear(commonService.getPreEnrollmentYear());
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
            studentEntity.setEntryType(EntryType.NEW);
            studentEntity.setLastName(Utils.toLastName(request.getFatherLastName(), request.getMotherLastName()));
            //saving student
            studentEntity = save(studentEntity);
            entity.setStudent(studentEntity);
            entity = preEnrollmentRepository.save(entity);
            preEnrollmentBean = CopyUtils.convert(entity, PreEnrollmentBean.class);
        }

        if (preEnrollmentBean != null && entity != null) {
            preEnrollmentBean.setId(entity.getId());
            preEnrollmentBean.setStudent(getPreEnrollmentStudentInfoBean(entity));
        }
        return preEnrollmentBean;

    }

    public boolean submitPreEnrollment(PreEnrollmentSubmitRequest request) {
        PreEnrollmentRequestEntity requestEntity = preEnrollmentRepository.findOne(request.getRequestId());
        setSchoolInfo(requestEntity, request.getSchoolId(), request.getNextGradeLevel());
        requestEntity.setRequestStatus(RequestStatus.PENDING_TO_REVIEW);
        requestEntity.setSubmitDate(commonService.getCurrentDate());
        requestEntity = preEnrollmentRepository.save(requestEntity);
        return requestEntity != null;
    }

    public boolean vocationalPreEnrollmentSubmit(VocationalPreEnrollmentSubmitRequest request) {
        return vocationalPreEnrollmentSave(request, true);
    }

    public boolean partialVocationalPreEnrollmentSave(VocationalPreEnrollmentSubmitRequest request) {
        return vocationalPreEnrollmentSave(request, false);
    }

    public PreEnrollmentBean updatePreEnrollment(PreEnrollmentInitialRequest request) {
        PreEnrollmentBean response = null;
        PreEnrollmentRequestEntity requestEntity;
        if (request.getRequestId() != null && request.getRequestId() > 0L)
            requestEntity = preEnrollmentRepository.findOne(request.getRequestId());
        else
            requestEntity = preEnrollmentRepository.findByStudentNumber(request.getStudentNumber());
        StudentEntity studentEntity = studentRepository.findOne(requestEntity.getStudent().getId());
        //todo: check if personal data will be able to modified on found students
        if (EntryType.NEW.equals(studentEntity.getEntryType())) {
            studentEntity.setFirstName(request.getFirstName());
            studentEntity.setMiddleName(request.getMiddleName());
            studentEntity.setLastName(Utils.toLastName(request.getFatherLastName(), request.getMotherLastName()));
            studentEntity.setDateOfBirth(request.getDateOfBirth());
            studentEntity.setGender(request.getGender());
            studentEntity = studentRepository.save(studentEntity);
        }
        if (requestEntity != null) {
            response = CopyUtils.convert(requestEntity, PreEnrollmentBean.class);
            School school = setNextEnrollmentSchoolInfo(requestEntity.getSchoolId(), response, requestEntity.getPreviousGradeLevel(), requestEntity.getPreviousEnrollmentYear());
            response.setHasPreviousEnrollment(school != null);
            response.setStudent(getPreEnrollmentStudentInfoBean(requestEntity));
        }

        return requestEntity != null && response != null ? response : null;
    }

    public boolean updateStudentAddress(AddressBean address) {
        AddressEntity entity = CopyUtils.convert(address, AddressEntity.class);
        entity = save(entity);
        return entity != null;
    }

    public List<PreEnrollmentBean> findPreEnrollmentByUser(User loggedUser) {
        List<PreEnrollmentRequestEntity> entities = preEnrollmentRepository.findByUserIdOrderBySubmitDateDesc(loggedUser.getId());
        if (entities != null) {
            List<PreEnrollmentBean> list = new ArrayList<>();
            for (PreEnrollmentRequestEntity entity : entities) {
                list.add(getPreEnrollmentBean(entity));
            }
            return list;
        }
        return null;
    }

    public PreEnrollmentBean findById(Long id) {
        PreEnrollmentRequestEntity entity = preEnrollmentRepository.findOne(id);
        if (entity != null) {
            return getPreEnrollmentBean(entity);
        }

        return null;
    }

    public PreEnrollmentStudentInfoBean findPreEnrollmentById(Long id) {
        PreEnrollmentRequestEntity entity = preEnrollmentRepository.findByIdAndRequestStatusIs(id, RequestStatus.ACTIVE);
        if (entity == null)
            return null;
        return getPreEnrollmentStudentInfoBean(entity);
    }

    public VocationalPreEnrollmentBean findVocationalPreEnrollmentById(Long id) {
        PreEnrollmentRequestEntity entity = preEnrollmentRepository.findByIdAndRequestStatusIs(id, RequestStatus.ACTIVE);
        if (entity == null)
            return null;
        PreEnrollmentBean preEnrollment = getPreEnrollmentBean(entity);
        VocationalPreEnrollmentBean vocationalPreEnrollment = CopyUtils.convert(preEnrollment, VocationalPreEnrollmentBean.class);
        Function<PreEnrollmentVocationalSchoolEntity, Long> toSchoolId = new Function<PreEnrollmentVocationalSchoolEntity, Long>() {
            @Override
            public Long apply(PreEnrollmentVocationalSchoolEntity schoolEntity) {
                return schoolEntity.getSchoolId();
            }
        };

        final Function<PreEnrollmentVocationalSchoolEntity, VocationalProgramSelection> toProgramSelection = new Function<PreEnrollmentVocationalSchoolEntity, VocationalProgramSelection>() {
            @Override
            public VocationalProgramSelection apply(PreEnrollmentVocationalSchoolEntity schoolEntity) {
                VocationalProgramSelection selection = new VocationalProgramSelection();
                selection.setSchoolId(schoolEntity.getSchoolId());
                selection.setProgramCode(schoolEntity.getProgramCode());
                selection.setProgramDescription(schoolEntity.getProgramDescription());
                return selection;
            }
        };
        final Multimap<Long, PreEnrollmentVocationalSchoolEntity> schoolProgramMap = Multimaps.index(entity.getVocationalSchools(), toSchoolId);
        Function<Long, VocationalSchoolEnrollment> toVocationalProgram = new Function<Long, VocationalSchoolEnrollment>() {
            @Override
            public VocationalSchoolEnrollment apply(Long schoolId) {
                VocationalSchoolEnrollment enrollment = new VocationalSchoolEnrollment();
                School school = getSchool(schoolId);
                enrollment.setSchoolId(schoolId);
                enrollment.setSchoolName(school.getSchoolName());
                enrollment.setSchoolAddress(CopyUtils.createAddressBean(school));
                List<VocationalProgramSelection> programs = Lists.transform(Lists.newArrayList(schoolProgramMap.get(schoolId)), toProgramSelection);
                enrollment.setPrograms(programs);
                return enrollment;
            }
        };

        List<Long> schoolIds = Lists.newArrayList(schoolProgramMap.keySet());
        vocationalPreEnrollment.setEnrollments(Lists.transform(schoolIds, toVocationalProgram));
        return vocationalPreEnrollment;

    }

    //    Private Methods
    private PreEnrollmentStudentInfoBean getPreEnrollmentStudentInfoBean(PreEnrollmentRequestEntity entity) {
        StudentEntity studentEntity = entity.getStudent();
        PreEnrollmentStudentInfoBean studentInfo = CopyUtils.convert(studentEntity, PreEnrollmentStudentInfoBean.class);
        Utils.copyLastNames(studentEntity, studentInfo);
        studentInfo.setStudentNumber(studentEntity.getExtStudentNumber());
        //todo: fran change this!!!
        studentInfo.setType(entity.getType());
        return studentInfo;
    }

    private PreEnrollmentBean getPreEnrollmentBean(PreEnrollmentRequestEntity entity) {
        PreEnrollmentBean enrollmentBean = CopyUtils.convert(entity, PreEnrollmentBean.class);
        enrollmentBean.setStudent(getPreEnrollmentStudentInfoBean(entity));
        setGradeLevelInfo(entity.getGradeLevel(), enrollmentBean);
        return enrollmentBean;
    }

    private StudentEntity save(Student bean, AddressEntity postal, AddressEntity physical) {
        StudentEntity entity = CopyUtils.convert(bean, StudentEntity.class);
        entity.setGender(bean.getGender());
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
        if (school != null && ValidationUtils.valid(previousSchoolYear, previousGradeLevel)) {
            SchoolGradeLevel gradeLevelInfo = smaxService.findSchoolLevel(previousSchoolYear, schoolId, previousGradeLevel);
            enrollmentBean.setSchoolId(schoolId);
            enrollmentBean.setSchoolName(school.getSchoolName());
            enrollmentBean.setSchoolAddress(CopyUtils.createAddressBean(school));
            if (gradeLevelInfo != null) {
                GradeLevel gradeLevel = smaxService.getGradeLevelByCode(gradeLevelInfo.getNextYearGrade());
                enrollmentBean.setNextGradeLevel(gradeLevel.getName());
                enrollmentBean.setNextGradeLevelDescription(gradeLevel.getDisplayName());
            }
        }
        return school;
    }

    private School getSchool(Long schoolId) {
        return smaxService.findSchoolById(schoolId);
    }

    private void setSchoolInfo(PreEnrollmentRequestEntity requestEntity, Long schoolId, String nextGradeLevel) {
        School school = smaxService.findSchoolById(schoolId);
        if (nextGradeLevel != null)
            requestEntity.setGradeLevel(nextGradeLevel);
        requestEntity.setExtSchoolNumber(school.getExtSchoolNumber());
        requestEntity.setSchoolId(school.getSchoolId());
        requestEntity.setRegionId(school.getRegionId());
        requestEntity.setDistrictId(school.getDistrictId());
        requestEntity.setMunicipalityCode(school.getCityCd());
    }

    private void setGradeLevelInfo(String nextLevel, PreEnrollmentBean enrollmentBean) {
        if (StringUtils.hasText(nextLevel)) {
            GradeLevel gradeLevel = smaxService.getGradeLevelByCode(nextLevel);
            if (gradeLevel != null) {
                enrollmentBean.setNextGradeLevel(gradeLevel.getName());
                enrollmentBean.setNextGradeLevelDescription(gradeLevel.getDisplayName());
            }
        }
    }

    private boolean vocationalPreEnrollmentSave(final VocationalPreEnrollmentSubmitRequest request, boolean submitted) {
        final PreEnrollmentRequestEntity requestEntity = preEnrollmentRepository.findOne(request.getRequestId());

        final List<PreEnrollmentVocationalSchoolEntity> vocationalSchoolsDB = requestEntity.getVocationalSchools();
        List<VocationalProgramSelection> selectionsInDBList = CopyUtils.convert(vocationalSchoolsDB, VocationalProgramSelection.class);
        Set<VocationalProgramSelection> selectionsInDB = new HashSet<>(selectionsInDBList);

        if (ValidationUtils.valid(request.getSchoolIdToDelete())) {
            List<VocationalProgramSelection> schoolIdProgramsToDelete = FluentIterable
                    .from(vocationalSchoolsDB)
                    .filter(new Predicate<PreEnrollmentVocationalSchoolEntity>() {
                        @Override
                        public boolean apply(PreEnrollmentVocationalSchoolEntity vocSchoolEntity) {
                            return vocSchoolEntity.getSchoolId().equals(request.getSchoolIdToDelete());
                        }
                    })
                    .transform(new Function<PreEnrollmentVocationalSchoolEntity, VocationalProgramSelection>() {
                        @Override
                        public VocationalProgramSelection apply(PreEnrollmentVocationalSchoolEntity vocSchoolEntity) {
                            return CopyUtils.convert(vocSchoolEntity, VocationalProgramSelection.class);
                        }
                    }).toList();
            request.setProgramsToDelete(schoolIdProgramsToDelete);
        }


        Set<VocationalProgramSelection> selectionsToSave = Sets.newHashSet();
        boolean deleting = request.getProgramsToDelete() != null && !request.getProgramsToDelete().isEmpty();
        boolean adding = request.getPrograms() != null && !request.getPrograms().isEmpty();
        //deleting
        if (deleting) {
            selectionsToSave = Sets.difference(selectionsInDB, Sets.newHashSet(request.getProgramsToDelete()));
            selectionsInDB = selectionsToSave;
        }
        //adding
        if (adding)
            selectionsToSave = Sets.union(selectionsInDB, new HashSet<>(request.getPrograms()));

        if (!(adding || deleting)) {
            selectionsToSave = selectionsInDB;
        }

        List<VocationalProgramSelection> list = Lists.newArrayList(selectionsToSave);

        Function<VocationalProgramSelection, PreEnrollmentVocationalSchoolEntity> toPreEnrollmentVocSchool = new Function<VocationalProgramSelection, PreEnrollmentVocationalSchoolEntity>() {
            public PreEnrollmentVocationalSchoolEntity apply(VocationalProgramSelection program) {
                PreEnrollmentVocationalSchoolEntity vocationalSchool = CopyUtils.convert(program, PreEnrollmentVocationalSchoolEntity.class);
                School school = smaxService.findSchoolById(program.getSchoolId());
                vocationalSchool.setSchoolId(school.getSchoolId());
                vocationalSchool.setRegionId(school.getRegionId());
                vocationalSchool.setDistrictId(school.getDistrictId());
                vocationalSchool.setMunicipalityCode(school.getCityCd());
                vocationalSchool.setPreEnrollment(requestEntity);
                return vocationalSchool;
            }
        };

        if (request.getNextGradeLevel() != null)
            requestEntity.setGradeLevel(request.getNextGradeLevel());

        if (submitted) {
            if (list.size() == 1) {
                Long schoolId = list.get(0).getSchoolId();
                setSchoolInfo(requestEntity, schoolId, request.getNextGradeLevel());
            }
            requestEntity.setRequestStatus(RequestStatus.PENDING_TO_REVIEW);
            requestEntity.setSubmitDate(commonService.getCurrentDate());
        } else {
            requestEntity.getVocationalSchools().clear();
            requestEntity.getVocationalSchools().addAll(Lists.transform(list, toPreEnrollmentVocSchool));
        }

        return preEnrollmentRepository.save(requestEntity) != null;

    }


}