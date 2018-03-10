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

export const logout = (onResult) => (dispatch) => {
    dispatch({type: types.LOGOUT_START});
    return _logout(onResult, dispatch);
};

export const checkSession = () => (dispatch) => {
    dispatch({type: types.SESSION_CHECK_START});
    return _session(dispatch);
};

async function _session(dispatch) {
    let sessionResp;

    try {
        sessionResp = await services().session();
    } catch (e) {
        console.log("error loading");
        dispatch({type: types.SESSION_CHECK_END, authenticated: false, user: {}});

    }

    switch (sessionResp && sessionResp.status) {
        case 200:
            let user = await sessionResp.json();
            dispatch({type: types.SESSION_CHECK_END, authenticated: true, user: user});
            break;
        case 401:
        case 403:
            dispatch({type: types.SESSION_CHECK_END, authenticated: false, user: {}});
    }


}

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
                let canGoHome = jsonResponse.canGoHome;
                let nextPath = canGoHome ? "/home" : "/wizard";
                onSuccess(nextPath);
                break;
            default:
                dispatch({type: types.UNKNOWN_LOGIN_ERROR})
        }


}

async function _logout(onResult, dispatch) {
    try {
        await services().logout();
    } catch (e) {
        console.log("error on logout")
    }

    onResult();
    dispatch({type: types.LOGOUT_END});
}