import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import AnimationHelper from "../../../AnimationHelper";


export default class IsStudentCurrentlyEnrolled extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">02.</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f40sbg">Tienes, actualmente, <span className="f40sbb">un niño/a matriculado </span>en
                    alguna escuela del Departamento de Educación de Puerto Rico?</p>
            </div>
            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }
}