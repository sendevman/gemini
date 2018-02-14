import services from "../setup";
import * as types from "../types";
import * as Utils from "../../Utils";


export const validateForm = (userForm, onValid: () => void) => (dispatch) => {
    let validForm = Utils.hasText(userForm.email)
        && Utils.hasText(userForm.firstName)
        && Utils.hasText(userForm.fatherLastName)
        && Utils.hasText(userForm.motherLastName)
        && Utils.validDate(userForm.dateOfBirth);
    console.log(`validForm = ${Utils.validDate(userForm.dateOfBirth)}`);
    dispatch({type: types.VALIDATE_REGISTER_FORM, valid: validForm});
    if (validForm && onValid) {
        onValid();
    }
};

export const registerUser = (userForm, success, error) => (dispatch) => {
    dispatch({type: types.REGISTER_START});
    services()
        .registerAccount(userForm)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.REGISTER_END});
            response.successfullyRegistered ? success() : error()
        })

};

export const existsCode = (code) => (dispatch) => {
    dispatch({type: types.USER_LOCATION_START});
    services()
        .existsCode(code)
        .then((response) => {
            dispatch({type: types.USER_LOCATION_END, result: response === "true"})
        });

};


export const activateAccount = (activationForm, success, error) => (dispatch) => {
    dispatch({type: types.ACTIVATION_USER_START});
    services()
        .activateAccount(activationForm)
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: types.ACTIVATION_USER_END, result: response.successfullyRegistered});
            response.successfullyRegistered ? success() : error()
        });
};
