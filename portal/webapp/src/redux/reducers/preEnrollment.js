import * as types from "../types";

const initialState = {
    requestId: null,
    type: "REGULAR",
    info: {
        regionId: null,
        schoolId: null,
        schoolName: null,
        schoolAddress: null,
        nextGradeLevel: null,
        nextGradeLevelDescription: null
    },
    //this for the form being editing
    currentVocationalEnrollment: {
        id: null,
        nextGradeLevel: null,
        schoolId: null,
        programs: [],
        programsToDelete: []
    },
    foundPreviousEnrollment: false,
    initialPreEnrollmentSaved: false,
    completePreEnrollment: false
};

const preEnrollment = (state = initialState, action) => {
    switch (action.type) {

        case types.STUDENT_CREATE_PRE_ENROLLMENT_START:
        case types.VOCATIONAL_PRE_ENROLLMENT_RETRIEVE_START:
            return state;
        case types.STUDENT_CREATE_PRE_ENROLLMENT_END:
        case types.VOCATIONAL_PRE_ENROLLMENT_RETRIEVE_END:
            let resp = action.response.content;
            return {
                ...state,
                info: resp,
                requestId: action.response.requestId,
                initialPreEnrollmentSaved: true
            };
        case types.PRE_ENROLLMENT_SUBMIT_START:
            return state;
        case types.PRE_ENROLLMENT_SUBMIT_END:
            return {...state, completePreEnrollment: action.response.successfulOperation};
        case types.CHANGE_VOCATIONAL_PRE_ENROLLMENT:
            return {
                ...state, currentVocationalEnrollment: action.enrollment || {
                    id: null,
                    nextGradeLevel: null,
                    schoolId: null,
                    programs: [],
                    programsToDelete: []
                }
            };
        default:
            return state;
    }
};

export default preEnrollment;