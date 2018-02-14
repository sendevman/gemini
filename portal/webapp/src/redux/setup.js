import {applyMiddleware, compose, createStore} from "redux";
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import reducers from "./reducers"
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import Services from "./services/Services";

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

