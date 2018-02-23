import {buildUrl} from "../../Utils";

export default class Services {

    constructor(store) {
        this.store = store;
    }

    //accounts
    registerAccount(user) {
        return this._post("/account/register", user);
    }

    activateAccount(activationForm) {
        return this._post(`/account/activate`, activationForm);
    }

    existsCode(code) {
        return this._getRaw(`/account/activate/${code}`);
    }

    //smax interface
    searchStudent(criteria) {
        return this._get(`/smax/interface/search/student/lastssn/${criteria.lastSSN}/student/number/${criteria.studentNumber}/dob/${criteria.dob}`);
    }

    getRegions() {
        return this._get(`/smax/interface/retrieve/regions`);
    }

    getGradeLevels() {
        return this._get(`/smax/interface/retrieve/grade/levels`);
    }

    getSchoolsByRegionAndGradeLevel(regionId, gradeLevel) {
        return this._get(`/smax/interface/retrieve/school/${regionId}/grade/level/${gradeLevel}`);
    }

    //pre-enrollment
    savePreEnrollment(form) {
        return this._post(`/enrollment/pre/save`, form);
    }

    getPreEnrollmentAddress(requestId) {
        return this._get(`/enrollment/pre/${requestId}/address`);
    }

    savePreEnrollmentAddress(addressForm) {
        return this._post(`/enrollment/pre/${addressForm.requestId}/address/save`, addressForm);
    }

    submitPreEnrollment(form) {
        return this._post(`/enrollment/pre/submit`, form);
    }


    _get(path) {
        return fetch(buildUrl(path), this._addHeader())
            .then((response) => this._handleHttpCode(response))
            .then((response) => response.json())
            .catch((e) => {
            })
    }


    _getRaw(path) {
        return fetch(buildUrl(path), this._addHeader())
            .then((response) => this._handleHttpCode(response))
            .then((response) => response.text())
            .catch((e) => {
            })
    }

    _post(path, body) {
        return fetch(buildUrl(path), {method: "POST", body: JSON.stringify(body), ...this._addHeader()})
            .then((response) => this._handleHttpCode(response))
            .catch((e) => {
            });
    }

    _put(path, body) {
        return fetch(buildUrl(path), {method: "PUT", body: JSON.stringify(body), ...this._addHeader()})
            .then((response) => this._handleHttpCode(response))
            .catch((e) => {
            });
    }

    _addHeader() {
        let user = this.store.getState().user;
        console.log("adding header " + JSON.stringify(this.store.getState().user));
        let token = user !== undefined && user.jwt;
        return {
            headers: token ? {"x-access-token": token} : {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
        };
    }

    _handleHttpCode(response) {

        let httpStatus = response.status;
        if ((httpStatus >= 200 && httpStatus < 300) || (httpStatus > 400 && httpStatus <= 403) || httpStatus === 423) {
            return response;
        } else {
            console.log(`internal server error, error info: ${response.statusText}`);
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
            /*
             if (manageException) {
             this.triggerError(error)
             } else {
             throw error;
             }
             */
        }
    }

}