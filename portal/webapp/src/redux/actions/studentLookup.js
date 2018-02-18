import services from "../setup";
import * as types from "../types";
import * as Utils from "../../Utils";


export const searchStudent = (criteria, onSuccess, onError) => (dispatch) => {
    dispatch({type: types.STUDENT_SEARCH_START});
    criteria.dob = Utils.format(criteria.dob, "YYYYMMDD");
    services()
        .searchStudent(criteria)
        .then((response) => {
            dispatch({type: types.STUDENT_SEARCH_END});
            try {
                if (response.found) {
                    console.log(JSON.stringify(response));
                    dispatch({type: types.STUDENT_FOUND, result: response});
                    onSuccess();
                } else {
                    dispatch({type: types.STUDENT_NOT_FOUND});
                    onError();
                }
            } catch (e) {
                onError();
            }

        });
};

export const studentLookupChange = (form) => (dispatch) => {
    dispatch({type: types.STUDENT_LOOKUP_FORM_CHANGE, form: form});
};