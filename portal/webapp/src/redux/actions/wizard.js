import * as types from "../types";

//Responses
const START = {type: "START", nextButton: "Comenzar"};
const QUESTION = {type: "YES_NO", nextButton: "Sí", previousButton: "No"};
const NOT_FOUND_QUESTION = {type: "YES_NO", nextButton: "Buscar Nuevamente", previousButton: "Crear Registro"};
const SEARCH = {type: "SEARCH", nextButton: "Buscar"};
const IN_PROGRESS = {type: "NEXT_PREVIOUS", nextButton: "Continuar", previousButton: "Retroceder"};
const CONTINUE = {type: "START", nextButton: "Continuar"};
const END = {type: "FINALIZE", nextButton: "Someter"};
const FINALIZE_OR_CHANGE = {type: "FINALIZE_OR_CHANGE", nextButton: "Someter", previousButton: "Modificar"};

let catalog = [
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
        // //conditioned
        // yes: "PRE_ENROLLMENT_FOUND_SUBMIT",
        // no: "PRE_ENROLLMENT_FOUND_SUBMIT",

        onNotFoundPreEnrollmentWhenSpecialized: "PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION",
        onNotFoundPreEnrollment: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION",
        onFoundPreEnrollment: "PRE_ENROLLMENT_FOUND_SUBMIT",
        reviewHop: "VOCATIONAL_REVIEW_SUBMIT",

        footerType: QUESTION,
    }
    , {
        type: "PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION",
        footerType: IN_PROGRESS
    }

    , {type: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION", footerType: IN_PROGRESS}
    , {
        type: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SUBMIT",
        footerType: QUESTION,
        yes: "PRE_ENROLLMENT_COMPLETED",
        no: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION"
    }
    , {
        type: "PRE_ENROLLMENT_FOUND_SUBMIT",
        footerType: QUESTION,
        yes: "PRE_ENROLLMENT_COMPLETED",
        no: "PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION"
    }

    , {type: "PRE_ENROLLMENT_COMPLETED", footerType: CONTINUE}
    , {type: "PRE_ENROLLMENT_CONFIRMED", footerType: QUESTION, yes: "INSTRUCTIONS", no: "HOME"}


    , {type: "VOCATIONAL_SCHOOL_SELECTION", footerType: CONTINUE}
    , {type: "VOCATIONAL_SCHOOL_INFO", footerType: CONTINUE}
    , {type: "VOCATIONAL_PROGRAMS", footerType: CONTINUE}
    , {
        type: "VOCATIONAL_REVIEW_SUBMIT",
        footerType: QUESTION,
        yes: "PRE_ENROLLMENT_COMPLETED",
        no: "VOCATIONAL_SCHOOL_SELECTION",
        addingSchoolHop: "VOCATIONAL_SCHOOL_SELECTION",
        editSchoolHop: "VOCATIONAL_PROGRAMS"
    }

];

function getIndexFromCatalog(type) {
    for (let idx in catalog) {
        let page = catalog[idx];
        if (page.type === type) {
            return parseInt(idx);
        }
    }
}

function getIndexFromFlow(type) {
    for (let idx in flow) {
        let pageIdx = flow[idx];
        let page = catalog[pageIdx];
        if (page.type === type) {
            return parseInt(idx);
        }
    }
}

function getForm(current) {
    let index = flow[current];
    return catalog[index];
}

function isType(current, type) {
    let index = flow[current];
    return catalog[index].type === type;
}

function exists(type) {
    for (let idx in flow) {
        let pageIdx = flow[idx];
        let page = catalog[pageIdx];
        if (page.type === type)
            return true;
    }
    return false;
}

let flow;
const normalFlow = [
    getIndexFromCatalog("USER_PROFILE"),
    getIndexFromCatalog("USER_ADDITIONAL_INFO"),
    getIndexFromCatalog("INSTRUCTIONS"),
    getIndexFromCatalog("DE_PROGRAM_QUESTION"),
    getIndexFromCatalog("DEPR_ENROLLED_QUESTION"),
    getIndexFromCatalog("STUDENT_LOOKUP"),
    getIndexFromCatalog("NOT_FOUND_QUESTION"),
    getIndexFromCatalog("FOUND_INFO"),
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("PERSONAL_ADDITIONAL_INFO"),
    getIndexFromCatalog("IS_STUDENT_HISPANIC_QUESTION"),
    getIndexFromCatalog("IS_STUDENT_BORN_PR_QUESTION"),

    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("NEED_TRANSPORTATION_QUESTION"),
    getIndexFromCatalog("PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION"),
    getIndexFromCatalog("PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION"),
    getIndexFromCatalog("PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_FOUND_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_COMPLETED"),
    getIndexFromCatalog("PRE_ENROLLMENT_CONFIRMED")];
