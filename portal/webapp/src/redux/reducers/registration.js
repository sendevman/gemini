import * as types from "../types"

const initialState = {
    form: {},
    activationForm: {},
    formValidated: false,
    loading: false,
    validCode: false,
    activationCompleted: false
};

const registration = (state = initialState, action) => {
    switch (action.type) {
        case types.VALIDATE_REGISTER_FORM:
            return {...state, formValidated: action.valid, loading: false};
        case types.REGISTER_START:
            return {...state, formValidated: action.valid, loading: true};
        case types.REGISTER_END:
            return {...state, formValidated: action.valid, loading: false, form: {}};
        case types.ACTIVATION_USER_START:
        case types.USER_LOCATION_START:
            return state;
        case types.USER_LOCATION_END:
            return {...state, validCode: action.result};
        case types.ACTIVATION_USER_END:
            return {...state, activationCompleted: action.result, activationForm: {}};
        default:
            return state;
    }
};

export default registration;