import React from "react";
import * as message from "./assets/message_ES";

export function toggleFieldValidHtml(valid, required) {
    if (!required)
        return (null);
    return valid ? (<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="fas fa-check "
                                                              style={{fontSize: 12, color: "#5cb85c"}}/></span>)
        : (<span className="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*</span>)
}


export function getText(attribute) {
    return message.default[attribute];
}


export function validationDialog(modalRef, validationObj, afterCloseAction) {
    if (validationObj) {
        let formattedMessage = validationObj.title ? `${validationObj.title}:\n` : "";
        for (let message of validationObj.messages) {
            formattedMessage += `*\t${message}\n`;
        }
        modalRef.open("Favor cotejar los siguientes campos:", formattedMessage, afterCloseAction, true);
    } else {
        modalRef.open("Upps!!!", "Ha ocurrido un error, disculpe el inconveniente")
    }
}

// export function getTarget(target) {
//     if (isFunction(target)) {
//         return target();
//     }
//
//     if (typeof target === 'string' && document) {
//         let selection = document.querySelector(target);
//         if (selection === null) {
//             select = document.querySelector(`#${target}`);
//             if (selection === null) {
//                 select = document.getElementById(target);
//                 if (selection === null) {
//                     throw new Error(`The target '{target}' could not be identified in the dom, tip: check spelling`);
//                 }
//             }
//         }
//         return selection;
//     }
//
//     return target;
// }