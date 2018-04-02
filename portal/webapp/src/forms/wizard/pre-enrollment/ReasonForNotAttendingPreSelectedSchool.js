import React, {Component} from "react";
import AnimationHelper from "../../../components/AnimationHelper";
import {getReasonForAttendingCodes, saveReasonForNotAttendingSchool} from "../../../redux/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";
import * as UIHelper from "../../../UIHelper";

class ReasonForNotAttendingPreSelectedSchool extends Component {

    constructor(props) {
        super(props);
        this.state = {reasonSelected: null};
        this.reasonChanged = this.reasonChanged.bind(this);
    }

    componentWillMount(){
        this.props.getReasonForAttendingCodes();
    }

    reasonChanged(reasonObj){
        this.setState({reasonSelected: reasonObj.name})
    }

    onPress(onResult, onError) {
        this.props.saveReasonForNotAttendingSchool(this.state.reasonSelected, onResult, onError);

    }

    render() {
        let reasons = this.props.reasons;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">09.</h2>
                    <div className="violet-line"/>
                </div>
                <p className="f30sbg text-justify">¿Seleccione la raz&oacute;n por la cual no esta matriculando su hijo
                    en la escuela provista?
                </p>
                <RemoteCodeSelect id="reasons"
                                  placeholder="Escoja Razón"
                                  codes={reasons}
                                  target="name"
                                  display="description"
                                  onObjectChange={this.reasonChanged}
                                  value={this.state.reasonSelected}
                />
            </div>

            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }
}

function mapStateToProps(store) {
    return {
        reasons: store.config.reasonsForNotAttending,
    };
}


function mapDispatchToActions(dispatch) {
    return bindActionCreators({getReasonForAttendingCodes, saveReasonForNotAttendingSchool}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(ReasonForNotAttendingPreSelectedSchool);