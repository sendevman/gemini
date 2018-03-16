import * as types from "../types";

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
    cleanTimeoutId: null

};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATING_START:
            return state;
        case types.AUTHENTICATED:
            return {...state, authentication: {username: '', password: ''}, authenticated: true, user: action.response};
        case types.PROFILE_UPDATE_START:
        case types.FETCH_USER_INFO_START:
        case types.FETCH_USER_INFO_END:
            return state;
        case types.UNKNOWN_LOGIN_ERROR:
            return {...state, errorAtLogin: true};
        case types.INVALID_CREDENTIALS:
            return {...state, invalidCredentials: true};
        case types.CLEAN_LOGIN:
            return initialState;
        case types.SESSION_CHECK_START:
            return {...state, loading: true};
        case types.SESSION_CHECK_END:
            return {...state, user: action.user, loading: false, authenticated: action.authenticated};
        case types.PROFILE_UPDATE_END:
            return {...state, user: action.user};
        default:
            return state;
    }
};

export default profile;