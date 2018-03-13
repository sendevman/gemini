import * as types from "../types";

const initialState = {
    student: {},
    physicalAddress: {line1: '', line2: '', city: '', country: '', zipcode: ''},
    postalAddress: {line1: '', line2: '', city: '', country: '', zipcode: ''}
};

const studentInfo = (state = initialState, action) => {
    switch (action.type) {
        case types.STUDENT_PERSONAL_INFO_LOAD_START:
            return state;
        case types.STUDENT_PERSONAL_INFO_LOAD_END:
            return {...state, student: action.student || {}};
        case types.STUDENT_LOAD_ADDRESS_START:
            return state;
        case types.STUDENT_LOAD_ADDRESS_END:
            return {
                ...state,
                physicalAddress: action.response && action.response.physical,
                postalAddress: action.response && action.response.postal
            };
        case types.STUDENT_CPY_PHY_TO_POS_ADDRESS:
            return {...state, postalAddress: action.postal};
        case types.STUDENT_UPDATED:
            return {...state, student: action.student};
        default:
            return state;
    }
};

export default studentInfo;