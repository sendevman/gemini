import * as types from "../types";

const initialState = {
    preEnrollments: [],
    canAddPreEnrollments: true
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case types.HOME_LOAD_START:
            return initialState;
        case types.HOME_LOAD_END:
            return {...state, preEnrollments: action.response.preEnrollments};
        default:
            return state;
    }
};

export default home;