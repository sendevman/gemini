import * as types from "../types";
import services from "../setup";

export const loadPersonalInfo = () => (dispatch, getState) => {
    let studentLookup = getState().studentLookup.student;
    let studentPreEnrollment = getState().studentInfo.student;
    let initialPreEnrollmentSaved = getState().studentInfo.initialPreEnrollmentSaved;
    dispatch({
        type: types.STUDENT_PERSONAL_INFO_LOAD,
        student: initialPreEnrollmentSaved ? studentPreEnrollment : studentLookup
    })
};

export const savePreEnrollment = (form, onResult, onError) => (dispatch) => {
    dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_START});
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