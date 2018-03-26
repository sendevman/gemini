import * as types from "../types";
import services from "../setup";

export const savePreEnrollment = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_START});
    let studentInfo = getState().studentInfo;
    let preEnrollment = getState().preEnrollment;
    form.requestId = preEnrollment.requestId;
    form.studentNumber = studentInfo.student.studentNumber;
    form.type = preEnrollment.type;
    services()
        .savePreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.STUDENT_UPDATED, student: response.content.student});
            dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_END, response: response});

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

export const partialSaveVocationalPreEnrollment = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.PARTIAL_VOC_PRE_ENROLLMENT_SAVE_START});
    let preEnrollment = getState().preEnrollment;
    form.requestId = preEnrollment.requestId;

    services()
        .partialSaveVocationalPreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.PARTIAL_VOC_PRE_ENROLLMENT_SAVE_END, response: response});

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

export const submitVocationalPreEnrollment = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.VOCATIONAL_PRE_ENROLLMENT_SUBMIT_START});
    let preEnrollment = getState().preEnrollment;
    form.requestId = preEnrollment.requestId;

    services()
        .submitVocationalPreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.VOCATIONAL_PRE_ENROLLMENT_SUBMIT_END, response: response});

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

export const retrieveVocationalPreEnrollment = (onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.VOCATIONAL_PRE_ENROLLMENT_RETRIEVE_START});
    let preEnrollment = getState().preEnrollment;
    let requestId = preEnrollment.requestId;

    // services()
    services()
        .getActiveVocationalPreEnrollment(requestId)
        .then((response) => {
            dispatch({type: types.VOCATIONAL_PRE_ENROLLMENT_RETRIEVE_END, response: response});
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

export const partialAlternatePreEnrollmentSave = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.PARTIAL_ALT_PRE_ENROLLMENT_SAVE_START});
    let preEnrollment = getState().preEnrollment;
    form.requestId = preEnrollment.requestId;

    services()
        .partialAlternatePreEnrollmentSave(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.PARTIAL_ALT_PRE_ENROLLMENT_SAVE_END, response: response});

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

export const submitAlternatePreEnrollment = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.ALTERNATE_PRE_ENROLLMENT_SUBMIT_START});
    let preEnrollment = getState().preEnrollment;
    form.requestId = preEnrollment.requestId;

    services()
        .submitAlternatePreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.ALTERNATE_PRE_ENROLLMENT_SUBMIT_END, response: response});

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

export const retrieveAlternatePreEnrollment = (onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.ALTERNATE_PRE_ENROLLMENT_RETRIEVE_START});
    let preEnrollment = getState().preEnrollment;
    let requestId = preEnrollment.requestId;

    // services()
    return services()
        .getActiveAlternatePreEnrollment(requestId)
        .then((response) => {
            dispatch({type: types.ALTERNATE_PRE_ENROLLMENT_RETRIEVE_END, response: response});
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

export const changeCurrentVocationalEnrollment = (currentEnrollment) => (dispatch)=>{
    dispatch({type: types.CHANGE_VOCATIONAL_PRE_ENROLLMENT, enrollment: currentEnrollment})
};