/**
 * Created by fran on 2/1/18.
 */
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    changeCurrentVocationalEnrollment,
    goToAction,
    partialSaveVocationalPreEnrollment,
    retrieveVocationalPreEnrollment,
    submitVocationalPreEnrollment
} from "../../../redux/actions";
import {Button} from "react-bootstrap";

class VocationalReviewSubmit extends Component {

    constructor(props) {
        super(props);
        this.state = {enrollments: []};
        this.onError = this.onError.bind(this);
        this.load = this.load.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount() {
        this.load();
    }

    load() {
        this.props.retrieveVocationalPreEnrollment(() => {
        }, this.onError);
    }

    //todo: fran centralize this!!!
    onError() {
        alert("Ha occurrido un error");
    }

    getSubmitRequest() {
        let requestId = this.props.requestId;
        let form = this.props.preEnrollment;
        return {requestId: requestId, nextGradeLevel: form.nextGradeLevel};
    }

    onAdd() {
        this.props.changeCurrentVocationalEnrollment(null);
        this.props.goToAction("VOCATIONAL_SCHOOL_SELECTION");
    }

    onEdit = (enrollment) => e => {
        this.props.changeCurrentVocationalEnrollment(enrollment);
        this.props.goToAction("VOCATIONAL_PROGRAMS");
    };

    onDelete = (enrollment) => e => {
        let submitRequest = this.getSubmitRequest();
        submitRequest["schoolIdToDelete"] = enrollment.schoolId;
        this.props.partialSaveVocationalPreEnrollment(submitRequest, this.load, this.onError);
    };

    onPress(onResult, onError) {
        this.props.submitVocationalPreEnrollment(this.getSubmitRequest(), onResult, onError);
    }

    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb30"><h2>Revise su Pre-Matricula <span>Vocacional</span></h2></div>
                </div>
                <div className="body d-flex flex-column justify-content-end">
                    {this.innerRender()}
                    {this.props.footer}
                </div>
            </div>,
            <div className="col-md-4">
                {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
                {this.renderVocationalEnrollments()}

            </div>
        ]
    }

    innerRender() {
        let student = this.props.student;
        let preEnrollment = this.props.preEnrollment;

        return [<div className="row" style={{marginTop: -200}}>
            <div className="col-md-12">
                <blockquote>
                    <p>Estudiante: {student && student.fullName}</p>
                </blockquote>
            </div>
        </div>,
            <div className="row">
                <div className="col-md-12">
                    <blockquote>
                        <p>Proximo Grado será: {preEnrollment.info.nextGradeLevelDescription}</p>
                    </blockquote>
                </div>
            </div>,
            <div className="row" style={{marginBottom: 5}}>
                <div className="col-md-10">
                    <h3 style={{textAlign: "right"}}>Desea añadir otra escuela?</h3>
                </div>
                <div className="col-md-2" style={{marginTop: 20}}>
                    <Button onClick={this.onAdd} bsStyle="primary" block={true}>Añadir</Button>
                </div>
            </div>];
    }

    renderVocationalEnrollments() {
        let vocationalEnrollments = this.props.preEnrollment.info.enrollments;
        return (
            <div>

                {vocationalEnrollments && vocationalEnrollments.length > 0
                    ? vocationalEnrollments.map((enrollment, index) => (
                        <div key={index} className="row">
                            <div className="col-md-12">
                                <div className="float-right">
                                    <Button bsSize="xsmall" onClick={this.onEdit(enrollment)}
                                            style={{marginBottom: 5, marginRight: 5}}>
                                        <i className="fas fa-edit"/>
                                    </Button>
                                    <Button bsSize="xsmall" onClick={this.onDelete(enrollment)}
                                            style={{marginBottom: 5}}>
                                        <i className="fas fa-trash"/>
                                    </Button>
                                </div>
                                <h5>Escuela {enrollment.schoolName}</h5>

                                <div className="row">
                                    <div className="col-md-12">
                                        {this.renderVocationalPrograms(enrollment)}
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
                <th>Programas</th>
            </tr>
            </thead>
            <tbody>
            {programs && programs.length > 0 ? programs.map((prog, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prog.programDescription}</td>
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
        preEnrollment: store.preEnrollment,
        currentVocationalEnrollment: store.preEnrollment.currentVocationalEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({
        partialSaveVocationalPreEnrollment,
        changeCurrentVocationalEnrollment,
        submitVocationalPreEnrollment,
        retrieveVocationalPreEnrollment,
        goToAction
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(VocationalReviewSubmit);

