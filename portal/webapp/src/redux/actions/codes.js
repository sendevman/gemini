import * as types from "../types";
import services from "../setup";

export const loadCodes = () => (dispatch) => {
    Promise.all([getRegions(dispatch), getGradeLevels(dispatch)]).then(() => {
        //can enable school select
        // alert("regions");
    });
};

function getRegions(dispatch) {
    dispatch({type: types.REGION_LOAD_START});
    return services().getRegions().then((response) => {
        dispatch({type: types.REGION_LOAD_END, response: response});
    });
}

function getGradeLevels(dispatch) {
    dispatch({type: types.GRADELEVEL_LOAD_START});
    return services().getGradeLevels().then((response) => {
        dispatch({type: types.GRADELEVEL_LOAD_END, response: response});
    });
}

export const getSchools = (regionId, gradeLevel) => (dispatch) => {
    dispatch({type: types.SCHOOL_LOAD_START});
    return services().getSchoolsByRegionAndGradeLevel(regionId, gradeLevel).then((response) => {
        dispatch({type: types.SCHOOL_LOAD_END, response: response});
    });
};