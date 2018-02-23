import * as types from "../types";

const initialState = {
    regions: [],
    gradeLevels: [],
    schools: []
};
const config = (state = initialState, action) => {

    switch (action.type) {
        case types.REGION_LOAD_END:
            return {...state, regions: action.response};
        case types.GRADELEVEL_LOAD_END:
            return {...state, gradeLevels: action.response};
        case types.SCHOOL_LOAD_END:
            return {...state, schools: action.response};
        default:
            return state;
    }
};

export default config;