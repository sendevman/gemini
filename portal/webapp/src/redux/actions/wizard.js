import * as types from "../types";

const START = {type: "START", nextButton: "Comenzar"};
const QUESTION = {type: "YES_NO", nextButton: "Si", previousButton: "No"};
const IN_PROGRESS = {type: "NEXT_PREVIOUS", nextButton: "Proximo", previousButton: "Retroceder"};
const CONTINUE = {type: "START", nextButton: "Continuar"};
const END = {type: "FINALIZE", nextButton: "Someter"};

let catalog = [
    {type: "USER_PROFILE", footerType: CONTINUE}
    , {type: "INSTRUCTIONS", footerType: CONTINUE}
    , {type: "IS_VOCATIONAL_STUDENT_QUESTION", footerType: QUESTION, yes: "STUDENT_LOOKUP", no: "STUDENT_LOOKUP"}
    , {type: "DEPR_ENROLLED_QUESTION", yes: "STUDENT_LOOKUP", no: "PERSONAL_INFO", footerType: QUESTION}
    , {
        type: "STUDENT_LOOKUP",
        footerType: IN_PROGRESS,
        success: "FOUND_INFO",
        failure: "NOT_FOUND_QUESTION",
        waitForResult: true
    }
    , {type: "NOT_FOUND_QUESTION", yes: "STUDENT_LOOKUP", no: "PERSONAL_INFO", footerType: QUESTION}
    , {type: "FOUND_INFO", footerType: CONTINUE}
    , {type: "PERSONAL_INFO", footerType: IN_PROGRESS}
    , {type: "ADDRESS", footerType: IN_PROGRESS}
    , {type: "ENROLLMENT_QUESTION", yes: "SUBMIT", no: "ENROLLMENT", footerType: QUESTION}
    , {type: "ENROLLMENT", footerType: IN_PROGRESS}
    , {type: "SUBMIT", footerType: END}

    , {type: "VOCATIONAL_SCHOOL_SELECTION", footerType: CONTINUE}
    , {type: "VOCATIONAL_SCHOOL_INFO", footerType: CONTINUE}
    , {type: "VOCATIONAL_PROGRAMS", footerType: CONTINUE}
    , {type: "VOCATIONAL_SUBMIT_REVIEW", footerType: END}

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

const normalFlow = [
    getIndexFromCatalog("USER_PROFILE"),
    getIndexFromCatalog("INSTRUCTIONS"),
    getIndexFromCatalog("IS_VOCATIONAL_STUDENT_QUESTION"),
    getIndexFromCatalog("DEPR_ENROLLED_QUESTION"),
    getIndexFromCatalog("STUDENT_LOOKUP"),
    getIndexFromCatalog("NOT_FOUND_QUESTION"),
    getIndexFromCatalog("FOUND_INFO"),
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("ENROLLMENT_QUESTION"),
    getIndexFromCatalog("ENROLLMENT"),
    getIndexFromCatalog("SUBMIT")];

const studentRequesterVocationalFlow = [
    getIndexFromCatalog("USER_PROFILE"),
    getIndexFromCatalog("INSTRUCTIONS"),
    //verify this
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("ADDRESS"),

    getIndexFromCatalog("VOCATIONAL_SCHOOL_SELECTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_INFO"),
    getIndexFromCatalog("VOCATIONAL_PROGRAMS"),
    getIndexFromCatalog("VOCATIONAL_SUBMIT_REVIEW")
];
const parentVocationalFlow = [
    getIndexFromCatalog("USER_PROFILE"),
    getIndexFromCatalog("INSTRUCTIONS"),
    getIndexFromCatalog("IS_VOCATIONAL_STUDENT_QUESTION"),
    getIndexFromCatalog("DEPR_ENROLLED_QUESTION"),
    getIndexFromCatalog("STUDENT_LOOKUP"),
    getIndexFromCatalog("NOT_FOUND_QUESTION"),
    getIndexFromCatalog("FOUND_INFO"),
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_SELECTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_INFO"),
    getIndexFromCatalog("VOCATIONAL_PROGRAMS"),
    getIndexFromCatalog("VOCATIONAL_SUBMIT_REVIEW")
];
const editNormalFlow = [
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("ADDRESS"),
    getIndexFromCatalog("ENROLLMENT_QUESTION"),
    getIndexFromCatalog("ENROLLMENT"),
    getIndexFromCatalog("SUBMIT")
];
const editVocationalFlow = [
    getIndexFromCatalog("PERSONAL_INFO"),
    getIndexFromCatalog("ADDRESS"),

    getIndexFromCatalog("VOCATIONAL_SCHOOL_SELECTION"),
    getIndexFromCatalog("VOCATIONAL_SCHOOL_INFO"),
    getIndexFromCatalog("VOCATIONAL_PROGRAMS"),
    getIndexFromCatalog("VOCATIONAL_SUBMIT_REVIEW")
];

let flow;

export const load = (requestId) => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_LOAD_START});
    let user = getState().profile.user;
    let profileCompleted = user.profileCompleted;
    let startPage = profileCompleted ? 1 : 0;
    let editing = (user.workingPreEnrollmentId && user.workingPreEnrollmentId > 0) || requestId;

    flow = editing
        ? user.userVocationalStudent ? editVocationalFlow : editNormalFlow
        : normalFlow;  //always start
    if (editing) {
        startPage = 0;
        requestId = requestId || user.workingPreEnrollmentId;
    }

    //check if user has pending pre-enrollment
    dispatch({
        type: types.ON_WIZARD_LOAD_END,
        current: startPage,
        footerType: getForm(startPage).footerType,
        editing: editing,
        formsToDisplay: flow,
        workingRequestId: requestId
    })
};

