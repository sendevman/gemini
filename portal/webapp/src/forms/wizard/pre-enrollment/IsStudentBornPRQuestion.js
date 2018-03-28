import React, {Component} from "react";
import AnimationHelper from "../../../components/AnimationHelper";

export default class IsStudentBornPRQuestion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">07.</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f60sbg">El Estudiante es <span
                    className="f60sbb"> puertorrique&nacute;o?</span></p>
            </div>
            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }
}


