import * as types from "../types";
import * as Utils from "../../Utils";

const initialState = {
    authentication: {
        username: '',
        password: '',
    },
    form: {},
    user: {},
    authenticated: false,
    invalidCredentials: false,
    errorAtLogin: false,
    loading: true,
    cleanTimeoutId: null,
    clean: false

};

const profile = (state = Utils.freezeObject(initialState), action) => {
    let authentication = {username: action.username, password: ''};
    switch (action.type) {
        case types.AUTHENTICATING_START:
            return {...state, loading: true, authentication: authentication, invalidCredentials: false, errorAtLogin: false, clean: false};
        case types.AUTHENTICATING_END:
            return {...state, loading: false};
        case types.AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                user: action.response,
                loading: false
            };
        case types.PROFILE_UPDATE_START:
        case types.FETCH_USER_INFO_START:
        case types.FETCH_USER_INFO_END:
            return state;
        case types.UNKNOWN_LOGIN_ERROR:
            return {...state, errorAtLogin: true};
        case types.INVALID_CREDENTIALS:
            return {...state, invalidCredentials: true};
        case types.CLEAN_LOGIN:
            return {...initialState, authentication: authentication, clean: true};
        case types.SESSION_CHECK_START:
            return {...state, loading: true};
        case types.SESSION_CHECK_END:
            return {...state, user: action.user, loading: false, authenticated: action.authenticated};
        case types.PROFILE_UPDATE_END:
            return {...state, user: action.user};
        case types.TOGGLE_LOGIN_CLEAN_TIMEOUT:
            return {...state, cleanTimeoutId: action.cleanTimeoutId};
        default:
            return state;
    }
};

export default profile;