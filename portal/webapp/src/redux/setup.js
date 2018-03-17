import {applyMiddleware, compose, createStore} from "redux";
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import reducers from "./reducers"
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import Services from "./services/Services";
import * as types from "./types";

let instance = null;


export function setupStore() {
    const logger = createLogger({});
    const enhancer = compose(applyMiddleware(reduxMiddleware, thunk, logger));

    // persistStore(store, onCompletion);
    console.log("**store configured**");
    let store = createStore(reducers, enhancer);
    instance = new Services(store);
    return store;
}

export default function services() {
    return instance;
}


export function blockUIActions() {
    return evalTypes("_START");
}

export function unblockUIActions() {
    let list = evalTypes("_END");
    list.push(types.ON_WIZARD_COMPLETED);
    return list;
}

function evalTypes(searchToken) {
    let actions = [];
    for (let type in types) {
        let evalType = types[type];
        if (evalType.endsWith(searchToken)) {
            actions.push(evalType);
        }
    }
    return actions;
}
