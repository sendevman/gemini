import React, {Component} from "react";
import failLogo from "./style/img/fail.png";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class ErrorCatcher extends Component {

    constructor(props) {
        super(props);
        this.state = {hasError: false};
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.setState({hasError: false}, () => {
            window.location.reload()
        });
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="center-block" style={{width: 500}}>
                            <img className="error-logo" src={failLogo}/>
                            <h1>Upps!!! Ha ocurrido un error.</h1>
                            <Button block bsStyle="primary" onClick={this.goBack}>Volver</Button>
                        </div>
                    </div>
                </div>

            </div>;
        }
        return this.props.children;
    }
}

export default withRouter(ErrorCatcher)