const parentVocationalFlow = [
    getIndexFromCatalog("USER_PROFILE"),
    getIndexFromCatalog("USER_ADDITIONAL_INFO"),
    getIndexFromCatalog("INSTRUCTIONS"),
    getIndexFromCatalog("DE_PROGRAM_QUESTION"),
    getIndexFromCatalog("DEPR_ENROLLED_QUESTION"),
    getIndexFromCatalog("STUDENT_LOOKUP"),
    getIndexFromCatalog("NOT_FOUND_QUESTION"),
    getIndexFromCatalog("FOUND_INFO"),
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("PERSONAL_ADDITIONAL_INFO"),
    getIndexFromCatalog("IS_STUDENT_HISPANIC_QUESTION"),
    getIndexFromCatalog("IS_STUDENT_BORN_PR_QUESTION"),

    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("NEED_TRANSPORTATION_QUESTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_SELECTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_INFO"),
    getIndexFromCatalog("VOCATIONAL_PROGRAMS"),
    getIndexFromCatalog("VOCATIONAL_REVIEW_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_COMPLETED"),
    getIndexFromCatalog("PRE_ENROLLMENT_CONFIRMED")
];
const editNormalFlow = [
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("PERSONAL_ADDITIONAL_INFO"),
    getIndexFromCatalog("IS_STUDENT_HISPANIC_QUESTION"),
    getIndexFromCatalog("IS_STUDENT_BORN_PR_QUESTION"),
    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("NEED_TRANSPORTATION_QUESTION"),
    getIndexFromCatalog("PRE_ENROLLMENT_SPECIALIZED_ALTERNATE_SCHOOLS_SELECTION"),
    getIndexFromCatalog("PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SELECTION"),
    getIndexFromCatalog("PRE_ENROLLMENT_ALTERNATE_SCHOOLS_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_FOUND_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_COMPLETED"),
    getIndexFromCatalog("PRE_ENROLLMENT_CONFIRMED")
];
const editVocationalFlow = [
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("PERSONAL_ADDITIONAL_INFO"),
    getIndexFromCatalog("IS_STUDENT_HISPANIC_QUESTION"),
    getIndexFromCatalog("IS_STUDENT_BORN_PR_QUESTION"),
    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("NEED_TRANSPORTATION_QUESTION"),

    getIndexFromCatalog("VOCATIONAL_SCHOOL_SELECTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_INFO"),
    getIndexFromCatalog("VOCATIONAL_PROGRAMS"),
    getIndexFromCatalog("VOCATIONAL_REVIEW_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_COMPLETED"),
    getIndexFromCatalog("PRE_ENROLLMENT_CONFIRMED")
];

const studentRequesterVocationalFlow = [
    getIndexFromCatalog("USER_PROFILE"),
    getIndexFromCatalog("USER_ADDITIONAL_INFO"),
    getIndexFromCatalog("INSTRUCTIONS"),
    //verify this
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("PERSONAL_ADDITIONAL_INFO"),
    getIndexFromCatalog("IS_STUDENT_HISPANIC_QUESTION"),
    getIndexFromCatalog("IS_STUDENT_BORN_PR_QUESTION"),
    getIndexFromCatalog("ADDRESS"),

    getIndexFromCatalog("VOCATIONAL_SCHOOL_SELECTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_INFO"),
    getIndexFromCatalog("VOCATIONAL_PROGRAMS"),
    getIndexFromCatalog("VOCATIONAL_REVIEW_SUBMIT"),
    getIndexFromCatalog("PRE_ENROLLMENT_COMPLETED"),
    getIndexFromCatalog("PRE_ENROLLMENT_CONFIRMED")
];

