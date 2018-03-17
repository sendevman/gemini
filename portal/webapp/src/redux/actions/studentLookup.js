import services from "../setup";
import * as types from "../types";
import * as Utils from "../../Utils";

export const searchStudent = (criteria, onResult, onError) => (dispatch) => {
    criteria.dob = Utils.format(criteria.dob, "YYYYMMDD");
    dispatch({type: types.STUDENT_SEARCH_START, form: criteria});
    services()
        .searchStudent(criteria)
        .then((response) => {
            dispatch({type: types.STUDENT_SEARCH_END});
            try {
                if (response.found) {
                    dispatch({type: types.STUDENT_FOUND, result: response});
                    onResult(types.ON_FOUND_CALLBACK);
                } else {
                    dispatch({type: types.STUDENT_NOT_FOUND});
                    onResult(types.ON_NOT_FOUND_CALLBACK);
                }
            } catch (e) {
                onError();
            }

        });
};
