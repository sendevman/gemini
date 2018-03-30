import * as types from "../types";
import * as Utils from "../../Utils";

const initialState = {
    regions: [],
    gradeLevels: [],
    schools: [],
    vocationalPrograms: [],
    specializedCategories: []
};
const config = (state = Utils.freezeObject(initialState), action) => {

    switch (action.type) {
        case types.REGION_LOAD_END:
            return {...state, regions: action.response};
        case types.GRADELEVEL_LOAD_END:
            return {...state, gradeLevels: action.response};
        case types.SCHOOL_LOAD_END:
            return {...state, schools: action.response};
        case types.VOCATIONAL_PROGRAMS_END:
            return {...state, vocationalPrograms: action.response};
        case types.CATEGORIES_LOAD_END:
            return {...state, specializedCategories: action.response};
        default:
            return state;
    }
};

export default config;