export const load = (requestId) => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_LOAD_START});
    let user = getState().profile.user;
    let profileCompleted = user.profileCompleted;
    let editing = requestId;

    flow = editing
        ? (user.userVocationalStudent ? editVocationalFlow : editNormalFlow)
        : normalFlow;  //always start
    let startPage = profileCompleted ? getIndexFromFlow("INSTRUCTIONS") : 0;
    if (editing) {
        startPage = 0;
        requestId = requestId || user.workingPreEnrollmentId;
    }

    let startForm = getForm(startPage);
    let footerType = editing && startForm.editFooterType
        ? startForm.editFooterType
        : startForm.footerType;
    //check if user has pending pre-enrollment
    dispatch({
        type: types.ON_WIZARD_LOAD_END,
        current: startPage,
        footerType: footerType,
        pageType: startForm.type,
        editing: editing,
        formsToDisplay: flow,
        workingRequestId: requestId
    })
};

function changeForms(dispatch, formToChange) {
    flow = formToChange;
    dispatch({type: types.ON_WIZARD_FORMS_CHANGE, forms: formToChange});
}

function changeToRegularForm(dispatch, preEnrollment, formToChange) {
    preEnrollment.type = types.REGULAR_ENROLLMENT;
    changeForms(dispatch, formToChange)
}

function changeToSpecializedForm(dispatch, preEnrollment, formToChange) {
    preEnrollment.type = types.SPECIALIZED_SCHOOLS_ENROLLMENT;
    changeForms(dispatch, formToChange)
}

function changeToOccupationalForm(dispatch, preEnrollment, formToChange) {
    preEnrollment.type = types.OCCUPATIONAL_ENROLLMENT;
    changeForms(dispatch, formToChange)
}

function changeToTechniqueForm(dispatch, preEnrollment, formToChange) {
    preEnrollment.type = types.TECHNIQUE_ENROLLMENT;
    changeForms(dispatch, formToChange)
}

export const goToAction = (type) => (dispatch) => {
    if (exists(type)) {
        let next = getIndexFromFlow(type);
        let nextForm = getForm(next);
        dispatch({
            type: types.ON_WIZARD_GO_TO,
            current: next,
            footerType: nextForm.footerType,
            pageType: nextForm.type
        });
    }
};

export const onNextAction = (onPress) => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_NEXT_START});
    let wizard = getState().wizard;
    let preEnrollment = getState().preEnrollment;
    let student = getState().studentInfo.student;
    let user = getState().profile.user;

    let current = wizard.current;
    let maxForms = wizard.maxForms;
    let maxCurrent = (maxForms - 1);

    if (isType(current, "PERSONAL_INFO") && preEnrollment.type === types.OCCUPATIONAL_ENROLLMENT) {
        if (wizard.editing && !user.userVocationalStudent) {
            changeToOccupationalForm(dispatch, preEnrollment, editVocationalFlow);
        }
    } else if (isType(current, "INSTRUCTIONS") && !wizard.editing && user.userVocationalStudent) {
        changeToOccupationalForm(dispatch, preEnrollment, studentRequesterVocationalFlow);
    }

    let currentForm = getForm(current);
    let type = currentForm.type;
    let next = current + 1;

    if (student.studentExistsInSIE && isType(current, "PERSONAL_INFO")) {
        next = getIndexFromFlow("ADDRESS");
    }

    if (type.isQuestion || type.lastIndexOf("_SUBMIT") > 0) {
        next = getIndexFromFlow(currentForm.yes);
    } else if (isType(current, "NEED_TRANSPORTATION_QUESTION")
        && (preEnrollment.type === types.REGULAR_ENROLLMENT
            || preEnrollment.type === types.REGULAR_ALTERNATE_SCHOOLS
            || preEnrollment.type === types.SPECIALIZED_SCHOOLS_ENROLLMENT)) {
        let preEnrollmentInfo = preEnrollment.info;
        if (!preEnrollmentInfo.hasPreEnrollment) {
            if (preEnrollment.type === types.SPECIALIZED_SCHOOLS_ENROLLMENT) {
                next = getIndexFromFlow(currentForm.onNotFoundPreEnrollmentWhenSpecialized);
            } else {
                next = getIndexFromFlow(currentForm.onNotFoundPreEnrollment);
                preEnrollment.type = types.REGULAR_ALTERNATE_SCHOOLS;
            }
        } else {
            next = getIndexFromFlow(currentForm.onFoundPreEnrollment);
        }
    } else if (isType(current, "NEED_TRANSPORTATION_QUESTION") && preEnrollment.type === types.OCCUPATIONAL_ENROLLMENT && wizard.editing && currentForm.reviewHop) {
        next = getIndexFromFlow(currentForm.reviewHop);
    } else if (isType(current, "PRE_ENROLLMENT_CONFIRMED")) {
        resetWizard()(dispatch);
    }

    onPress((result) => {
        if (currentForm.waitForResult && result) {

            next = result === types.ON_FOUND_CALLBACK
                ? getIndexFromFlow(currentForm.success)
                : getIndexFromFlow(currentForm.failure);
        }

        if (maxCurrent === current) {
            dispatch({type: types.ON_WIZARD_COMPLETED, startOver: true});
        } else {
            let nextForm = getForm(next);
            dispatch({
                type: types.ON_WIZARD_NEXT_END,
                current: current < maxCurrent ? next : maxCurrent,
                isFinalStep: maxCurrent === current,
                footerType: nextForm.footerType,
                pageType: nextForm.type
            });
        }
    })
};

