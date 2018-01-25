/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import Authentication from "./forms/Authentication";
import Home from "./forms/Home";
import NotFoundPage from "./NotFoundPage";
import {Route, Switch, withRouter} from "react-router-dom";

class Routes extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.onRouteChanged(this.props.location);
            console.log(`this.props.location = ${this.props.location.pathname}`)
            console.log(`prevProps.location = ${prevProps.location.pathname}`)

        }
    }




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

export default withRouter(Routes);
