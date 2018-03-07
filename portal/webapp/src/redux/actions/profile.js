import services from "../setup";
import * as types from "../types";

export const saveProfile = (form, success, error) => (dispatch) => {
    dispatch({type: types.PROFILE_UPDATE_START});
    services()
        .saveProfile(form)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.PROFILE_UPDATE_END, user: response.content});
            response.successfulOperation ? success() : error()
        })
};