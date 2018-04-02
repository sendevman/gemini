import React, {Component} from "react";
import leisureIllustration from "../../../assets/img/leisure-illustration.png";
import AnimationHelper from "../../../components/AnimationHelper";

export default class DEProgramQuestion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">01.</h2>
                        <div className="violet-line"/>
                    </div>
                    <p className="f40sbg text-justify">¿Favor de seleccionar el programa en el cual vas a solicitar matr&iacute;cula: <span className="f40sbb">Regular, Ocupacional, Institutos y Especializadas</span>?</p>
                </div>

                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>
        ];
    }
}