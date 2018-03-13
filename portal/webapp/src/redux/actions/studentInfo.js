import * as types from "../types";
import services from "../setup";

export const loadPersonalInfo = (onResult, onError) => (dispatch, getState) => {
    dispatch({type: types.STUDENT_PERSONAL_INFO_LOAD_START});

    let studentLookup = getState().studentLookup.student;
    let preEnrollment = getState().preEnrollment;
    let requestId = preEnrollment.requestId = getState().wizard.workingRequestId;
    let editingRequest = preEnrollment.requestId || false;

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

export const loadAddress = () => (dispatch, getState) => {
    let requestId = getState().preEnrollment.requestId;
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
    form.requestId = getState().preEnrollment.requestId;
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
