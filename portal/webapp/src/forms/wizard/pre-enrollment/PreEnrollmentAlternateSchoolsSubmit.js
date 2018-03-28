import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {submitAlternatePreEnrollment} from "../../../redux/actions";
import AnimationHelper from "../../../components/AnimationHelper";


class PreEnrollmentAlternateSchoolsSubmit extends Component {

    constructor(props) {
        super(props);
    }

    onPress(onResult, onError) {
        let requestId = this.props.requestId;
        let form = this.props.preEnrollment;
        let submitRequest = {requestId: requestId, schoolId: form.schoolId, nextGradeLevel: form.nextGradeLevel};
        this.props.submitAlternatePreEnrollment(submitRequest, onResult, onError);
    }

    render() {
        let student = this.props.student;
        let alternateSchools = this.props.alternatePreEnrollment.alternateSchools;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">06.</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f20sbg">El estudiante <span className="f20sbb">{student.fullName}</span>, se le desea
                    crear un registro de Pre-Matricula en las siguientes alternativas:</p>

                <div className="row">

                    {alternateSchools && alternateSchools.length > 0
                        ? alternateSchools.map((school, index) => (
                            this.renderAlternateSchool(school)
                        ))
                        : (<span className="f20sbb">Debe seleccionar dos esculas alternativas!!!</span>)}

                </div>

                <p className="f30sbg mt40">Habrá algun cambio para esta Pre-Matricula?</p>
            </div>
            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="blackboard"/>
            </div>];
    }

    renderAlternateSchool(altSchool) {
        let nextGradeLevelDescription = this.props.preEnrollment.nextGradeLevelDescription;
        return [
            <div className="col-md-1">
                <span className="f20sbb">{altSchool.priority}.</span>
            </div>,
            <div className="col-md-5">
            <p className="f22slg mb-1"><i className="fas fa-university mr5"></i> <span
                id="school">{altSchool.schoolName}</span></p>
            <p className="f22slg mb-1"><i className="icon-teacher mr5"></i> <span
                id="level">{nextGradeLevelDescription}</span></p>
            <div className="row">
                <div className="col-md-1">
                    <i className="icon-gps mr5"/>
                </div>
                <div className="col-md-9">
                    <p className="f22slg mb-1">
                        <span id="adress">{altSchool.schoolAddress.addressFormatted}</span>
                    </p>
                </div>
            </div>

        </div>];
    }

}

function mapStateToProps(store) {
    return {
        requestId: store.preEnrollment.requestId,
        student: store.studentInfo.student,
        preEnrollment: store.preEnrollment.info,
        alternatePreEnrollment: store.preEnrollment.alternateSchoolEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({submitAlternatePreEnrollment}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PreEnrollmentAlternateSchoolsSubmit);
