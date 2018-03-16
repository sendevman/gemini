import * as types from "../types";

const initialState = {
    email: "",
    validEmail: false,
    passwordHasBeenReset: false,
    validKey: false,
    invalidEmail: false,
    loading: true

};

const loginHelp = (state = initialState, action) => {

    switch (action.type) {
        case types.FORGOT_PASSWORD_REQUEST_END:
            return {...state, email: action.email, invalidKey: action.result, loading: false};
        case types.VALIDATE_CRED_LOST_KEY_END:
            return {...state, invalidEmail: action.email, validKey: action.result, loading: false};
        case types.RESET_PASSWORD_END:
            return {...state, passwordHasBeenReset: action.result, loading: false};
        case types.FORGOT_PASSWORD_REQUEST_START:
        case types.VALIDATE_CRED_LOST_KEY_START:
        case types.RESET_PASSWORD_START:
            return {...state, loading: true};
        default:
            return state;
    }
};

export default loginHelp;