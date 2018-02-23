import * as types from "../types";

const initialState = {
    requestId: null,
    preEnrollment: {
        regionId: null,
        schoolId: null,
        schoolName: null,
        schoolAddress: null,
        nextGradeLevel: null,
        nextGradeLevelDescription: null
    },
    student: {},
    physicalAddress: {line1: '', line2: '', city: '', country: '', zipcode: ''},
    postalAddress: {line1: '', line2: '', city: '', country: '', zipcode: ''},
    foundPreviousEnrollment: false,
    initialPreEnrollmentSaved: false,
    completePreEnrollment: false
};

const studentInfo = (state = initialState, action) => {
    switch (action.type) {
        case types.STUDENT_PERSONAL_INFO_LOAD:
            return {...state, student: action.student || {}};
        case types.STUDENT_CREATE_PRE_ENROLLMENT_START:
            return state;
        case types.STUDENT_CREATE_PRE_ENROLLMENT_END:
            return {...state, preEnrollment: action.response.content, requestId: action.response.requestId, initialPreEnrollmentSaved: true};
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
        case types.PRE_ENROLLMENT_SUBMIT_START:
            return state;
        case types.PRE_ENROLLMENT_SUBMIT_END:
            return {...state, completePreEnrollment: action.response.successfulOperation};
        default:
            return state;
    }
};

export default studentInfo;