package com.gemini.controllers;

import com.gemini.beans.integration.ParentResponse;
import com.gemini.beans.integration.RegionResponse;
import com.gemini.beans.integration.SchoolResponse;
import com.gemini.beans.integration.StudentResponse;
import com.gemini.beans.forms.VocationalProgramSelection;
import com.gemini.database.dao.beans.*;
import com.gemini.services.SchoolmaxService;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.ValidationUtils;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 12:22 AM
 */
@RestController
@RequestMapping("/smax/interface")
public class SchoolmaxController {

    @Autowired
    private SchoolmaxService smaxService;

    @RequestMapping(value = "/search/parent/lastssn/{lastSSN}/dob/{dob}/lastname/{lastname}")
    public ResponseEntity<ParentResponse> searchParent(@PathVariable(value = "lastSSN") String lastSSN,
                                                       @PathVariable(value = "dob") @DateTimeFormat(pattern = "yyyyMMdd") String dob,
                                                       @PathVariable(value = "lastname") String lastname) {
        Date dateOfBirth = ValidationUtils.validDate(dob);
        if (!(StringUtils.hasLength(lastname)
                && StringUtils.hasLength(lastSSN) && lastSSN.matches("[0-9]{4}")
                && dateOfBirth != null))
            return ResponseEntity.badRequest().body(null);


        Parent parentBean = smaxService.retrieveHouseHeadInfo(lastSSN, dateOfBirth, lastname);
        return ResponseEntity.ok().body(CopyUtils.convert(parentBean, ParentResponse.class));
    }

    @RequestMapping(value = "/search/student/lastssn/{lastSSN}/student/number/{studentNumber}/dob/{dob}")
    public ResponseEntity<StudentResponse> searchStudent(@PathVariable(value = "lastSSN") String lastSSN,
                                                         @PathVariable(value = "studentNumber") Long studentNumber,
                                                         @PathVariable(value = "dob") @DateTimeFormat(pattern = "yyyyMMdd") String dob) {
        Date dateOfBirth = ValidationUtils.validDate(dob);
        if (!(dateOfBirth != null
                && StringUtils.hasLength(lastSSN) && lastSSN.matches("[0-9]{4}")
                && studentNumber != null && studentNumber > 0L))
            return ResponseEntity.badRequest().body(null);

        Student studentBean = null;//smaxService.retrieveStudentInfo(lastSSN, studentNumber, dateOfBirth);
        StudentResponse response = CopyUtils.convert(studentBean, StudentResponse.class);
        response.setFound(studentBean != null);
        if (studentBean != null)
            response.setStudentNumber(studentBean.getExtStudentNumber());
        return ResponseEntity.ok().body(response);

    }

    @RequestMapping(value = "/retrieve/regions")
    public ResponseEntity<List<RegionResponse>> getAllRegions() {
        List<Region> regions = smaxService.getAllRegions();
        return ResponseEntity.ok(CopyUtils.convert(regions, RegionResponse.class));
    }


    @RequestMapping(value = "/retrieve/vocational/regions")
    public ResponseEntity<List<RegionResponse>> getVocationalRegions() {
        List<Region> regions = smaxService.getAllRegions();
        return ResponseEntity.ok(CopyUtils.convert(regions, RegionResponse.class));
    }

    @RequestMapping(value = "/retrieve/grade/levels")
    public ResponseEntity<List<GradeLevel>> getGradeLevels() {
        List<GradeLevel> levels = smaxService.getAllGradeLevels();
        return ResponseEntity.ok(levels);
    }

    @RequestMapping(value = "/retrieve/school/{regionId}/grade/level/{gradeLevel}")
    public ResponseEntity<List<SchoolResponse>> getSchoolByRegionAndGradeLevel(@PathVariable Long regionId, @PathVariable String gradeLevel) {
        List<School> schools = smaxService.findSchoolByRegionAndGradeLevel(regionId, gradeLevel);
        List<SchoolResponse> schoolReturned = new ArrayList<>();
        for (School school : schools) {
            SchoolResponse response = CopyUtils.convert(school, SchoolResponse.class);
            response.setAddress(CopyUtils.createAddressBean(school));
            schoolReturned.add(response);
        }

        return ResponseEntity.ok(schoolReturned);
    }

    @RequestMapping(value = "/retrieve/vocational/school/{regionId}/grade/level/{gradeLevel}")
    public ResponseEntity<List<SchoolResponse>> getVocationalSchoolByRegionAndGradeLevel(@PathVariable Long regionId, @PathVariable String gradeLevel) {
        List<School> schools = smaxService.findVocationalSchoolsByRegionAndGradeLevel(regionId, gradeLevel);
        List<SchoolResponse> schoolReturned = new ArrayList<>();
        for (School school : schools) {
            SchoolResponse response = CopyUtils.convert(school, SchoolResponse.class);
            response.setAddress(CopyUtils.createAddressBean(school));
            schoolReturned.add(response);
        }

        return ResponseEntity.ok(schoolReturned);
    }

    @RequestMapping(value = "/retrieve/vocational/programs/school/{schoolId}")
    public ResponseEntity<List<VocationalProgramSelection>> getVocationalSchoolByRegionAndGradeLevel(@PathVariable Long schoolId) {
        List<VocationalProgram> programs = smaxService.getVocationalPrograms(schoolId);
        Function<VocationalProgram, VocationalProgramSelection> toSelection = new Function<VocationalProgram, VocationalProgramSelection>() {
            @Override
            public VocationalProgramSelection apply(VocationalProgram program) {
                VocationalProgramSelection selection = new VocationalProgramSelection();
                selection.setProgramCode(program.getCode());
                selection.setProgramDescription(program.getDescription());
                return selection;
            }
        };

        return ResponseEntity.ok(Lists.transform(programs, toSelection));
    }


}