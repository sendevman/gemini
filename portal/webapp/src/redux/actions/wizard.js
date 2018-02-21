import * as types from "../types";

const START = {type: "START", nextButton: "Comenzar"};
const QUESTION = {type: "YES_NO", nextButton: "Si", previousButton: "No"};
const IN_PROGRESS = {type: "NEXT_PREVIOUS", nextButton: "Proximo", previousButton: "Retroceder"};
const CONTINUE = {type: "START", nextButton: "Continuar"};
const END = {type: "FINALIZE", nextButton: "Someter"};


const formFlow = [
    {type: "DEPR_ENROLLED_QUESTION", yes: 1, no: 4, footerType: QUESTION},
    {type: "STUDENT_LOOKUP", footerType: IN_PROGRESS, success: 3, failure: 2, waitForResult: true},
    {type: "NOT_FOUND_QUESTION", yes: 1, no: 4, footerType: QUESTION},
    {type: "FOUND_INFO", footerType: CONTINUE},
    {type: "PERSONAL_INFO", footerType: IN_PROGRESS},
    {type: "ADDRESS", footerType: IN_PROGRESS},
    {type: "ENROLLMENT_QUESTION", yes: 8, no: 7, footerType: QUESTION},
    {type: "ENROLLMENT", footerType: IN_PROGRESS, waitForResult: true},
    {type: "SUBMIT", footerType: END}];


export const load = () => (dispatch) => {
    dispatch({type: types.ON_WIZARD_LOAD_START});
    //check if user has pending pre-enrollment
    dispatch({type: types.ON_WIZARD_LOAD_END, footerType: formFlow[0].footerType})
};

export const onNextAction = (onPress) => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_NEXT_START});
    let wizard = getState().wizard;
    let current = wizard.current;
    let maxForms = wizard.maxForms;
    let maxCurrent = (maxForms - 1);
    let currentForm = formFlow[current];
    let next = current + 1;

    if (currentForm.type.lastIndexOf("_QUESTION") > 0) {
        next = currentForm.yes;
    } else if (current === 5) {

    }

    onPress((result) => {
        if (currentForm.waitForResult && result) {
            next = result === types.ON_FOUND_CALLBACK
                ? currentForm.success
                : currentForm.failure;
        }

        dispatch({
            type: types.ON_WIZARD_NEXT_END,
            current: current < maxCurrent ? next : maxCurrent,
            isFinalStep: maxCurrent === current,
            footerType: formFlow[next].footerType
        });
    })
};


export const onPreviousAction = () => (dispatch, getState) => {
    dispatch({type: types.ON_WIZARD_PREVIOUS_START});
    let wizard = getState().wizard;
    let flowNavigation = wizard.flowNavigation;
    let current = wizard.current;
    let currentForm = formFlow[current];
    let next;
    if (currentForm.type.lastIndexOf("_QUESTION") > 0) {
        next = currentForm.no;
    } else {
        next = flowNavigation.length > 0
            ? pop(flowNavigation, 2)
            : current - 1;
    }

    dispatch({
        type: types.ON_WIZARD_PREVIOUS_END,
        current: next,
        footerType: formFlow[next].footerType
    });
};

function pop(array, n) {
    let val;
    while (n > 0) {
        val = array.pop();
        n--;
    }
    return val;
}
