import React, {Component} from "react";
import failLogo from "./assets/img/error.png";
import {withRouter} from "react-router-dom";
import Button from "./components/Button";
import Footer from "./Footer";
import registrationIllustration from "./assets/img/registration-illustration.png";

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
                <div className="row content">
                    <div className="col-md-1 navigation-section d-flex align-items-center"
                         onClick={this.goBack}>
                        <i className="icon-arrow"/>
                    </div>
                    <div className="col-md-7 content-section">
                        <div className="title">
                            <div className="description mb40">
                                <h2>Upps!!! Ha ocurrido un error</h2>
                            </div>
                            <img className="mx-auto d-block" src={failLogo}/>

                            <div className="error-message">
                                <Button size="xlarge" className="mt50" onClick={this.goBack}>Volver</Button>
                            </div>


                            <span className="f20slg"/>
                        </div>
                        <div className="body d-flex align-items-center flex-column justify-content-end">
                            <div style={{paddingBottom: 300}}
                                 className="col-md-12 illustration-section d-flex align-items-center text-center">
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                        <div className="illustration"><img src={registrationIllustration} alt=""/></div>
                    </div>
                    <Footer/>
                </div>
            </div>;
        }
        return this.props.children;
    }
}

export default withRouter(ErrorCatcher)