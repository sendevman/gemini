import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {setupStore} from "./redux/setup";
import {BrowserRouter as Router} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
//css
import 'react-block-ui/style.css';
import "./index.css";
import App from "./App";
import ErrorCatcher from "./ErrorCatcher";

let store = setupStore();

ReactDOM.render(
    <Provider store={store}>
        <ErrorCatcher>
            <Router basename="/srs">
                <App/>
            </Router>
        </ErrorCatcher>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
