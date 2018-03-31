import services from "../setup";
import * as types from "../types";

export const searchStudent = (criteria, onResult, onError) => (dispatch) => {
    dispatch({type: types.STUDENT_SEARCH_START, form: criteria});

    let postObj = {firstName: null, lastName: null, studentNumber: null, lastSsn: null, dateOfBirth: null, ...criteria};
    services()
        .searchStudent(postObj)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.STUDENT_SEARCH_END});
            try {
                if (response.found) {
                    dispatch({type: types.STUDENT_FOUND, result: response});
                    onResult(types.ON_FOUND_CALLBACK);
                } else {
                    if (response.errorOperation && response.validationMessages) {
                        onError(response.validationMessages);
                        dispatch({type: types.CANCEL_BLOCK_UI});
                    }
                    else {
                        dispatch({type: types.STUDENT_NOT_FOUND});
                        onResult(types.ON_NOT_FOUND_CALLBACK);
                    }
                }
            } catch (e) {
                onError();
            }

        });
};
