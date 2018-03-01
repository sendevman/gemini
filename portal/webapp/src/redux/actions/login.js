import services from "../setup";
import * as types from "../types";

export const cleanLogin = () => (dispatch) => {
    dispatch({type: types.CLEAN_LOGIN});
};

export const login = (form, onSuccess, onError) => (dispatch) => {
    dispatch({type: types.AUTHENTICATING_START});
    //do nothing with this promise on front-end side
    return _login(form, dispatch, onSuccess, onError);
};

async function _login(form, dispatch, onSuccess, onError) {
    let authResponse;
    let jsonResponse;

    try {
        authResponse = await services().authenticate(form);
        jsonResponse = await authResponse.json();
        dispatch({type: types.AUTHENTICATING_END});
    } catch (e) {
        dispatch({type: types.AUTHENTICATING_END});
        dispatch({type: types.UNKNOWN_LOGIN_ERROR})
    }

    if (authResponse && authResponse.status)
        switch (authResponse.status) {
            case 401:
            case 403:
                dispatch({type: types.INVALID_CREDENTIALS});
                break;
            case 200:
                dispatch({type: types.AUTHENTICATED, response: jsonResponse});
                onSuccess();
                break;
            default:
                dispatch({type: types.UNKNOWN_LOGIN_ERROR})
        }


}

export const logout = (onResult) => (dispatch) => {
    dispatch({type: types.LOGOUT_START})
    return _logout(onResult, dispatch);
};

async function _logout(onResult, dispatch) {
    let logoutResponse;
    try {
        await services().logout();
        onResult();
        dispatch({type: types.LOGOUT_END});
    } catch (e) {
        onResult();
        dispatch({type: types.LOGOUT_END});
    }
}