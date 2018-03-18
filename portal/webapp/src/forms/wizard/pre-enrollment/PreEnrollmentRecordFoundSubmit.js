/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {submitPreEnrollment} from "../../../redux/actions";
import leisureIllustration from "../../../style/img/leisure-illustration.png";

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
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Estudiante: {student && student.fullName}</p>
                        </blockquote>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Sera pre-matriculado en la escuela: {preEnrollment.schoolName}</p>
                        </blockquote>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Direccion de la escuela: {preEnrollment.schoolAddress.addressFormatted}</p>
                        </blockquote>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <blockquote>
                            <p>Proximo Grado será: {preEnrollment.nextGradeLevelDescription}</p>
                        </blockquote>
                    </div>
                </div>
            </div>);
    }


    renderUI() {
        let student = this.props.student;
        let preEnrollment = this.props.preEnrollment;

        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">06.</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f30sbg">
                    Su hijo/a tiene un expediente de matr&iacute;cula para el pr&oacute;ximo año escolar <span
                    className="f30sbb">(2018-2019)</span>:
                </p>
                <p className="f22slg mb-1"><i className="fas fa-university mr5"></i> <span
                    id="school">{preEnrollment.schoolName}</span></p>
                <p className="f22slg mb-1"><i className="icon-teacher mr5"></i> <span id="level">{preEnrollment.nextGradeLevelDescription}</span></p>
                <p className="f22slg mb-1"><i className="icon-gps mr5"></i> <span id="adress">{preEnrollment.schoolAddress.addressFormatted}</span></p>
                <p className="f30sbg mt30">¿Permanecer&aacute; el estudiante en la misma escuela?</p>
            </div>
            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={leisureIllustration} alt=""/></div>
            </div>]
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

