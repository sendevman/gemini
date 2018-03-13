/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    partialSaveVocationalPreEnrollment,
    retrieveVocationalPreEnrollment,
    submitVocationalPreEnrollment
} from "../../../redux/actions";
import {Button, Glyphicon} from "react-bootstrap";

class VocationalReviewSubmit extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.retrieveVocationalPreEnrollment(()=>{}, ()=>{});
    }

    getSubmitRequest() {
        let requestId = this.props.requestId;
        let form = this.props.preEnrollment;
        return {requestId: requestId, nextGradeLevel: form.nextGradeLevel};
    }

    onDelete = (program) => e => {
        let submitRequest = this.getSubmitRequest();
        submitRequest["programsToDelete"] = [program];
        this.props.partialSaveVocationalPreEnrollment(submitRequest);
    };

    onPress(onResult, onError) {

        this.props.submitVocationalPreEnrollment(this.getSubmitRequest(), onResult, onError);
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
                            <p>Proximo Grado será: {preEnrollment.info.nextGradeLevelDescription}</p>
                        </blockquote>
                    </div>
                </div>
                <div className="row">
                    {this.renderVocationalEnrollments()}
                </div>

            </div>);
    }

    renderVocationalEnrollments() {
        let vocationalEnrollments = this.props.preEnrollment.info.enrollments;
        return (
            <div>

                {vocationalEnrollments && vocationalEnrollments.length > 0
                    ? vocationalEnrollments.map((enrollment, index) => (
                        <div key={index} className="row">
                            <div className="col-md-12">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Escuela {enrollment.schoolName}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Direccion de la
                                                    escuela: {enrollment.schoolAddress.addressFormatted}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                {this.renderVocationalPrograms(enrollment)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : (null)}

            </div>
        );
    }

    renderVocationalPrograms(enrollment) {
        let programs = enrollment.programs;
        return ((<table className="table table-striped table-hover ">
            <thead>
            <tr>
                <th>#</th>
                <th>Programa</th>
                <th>Borrar</th>
            </tr>
            </thead>
            <tbody>
            {programs && programs.length > 0 ? programs.map((prog, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prog.programDescription}</td>
                        <td>
                            <Button bsSize="xsmall" bsStyle="danger" onClick={this.onDelete(prog)}>
                                <Glyphicon glyph="glyphicon glyphicon-trash"/>
                            </Button>
                        </td>
                    </tr>
                ))
                : <div><label>No posee ningun programa aun</label></div>}
            </tbody>
        </table>));
    }
}

function mapStateToProps(store) {
    return {
        requestId: store.preEnrollment.requestId,
        student: store.studentInfo.student,
        preEnrollment: store.preEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({
        partialSaveVocationalPreEnrollment,
        submitVocationalPreEnrollment,
        retrieveVocationalPreEnrollment
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(VocationalReviewSubmit);