export const onProgramSelectionAction = (selection) => (dispatch, getState) => {
    // selection can be: TECHNIQUE, OCCUPATIONAL, REGULAR
    dispatch({type: types.ON_WIZARD_PREVIOUS_START});
    let preEnrollment = getState().preEnrollment;
    let wizard = getState().wizard;
    let current = wizard.current;
    let next = current + 1;

    switch (selection) {
        case types.OCCUPATIONAL_ENROLLMENT:
            changeToOccupationalForm(dispatch, preEnrollment, parentVocationalFlow);
            break;
        case types.TECHNIQUE_ENROLLMENT:
            changeToTechniqueForm(dispatch, preEnrollment, parentVocationalFlow);
            break;
        case types.REGULAR_ENROLLMENT:
            changeToRegularForm(dispatch, preEnrollment, normalFlow);
            break;
        case types.SPECIALIZED_SCHOOLS_ENROLLMENT:
            changeToSpecializedForm(dispatch, preEnrollment, normalFlow);
            break;
    }


    let nextForm = getForm(next);
    dispatch({
        type: types.ON_WIZARD_NEXT_END,
        current: next,
        isFinalStep: false,
        footerType: nextForm.footerType,
        pageType: nextForm.type
    });

};

export const onPreviousAction = (onPress) => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_PREVIOUS_START});
    let preEnrollment = getState().preEnrollment;
    let wizard = getState().wizard;
    let flowNavigation = wizard.flowNavigation;
    let current = wizard.current;
    let maxForms = wizard.maxForms;
    let maxCurrent = (maxForms - 1);

    if (isType(current, "DE_PROGRAM_QUESTION")) {
        preEnrollment.type = "REGULAR";
        changeForms(dispatch, normalFlow);
    }

    let currentForm = getForm(current);
    let type = currentForm.type;
    let next;
    if (type.lastIndexOf("_QUESTION") > 0 || type.lastIndexOf("_SUBMIT") > 0) {
        next = getIndexFromFlow(currentForm.no);
    } else {
        next = flowNavigation.length > 0
            ? pop(flowNavigation, 2)
            : current - 1;
    }
    let nextForm = getForm(next);

    onPress((result) => {
        if (maxCurrent === current) {
            dispatch({type: types.ON_WIZARD_COMPLETED, startOver: false});
        } else {
            dispatch({
                type: types.ON_WIZARD_PREVIOUS_END,
                current: next,
                footerType: nextForm.footerType,
                pageType: nextForm.type
            });
        }
    });

};

export const onBackAction = (appBackAction) => (dispatch, getState) => {
    let wizard = getState().wizard;
    let flowNavigation = wizard.flowNavigation;
    if (flowNavigation.length > 1) {
        dispatch({type: types.ON_WIZARD_PREVIOUS_START});
        let next = pop(flowNavigation, 2);
        let nextForm = getForm(next);
        dispatch({
            type: types.ON_WIZARD_PREVIOUS_END,
            current: next,
            footerType: nextForm.footerType,
            pageType: nextForm.type
        });
    } else {
        if (appBackAction)
            appBackAction();
    }


};

export const resetWizard = () => (dispatch) => {
    dispatch({type: types.ON_WIZARD_RESET});
};

function pop(array, n) {
    let val;
    while (n > 0) {
        val = array.pop();
        n--;
    }
    return val;
}
