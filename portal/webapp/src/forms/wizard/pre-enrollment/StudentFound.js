import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import AnimationHelper from "../../../AnimationHelper";

export default class StudentFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">05.</h2>
                        <div className="violet-line"></div>
                    </div>
                    <p className="f45sbg">¡Muy bien! El/la estudiante ha sido encontrado. <span className="f45sbb"
                                                                                                id="name">{this.props.studentName}</span>
                    </p>
                </div>
                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }
}