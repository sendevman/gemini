/**
 * Created by fran on 1/29/18.
 */
import env from "./env";
import moment from "moment";


export function clear(form) {
    let cloneObj = Object.assign({}, form);
    for (let prop in cloneObj) {
        if (cloneObj.hasOwnProperty(prop))
            cloneObj[prop] = '';
    }
    return cloneObj;

}

export function buildUrl(path) {
    return `${env.restServer}${path}`
}

export function hasText(value) {
    return !isEmpty(value)
}

export function isEmpty(value) {
    return (!value || 0 === value.length);
}

export function validDate(value) {
    return value && moment(value).isValid();
}