import * as types from "../types";

const initialState = {
    form: {},
    student: null,
    found: false
};

const studentLookup = (state = initialState, action) => {
    switch (action.type) {
        case types.STUDENT_SEARCH_START:
        case types.STUDENT_SEARCH_END:
            return state;
        case types.STUDENT_LOOKUP_FORM_CHANGE:
            return {...state, form: action.form};
        case types.STUDENT_FOUND:
            console.log(JSON.stringify(action));
            return {...state, student: action.result, found: true};
        case types.STUDENT_NOT_FOUND:
            return {...state, student: null, found: false};
        default:
            return state;
    }
};
export default studentLookup;