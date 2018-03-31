//Responses
const START = {type: "START", nextButton: "Comenzar"};
const QUESTION = {type: "YES_NO", nextButton: "Sí", previousButton: "No"};
const NOT_FOUND_QUESTION = {type: "YES_NO", nextButton: "Buscar Nuevamente", previousButton: "Crear Registro"};
const SEARCH = {type: "SEARCH", nextButton: "Buscar"};
const IN_PROGRESS = {type: "NEXT_PREVIOUS", nextButton: "Continuar", previousButton: "Retroceder"};
const CONTINUE = {type: "START", nextButton: "Continuar"};
const END = {type: "FINALIZE", nextButton: "Someter"};
const FINALIZE_OR_CHANGE = {type: "FINALIZE_OR_CHANGE", nextButton: "Someter", previousButton: "Modificar"};

export let catalog = [
    {type: "USER_PROFILE", footerType: CONTINUE}
    , {type: "USER_ADDITIONAL_INFO", footerType: CONTINUE}
    , {type: "INSTRUCTIONS", footerType: CONTINUE}
    , {
        type: "DE_PROGRAM_QUESTION",
        footerType: QUESTION,
        yes: "DEPR_ENROLLED_QUESTION",
        no: "DEPR_ENROLLED_QUESTION",
        isQuestion: true
    }
    , {
        type: "DEPR_ENROLLED_QUESTION",
        yes: "STUDENT_LOOKUP",
        no: "PERSONAL_INFO",
        footerType: QUESTION,
        isQuestion: true
    }
    , {
        type: "STUDENT_LOOKUP",
        footerType: SEARCH,
        success: "FOUND_INFO",
        failure: "NOT_FOUND_QUESTION",
        waitForResult: true,
        isQuestion: true
    }
    , {
        type: "NOT_FOUND_QUESTION",
        yes: "STUDENT_LOOKUP",
        no: "PERSONAL_INFO",
        footerType: NOT_FOUND_QUESTION,
        isQuestion: true
    }
    , {type: "FOUND_INFO", footerType: CONTINUE}
    , {type: "PERSONAL_INFO", footerType: IN_PROGRESS, editFooterType: CONTINUE}
    , {type: "PERSONAL_ADDITIONAL_INFO", footerType: IN_PROGRESS, editFooterType: CONTINUE}
    , {
        type: "IS_STUDENT_HISPANIC_QUESTION",
        yes: "IS_STUDENT_BORN_PR_QUESTION",
        no: "IS_STUDENT_BORN_PR_QUESTION",
        footerType: QUESTION,
        isQuestion: true
    }
    , {type: "IS_STUDENT_BORN_PR_QUESTION", yes: "ADDRESS", no: "ADDRESS", footerType: QUESTION, isQuestion: true}

    , {
        type: "ADDRESS",
        footerType: IN_PROGRESS
    }
    , {
        type: "NEED_TRANSPORTATION_QUESTION",
        //preEnrollmentFound
        onFound: "PRE_ENROLLMENT_FOUND_SUBMIT",
        //preEnrollmentNotFound
        nextRegularOnNotFoundPreEnrollment: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION",
        nextSpecializedOnNotFoundPreEnrollment: "PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION",
        //occupational
        nextOccupationalWhenEdit: "VOCATIONAL_REVIEW_SUBMIT",
        //technical not used this page
        footerType: QUESTION,
    }, {
        type: "REASON_FOR_NOT_ATTENDING_QUESTION",
        //onPreEnrollmentFound
        nextRegular: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION",
        nextSpecialized: "PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION",
        footerType: CONTINUE,
    }
    , {
        type: "PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION",
        footerType: IN_PROGRESS
    }

    , {type: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION",
        footerType: IN_PROGRESS}
    , {
        type: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SUBMIT",
        footerType: QUESTION,
        yes: "PRE_ENROLLMENT_COMPLETED",
        noRegular: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION",
        noSpecialized: "PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION",
        isSubmit: true

    }
    , {
        type: "PRE_ENROLLMENT_FOUND_SUBMIT",
        footerType: QUESTION,
        yes: "PRE_ENROLLMENT_COMPLETED",
        no: "REASON_FOR_NOT_ATTENDING_QUESTION",
        isQuestion: true
    }

    , {type: "PRE_ENROLLMENT_COMPLETED", footerType: CONTINUE}
    , {type: "PRE_ENROLLMENT_CONFIRMED", footerType: QUESTION, yes: "INSTRUCTIONS", no: "HOME"}


    , {type: "TECHNICAL_SCHOOL_SELECTION", footerType: CONTINUE}
    , {type: "VOCATIONAL_SCHOOL_SELECTION", footerType: CONTINUE}
    , {type: "VOCATIONAL_SCHOOL_INFO", footerType: CONTINUE}
    , {type: "VOCATIONAL_PROGRAMS", footerType: CONTINUE}
    , {
        type: "VOCATIONAL_REVIEW_SUBMIT",
        footerType: QUESTION,
        yes: "PRE_ENROLLMENT_COMPLETED",
        no: "VOCATIONAL_SCHOOL_SELECTION",
        addingSchoolHop: "VOCATIONAL_SCHOOL_SELECTION",
        editSchoolHop: "VOCATIONAL_PROGRAMS",
        isQuestion: true
    }
];
