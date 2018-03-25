package com.gemini.beans.requests.enrollment;
import com.gemini.beans.forms.VocationalProgramSelection;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/12/18
 * Time: 10:02 PM
 */
public class VocationalPreEnrollmentSubmitRequest extends PreEnrollmentSubmitRequest {
    private Long schoolIdToDelete; //use on ui form
    private List<VocationalProgramSelection> programs;
    private List<VocationalProgramSelection> programsToDelete;

    public Long getSchoolIdToDelete() {
        return schoolIdToDelete;
    }

    public void setSchoolIdToDelete(Long schoolIdToDelete) {
        this.schoolIdToDelete = schoolIdToDelete;
    }

    public List<VocationalProgramSelection> getPrograms() {
        return programs;
    }

    public void setPrograms(List<VocationalProgramSelection> programs) {
        this.programs = programs;
    }

    public List<VocationalProgramSelection> getProgramsToDelete() {
        return programsToDelete;
    }

    public void setProgramsToDelete(List<VocationalProgramSelection> programsToDelete) {
        this.programsToDelete = programsToDelete;
    }
}