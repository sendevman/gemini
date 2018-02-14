/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import Authentication from "./forms/Authentication";
import Home from "./forms/Home";
import NotFoundPage from "./NotFoundPage";
import {Route, Switch, withRouter} from "react-router-dom";
import Registration from "./forms/registration/Registration";
import Activation from "./forms/registration/Activation";
import StatusForm from "./forms/StatusForm";
import Profile from "./forms/Profile";
import Result from "./forms/registration/Result";

class Routes extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.onRouteChanged(this.props.location);
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Authentication}/>
                <Route path="/home" component={Home}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/activate/result/:result(success|error)" component={Result}/>
                <Route path="/activate/:activationCode" component={Activation}/>
                <Route path="/status" component={StatusForm}/>
                <Route path="/profile" component={Profile}/>

                {/*404 page*/}
                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}

export default withRouter(Routes);
