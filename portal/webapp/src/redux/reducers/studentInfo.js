import * as types from "../types";

const initialState = {
    requestId: null,
    student: null,
    physicalAddress: {},
    postalAddress: {},
    foundPreviousEnrollment: false
};

const studentInfo = (state = initialState, action) => {
    switch (action.type) {
        case types.STUDENT_PERSONAL_INFO_LOAD:
            return {...state, student: action.student};
        case types.STUDENT_CREATE_PRE_ENROLLMENT_START:
            return state;
        case types.STUDENT_CREATE_PRE_ENROLLMENT_END:
            return {...state, requestId: action.response.requestId};
        case types.STUDENT_LOAD_ADDRESS_START:
            return state;
        case types.STUDENT_LOAD_ADDRESS_END:
            return {...state, physicalAddress: action.response.physical, postalAddress: action.response.postal};
        case types.STUDENT_CPY_PHY_TO_POS_ADDRESS:
            return {...state, postalAddress: action.postal};
        default:
            return state;
    }
};

export default studentInfo;