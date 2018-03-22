import services from "../setup";
import * as types from "../types";

export const saveProfile = (form, success, error) => (dispatch) => {
    dispatch({type: types.PROFILE_UPDATE_START});
    services()
        .saveProfile(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.PROFILE_UPDATE_END, user: response.content || {}});
            if (response.successfulOperation)
                success();
            else {
                error(response.validationMessages);
                dispatch({type: types.CANCEL_BLOCK_UI});
            }
        })
};

export const validateProfile = (form, onSuccessValidation, onErrorValidation) => (dispatch) => {

};