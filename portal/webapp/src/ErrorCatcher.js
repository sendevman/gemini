import React, {Component} from "react";
import failLogo from "./style/img/error.png";
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
            return <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <img className="mx-auto d-block" src={failLogo}/>

                        <div className="error-message">
                            <h3>Upps!!! Ha ocurrido un error</h3>
                            <button className="button-yellow mt50" type="button" onClick={this.goBack}>Volver</button>

                        </div>


                    </div>
                </div>

            </div>;
        }
        return this.props.children;
    }
}

export default withRouter(ErrorCatcher)