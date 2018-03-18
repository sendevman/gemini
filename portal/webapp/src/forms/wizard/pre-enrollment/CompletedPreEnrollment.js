import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";

export default class CompletedPreEnrollment extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [<div className="col-md-7 content-section">
            <div className="title h100">
                <div className="description mb40"><h2>Completado!</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f40sllg">
                    <span className="f40sbgr">¡Enhorabuena! Registremos al estudiante en el sistema.Le enviaremos un email proximamente</span>
                </p>
            </div>
            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={leisureIllustration} alt=""/></div>
            </div>];
    }
}