function changeForms(dispatch, preEnrollment, formToChange) {
    flow = formToChange;
    preEnrollment.type = "VOCATIONAL";
    dispatch({type: types.ON_WIZARD_FORMS_CHANGE, forms: formToChange});
}

export const onNextAction = (onPress) => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_NEXT_START});
    let wizard = getState().wizard;
    let preEnrollment = getState().preEnrollment;
    let user = getState().profile.user;

    let current = wizard.current;
    let maxForms = wizard.maxForms;
    let maxCurrent = (maxForms - 1);

    //todo: fran improve this
    if (isType(current, "IS_VOCATIONAL_STUDENT_QUESTION")) {
        changeForms(dispatch, preEnrollment, parentVocationalFlow);
    } else if (isType(current, "INSTRUCTIONS") && !wizard.editing && user.userVocationalStudent) {
        changeForms(dispatch, preEnrollment, studentRequesterVocationalFlow);
    } else if (isType(current, "PERSONAL_INFO")) {
        if (wizard.editing && !user.userVocationalStudent) {
            changeForms(dispatch, preEnrollment, editVocationalFlow);
        }
    }

    let currentForm = getForm(current);
    let next = current + 1;

    if (currentForm.type.lastIndexOf("_QUESTION") > 0) {
        next = getIndexFromFlow(currentForm.yes);
    } else if (isType(current, "ADDRESS") && preEnrollment.type === "REGULAR") {
        let preEnrollmentInfo = preEnrollment.info;
        if (!preEnrollmentInfo.hasPreviousEnrollment) {
            next = current + 2;
        }
    }

    onPress((result) => {
        if (currentForm.waitForResult && result) {

            next = result === types.ON_FOUND_CALLBACK
                ? getIndexFromFlow(currentForm.success)
                : getIndexFromFlow(currentForm.failure);
        }

        console.log(next);
        if (maxCurrent === current) {
            dispatch({type: types.ON_WIZARD_COMPLETED});
        } else {
            dispatch({
                type: types.ON_WIZARD_NEXT_END,
                current: current < maxCurrent ? next : maxCurrent,
                isFinalStep: maxCurrent === current,
                footerType: getForm(next).footerType
            });
        }
    })
};

export const onPreviousAction = () => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_PREVIOUS_START});
    let preEnrollment = getState().preEnrollment;
    let wizard = getState().wizard;
    let flowNavigation = wizard.flowNavigation;
    let current = wizard.current;

    if (isType(current, "IS_VOCATIONAL_STUDENT_QUESTION")) {
        preEnrollment.type = "REGULAR";
        changeForms(dispatch, normalFlow);
    }

    let currentForm = getForm(current);
    let next;
    if (currentForm.type.lastIndexOf("_QUESTION") > 0) {
        next = getIndexFromFlow(currentForm.no);
    } else {
        next = flowNavigation.length > 0
            ? pop(flowNavigation, 2)
            : current - 1;
    }

    dispatch({
        type: types.ON_WIZARD_PREVIOUS_END,
        current: next,
        footerType: getForm(next).footerType
    });
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
