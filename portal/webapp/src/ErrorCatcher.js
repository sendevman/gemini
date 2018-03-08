import React, {Component} from "react";
import failLogo from "./style/img/fail.png";

export default class ErrorCatcher extends Component {

    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        console.log(`error occurred = ${error}`);
        // Display fallback UI
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="error-page">
                <div className="center-block" style={{width: 500}}>
                    <img className="error-logo" src={failLogo}/>
                    <h1>Plop!!! Ha ocurrido un error.</h1>
                </div>
            </div>;
        }
        return this.props.children;
    }
}