import * as types from "../types";
import services from "../setup";

export const loadPersonalInfo = () => (dispatch, getState) => {
    let student = getState().studentLookup.student;
    dispatch({type: types.STUDENT_PERSONAL_INFO_LOAD, student: student})
};

export const savePreEnrollment = (form, onResult, onError) => (dispatch) => {
    dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_START});
    services()
        .savePreEnrollment(form)
        .then((response) => {
            dispatch({type: types.STUDENT_CREATE_PRE_ENROLLMENT_END});
            try {
                if (response.found) {
                    onResult();
                } else {
                    onResult();
                }
            } catch (e) {
                onError();
            }
        });
};