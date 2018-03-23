import React, {Component} from "react";
import {connect} from "react-redux";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import {bindActionCreators} from "redux";
import {submitPreEnrollment} from "../../../redux/actions";
import AnimationHelper from "../../../AnimationHelper";


class PreEnrollmentRecordFound extends Component {

    constructor(props) {
        super(props);
    }

    onPress(onResult, onError) {
        let requestId = this.props.requestId;
        let form = this.props.preEnrollment;
        let submitRequest = {requestId: requestId, schoolId: form.schoolId, nextGradeLevel: form.nextGradeLevel};
        this.props.submitPreEnrollment(submitRequest, onResult, onError);
    }

    render() {
        let student = this.props.student;
        let preEnrollment = this.props.preEnrollment;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">06.</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f20sbg">El estudiante <span className="f20sbb">{student.fullName}</span>, se le desea
                    crear un registro de Pre-Matricula en las siguientes alternativas:</p>
                <p className="f22slg mb-1"><i className="fas fa-university mr5"></i> <span
                    id="school">{preEnrollment.schoolName}</span></p>
                <p className="f22slg mb-1"><i className="icon-teacher mr5"></i> <span
                    id="level">{preEnrollment.nextGradeLevelDescription}</span></p>
                <p className="f22slg mb-1"><i className="icon-gps mr5"></i> <span
                    id="adress">{preEnrollment.schoolAddress.addressFormatted}</span></p>
                <p className="f30sbg mt30">Habrá algun cambio para esta Pre-Matricula?</p>
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
        requestId: store.preEnrollment.requestId,
        student: store.studentInfo.student,
        preEnrollment: store.preEnrollment.info
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({submitPreEnrollment}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PreEnrollmentRecordFound);
