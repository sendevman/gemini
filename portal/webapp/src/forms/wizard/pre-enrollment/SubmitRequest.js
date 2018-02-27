/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {submitPreEnrollment} from "../../../redux/actions";

class SubmitRequest extends Component {

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
}

function mapStateToProps(store) {
    return {
        requestId: store.studentInfo.requestId,
        student: store.studentInfo.student,
        preEnrollment: store.studentInfo.preEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({submitPreEnrollment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(SubmitRequest);

