import services from "../setup";
import * as types from "../types";
import * as Utils from "../../Utils";

export const saveProfile = (form, success, error) => (dispatch) => {
    dispatch({type: types.PROFILE_UPDATE_START});
    let relation = Utils.normalizeEnumValue(form.relationType);
    let postObj = {firstName: null, middleName: null, lastName: null, dateOfBirth: null, ...form, relationType: relation};
    services()
        .saveProfile(postObj)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.PROFILE_UPDATE_END, user: response.content || {}});
            if (response.successfulOperation)
                success();
            else {
                error(Utils.errorObj(response));
                dispatch({type: types.CANCEL_BLOCK_UI});
            }
        })
};
