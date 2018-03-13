package com.gemini.beans.requests;
import com.gemini.beans.forms.VocationalProgramSelection;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/12/18
 * Time: 10:02 PM
 */
public class VocationalPreEnrollmentSubmitRequest {
    private Long requestId;
    private String nextGradeLevel;
    private List<VocationalProgramSelection> programs;
    private List<VocationalProgramSelection> programsToDelete;

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getNextGradeLevel() {
        return nextGradeLevel;
    }

    public void setNextGradeLevel(String nextGradeLevel) {
        this.nextGradeLevel = nextGradeLevel;
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