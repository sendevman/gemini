import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";

export default class ConfirmedPreEnrollment extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2>Thank you!</h2>
                        <div className="violet-line"></div>
                    </div>
                    <p className="f40sllg">
                        <span className="f40sbgr">¡Gracias! El expediente de matrícula fue creado exitosamente.</span> ¿Desea matricular otro estudiante?</p>
                </div>
                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={leisureIllustration} alt=""/></div>
            </div>
        ];
    }
}