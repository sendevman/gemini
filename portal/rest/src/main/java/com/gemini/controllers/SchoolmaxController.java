package com.gemini.controllers;

import com.gemini.beans.forms.User;
import com.gemini.beans.forms.VocationalProgramSelection;
import com.gemini.beans.integration.ParentResponse;
import com.gemini.beans.integration.RegionResponse;
import com.gemini.beans.integration.SchoolResponse;
import com.gemini.beans.integration.StudentResponse;
import com.gemini.beans.requests.StudentSearchRequest;
import com.gemini.beans.responses.ResponseBase;
import com.gemini.database.dao.beans.*;
import com.gemini.services.SchoolMaxSearchService;
import com.gemini.services.SchoolmaxService;
import com.gemini.utils.CopyUtils;
import com.gemini.utils.MessageHelper;
import com.gemini.utils.ValidationUtils;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
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
    @Autowired
    private SchoolMaxSearchService smaxSearchService;
    @Autowired
    private MessageHelper messageHelper;

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

    @RequestMapping(value = "/student/search")
    public ResponseEntity<StudentResponse> searchStudent(@Valid @RequestBody StudentSearchRequest searchRequest, BindingResult result, @AuthenticationPrincipal User logged) {
        StudentResponse response = new StudentResponse();
        if(result.hasErrors()){
            response = messageHelper.missingFieldsOnStudentSearch(result);
        }

        if(!(ValidationUtils.valid(searchRequest.getLastSsn()) || ValidationUtils.valid(searchRequest.getStudentNumber())))
            response.addError(messageHelper.processMessage("search.student.missing.required.fields"));

        if (response != null && response.hasError())
            return ResponseEntity.badRequest().body(response);

        Student studentBean = smaxSearchService.retrieveStudentInfo(searchRequest, logged);
        response = CopyUtils.convert(studentBean, StudentResponse.class);
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
            SchoolResponse response = CopyUtils.createSchoolResponse(school);
            schoolReturned.add(response);
        }

        return ResponseEntity.ok(schoolReturned);
    }

    @RequestMapping(value = "/retrieve/vocational/school/{regionId}/grade/level/{gradeLevel}")
    public ResponseEntity<List<SchoolResponse>> getVocationalSchoolByRegionAndGradeLevel(@PathVariable Long regionId, @PathVariable String gradeLevel) {
        List<School> schools = smaxService.findVocationalSchoolsByRegionAndGradeLevel(regionId, gradeLevel);
        List<SchoolResponse> schoolReturned = new ArrayList<>();
        for (School school : schools) {
            SchoolResponse response = CopyUtils.createSchoolResponse(school);
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