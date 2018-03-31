import React, {Component} from "react";
import AnimationHelper from "../../../components/AnimationHelper";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {saveNeedTransportationService} from "../../../redux/actions";

class NeedTransportationServiceQuestion extends Component {

    constructor(props) {
        super(props);
    }

    onPress(onResult, onError) {
        this.save(true, onResult, onError);
    }

    onBack(onResult, onError) {
        this.save(false, onResult, onError);
    }

    save(answer, onResult, onError) {
        this.props.saveNeedTransportationService(answer, onResult, onError);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb40"><h2 className="f90sbg">08.</h2>
                        <div className="violet-line"/>
                    </div>
                    <p className="f30sbg text-justify">¿Gracias por validar la dirección física. Esto nos ayudará a
                        identificar si cualifica el estudiante para el servicio de transportación <span
                            className="f30sbb">¿Deseas solicitar servicio de transportación para este estudiante? </span>
                    </p>
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

function mapDispatchToActions(dispatch) {
    return bindActionCreators({saveNeedTransportationService}, dispatch)
}

export default connect(null, mapDispatchToActions, null, {withRef: true})(NeedTransportationServiceQuestion);