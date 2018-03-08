import fetch from "safe-fetch";
import {buildUrl} from "../../Utils";

fetch.cookieName = 'XSRF-TOKEN';
fetch.headerName = 'X-XSRF-TOKEN';

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    "Content-Type": 'application/json'
};
export default class Services {

    constructor(store) {
        this.store = store;
    }

    //authentication
    token() {
        return this._getRaw("/token")
    }

    async authenticate(credentials) {
        await this.token();
        return this._login("/auth", credentials);
    }

    session() {
        return this._getPromise("/auth");
    }

    logout() {
        return this._securedPost("/logout", {});
    }

    //user
    saveProfile(form) {
        return this._securedPost(`/user/save`, form);
    }

    //home
    home() {
        return this._get("/home");
    }

    //accounts
    registerAccount(user, token) {
        return this._publicPost("/account/register", user, token);
    }

    activateAccount(activationForm, token) {
        return this._publicPost(`/account/activate`, activationForm, token);
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
    getActivePreEnrollment(requestId){
        return this._get(`/enrollment/pre/${requestId}`);
    }

    savePreEnrollment(form) {
        return this._securedPost(`/enrollment/pre/save`, form);
    }

    getPreEnrollmentAddress(requestId) {
        return this._get(`/enrollment/pre/${requestId}/address`);
    }

    savePreEnrollmentAddress(addressForm) {
        return this._securedPost(`/enrollment/pre/${addressForm.requestId}/address/save`, addressForm);
    }

    submitPreEnrollment(form) {
        return this._securedPost(`/enrollment/pre/submit`, form);
    }

    _login(path, credentials) {
        let authorization = `Basic ${btoa(credentials.username + ':' + credentials.password)}`;
        return fetch(buildUrl(path), {method: "POST", ...this._addHeader(authorization), credentials: "same-origin"})
            .then((response) => this._handleHttpCode(response))

    }

    _getPromise(path) {
        return fetch(buildUrl(path), this._addHeader())
            .then((response) => this._handleHttpCode(response));
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

    _publicPost(path, body, token) {
        return fetch(buildUrl(path), {
            method: "POST",
            body: JSON.stringify(body), ...this._addHeaderOnPublicPOST(token)
        })
            .then((response) => this._handleHttpCode(response))
            .catch((e) => {
            });
    }


    //todo: POST Methods can be improve
    _securedPost(path, body) {
        return fetch(buildUrl(path), {
            method: "POST",
            ...this._addHeader(),
            credentials: "same-origin",
            body: JSON.stringify(body)
        })
            .then((response) => this._handleHttpCode(response))
            .catch((e) => {
            });
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

    _addHeaderOnPublicPOST(token) {
        let headersObj = {headers: {...DEFAULT_HEADERS}};
        headersObj.headers["recaptcha-token"] = token;
        return headersObj;
    }

    _addHeader(authorization) {
        let headersObj = {headers: {...DEFAULT_HEADERS}};
        if (authorization)
            headersObj.headers.Authorization = authorization;
        return headersObj;
    }

    _handleHttpCode(response, manageException = false) {

        let httpStatus = response.status;
        if ((httpStatus >= 200 && httpStatus < 300) || (httpStatus > 400 && httpStatus <= 403) || httpStatus === 423) {
            return response;
        } else {
            console.log(`internal server error, error info: ${response && response.statusText}`);
            let message = (response && response.statusText) || "unknown error";

            if (manageException) {
                console.log(message);
                // this.triggerError(error)
            } else {
                throw new Error(message);
            }
        }
    }

}