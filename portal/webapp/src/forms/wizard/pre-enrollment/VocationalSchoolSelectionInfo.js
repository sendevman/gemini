import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import AnimationHelper from "../../../components/AnimationHelper";

export default class VocationalSchoolSelectionInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let vocationalSchool = this.props.vocationalSchool;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2>Gracias!</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f40sllg">
                    Ahora por favor seleccione los programas a los cuales desea aplicar en la
                    escuela <span className="f40sbgr">{vocationalSchool && vocationalSchool.schoolName}.</span>
                </p>
            </div>
            <div className="body">
                {this.props.footer}
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }
}