import * as types from "../types";

const initialState = {
    student: null
};

const studentInfo = (state = initialState, action) => {
    switch (action.type) {
        case types.STUDENT_PERSONAL_INFO_LOAD:
            return {student: action.student};
        case types.STUDENT_CREATE_PRE_ENROLLMENT_START:
        case types.STUDENT_CREATE_PRE_ENROLLMENT_END:
            return state;
        default:
            return state;
    }
};

export default studentInfo;