/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import Authentication from "./forms/Authentication";
import Home from "./forms/Home";
import NotFoundPage from "./NotFoundPage";
import {Route, Switch} from "react-router-dom";

export default class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Authentication}/>
                <Route path="/home" component={Home}/>
                {/*404 page*/}
                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}
