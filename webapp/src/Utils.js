/**
 * Created by fran on 1/29/18.
 */



export function clear(form) {
    let cloneObj = Object.assign({}, form);
    for (let prop in cloneObj) {
        if (cloneObj.hasOwnProperty(prop))
            cloneObj[prop] = '';
    }
    return cloneObj;

}