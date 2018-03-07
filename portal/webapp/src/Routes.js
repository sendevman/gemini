/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import Authentication from "./forms/Authentication";
import Home from "./forms/Home";
import Wizard from "./forms/wizard/Wizard";
import NotFoundPage from "./NotFoundPage";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Registration from "./forms/registration/Registration";
import Activation from "./forms/registration/Activation";
import Profile from "./forms/Profile";
import Result from "./forms/registration/Result";

class Routes extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.onRouteChanged(this.props.location);
        }
    }

    render() {
        let authenticated = this.props.authenticated;
        let loading = this.props.loading;
        return (
            <Switch>
                <Route exact path="/" component={Authentication}/>
                {/*public routes*/}
                <Route path="/registration" component={Registration}/>
                <Route path="/activate/result/:result(success|error)" component={Result}/>
                <Route path="/activate/:activationCode" component={Activation}/>
                {/*privates routes*/}
                <PrivateRoute path="/home" component={Home} authenticated={authenticated} loading={loading}/>
                <PrivateRoute path="/wizard" component={Wizard} authenticated={authenticated} loading={loading}/>
                <PrivateRoute path="/profile" component={Profile} authenticated={authenticated} loading={loading}/>

                {/*404 page*/}
                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            rest.authenticated || rest.loading
                ? rest.authenticated && !rest.loading ? (<Component {...props} />) : (null)
                : (<Redirect to={{pathname: "/", state: {from: props.location}}}/>)
        }
    />
);

export default withRouter(Routes);
