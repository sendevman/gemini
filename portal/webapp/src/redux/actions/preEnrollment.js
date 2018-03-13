import * as types from "../types";
import services from "../setup";

export const savePreEnrollment = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_START});
    let studentInfo = getState().studentInfo;
    let preEnrollment = getState().preEnrollment;
    form.requestId = preEnrollment.requestId;
    form.studentNumber = studentInfo.student.studentNumber;
    services()
        .savePreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_END, response: response});
            dispatch({type: types.STUDENT_UDPATED, student: response.student});

            try {
                if (response.successfulOperation)
                    onResult();
                else
                    onError();
            } catch (e) {
                onError();
            }
        });
};

export const submitPreEnrollment = (form, onResult, onError) => (dispatch) => {
    dispatch({type: types.PRE_ENROLLMENT_SUBMIT_START});
    services()
        .submitPreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.PRE_ENROLLMENT_SUBMIT_END, response: response});
            try {
                if (response.successfulOperation)
                    onResult();
                else
                    onError();
            } catch (e) {
                onError();
            }
        });

};

export const partialVocationalPreEnrollment = (form, onResult, onError) => (dispatch) => {

};

export const submitVocationalPreEnrollment = (form, onResult, onError) => (dispatch) => {

};
