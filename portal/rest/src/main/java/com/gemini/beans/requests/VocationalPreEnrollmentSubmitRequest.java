package com.gemini.beans.requests;
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
    private Long schoolId;
    private List<VocationalProgramSelection> programs;

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

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public List<VocationalProgramSelection> getPrograms() {
        return programs;
    }

    public void setPrograms(List<VocationalProgramSelection> programs) {
        this.programs = programs;
    }
}