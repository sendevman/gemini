import * as types from "../types";
import services from "../setup";

export const loadPersonalInfo = (onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.STUDENT_PERSONAL_INFO_LOAD_START});

    let studentLookup = getState().studentLookup.student;
    let studentInfo = getState().studentInfo;
    let requestId = studentInfo.requestId = getState().wizard.workingRequestId;
    let editingRequest = studentInfo.requestId || false;

    if (editingRequest)
        services()
            .getActivePreEnrollment(requestId)
            .then((response) => {
                dispatch({type: types.STUDENT_PERSONAL_INFO_LOAD_END, student: response.content});
                try {
                    if (response.successfulOperation)
                        onResult();
                    else
                        onError();
                } catch (e) {
                    onError();
                }
            });
    else
        dispatch({
            type: types.STUDENT_PERSONAL_INFO_LOAD_END,
            student: studentLookup
        })


};

export const savePreEnrollment = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_START});
    let studentInfo = getState().studentInfo;
    form.requestId = studentInfo.requestId;
    form.studentNumber =  studentInfo.student.studentNumber;
    services()
        .savePreEnrollment(form)
        .then((response) => response.json())
        .then((response) => {
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

export const loadAddress = () => (dispatch, getState) => {
    let requestId = getState().studentInfo.requestId;
    dispatch({type: types.STUDENT_LOAD_ADDRESS_START});
    services()
        .getPreEnrollmentAddress(requestId)
        .then((response) => {
            dispatch({type: types.STUDENT_LOAD_ADDRESS_END, response: response});

        });
};

export const copyPhysicalToPostal = () => (dispatch, getState) => {
    let physical = getState().studentInfo.physicalAddress;
    let postal = getState().studentInfo.postalAddress;
    let postalCpy = Object.assign({}, physical);
    postalCpy.type = postal.type;
    postalCpy.id = postal.id;
    dispatch({type: types.STUDENT_CPY_PHY_TO_POS_ADDRESS, postal: postalCpy})
};

export const saveAddress = (form, onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.STUDENT_SAVE_ADDRESS_START});
    form.requestId = getState().studentInfo.requestId;
    services()
        .savePreEnrollmentAddress(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.STUDENT_SAVE_ADDRESS_END, response: response});
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
