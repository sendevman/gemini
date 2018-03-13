import * as types from "../types";
import services from "../setup";

export const loadCodes = () => (dispatch) => {
    Promise.all([getRegions(dispatch), getGradeLevels(dispatch)]).then(() => {
        //can enable school select
        // alert("regions");
    });
};

//todo: fran validate this!!!
export const loadVocationalCodes = () => (dispatch) => {
    Promise.all([getVocationalRegions(dispatch), getGradeLevels(dispatch)]).then(() => {
    });
};


function getVocationalRegions(dispatch) {
    dispatch({type: types.REGION_LOAD_START});
    return services().getVocationalRegions().then((response) => {
        dispatch({type: types.REGION_LOAD_END, response: response});
    });
}

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

export const getVocationalSchools = (regionId, gradeLevel) => (dispatch) => {
    dispatch({type: types.SCHOOL_LOAD_START});
    return services().getVocationalSchoolsByRegionAndGradeLevel(regionId, gradeLevel).then((response) => {
        dispatch({type: types.SCHOOL_LOAD_END, response: response});
    });
};

export const getVocationalPrograms = (schoolId) => (dispatch) => {
    dispatch({type: types.VOCATIONAL_PROGRAMS_START});
    return services().getVocationalProgramsBySchool(schoolId).then((response) => {
        dispatch({type: types.VOCATIONAL_PROGRAMS_END, response: response});

    });
};