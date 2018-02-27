import * as types from "../types";

const initialState = {
    form: {
        username: '',
        password: '',
    },
    user: {},
    authenticated: false,
    invalidCredentials: false,
    errorAtLogin: false

};

const login = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATING_START:
            return state;
        case types.AUTHENTICATED:
            return {...state, form: {username: '', password: ''}, authenticated: true, user: action.response};
        case types.FETCH_USER_INFO_START:
        case types.FETCH_USER_INFO_END:
            return state;
        case types.UNKNOWN_LOGIN_ERROR:
            return {...state, errorAtLogin: true};
        case types.INVALID_CREDENTIALS:
            return {...state, invalidCredentials: true};
        case types.CLEAN_LOGIN:
            return initialState;
        default:
            return state;
    }
};

export default login;