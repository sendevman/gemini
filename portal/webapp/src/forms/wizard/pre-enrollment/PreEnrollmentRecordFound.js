import React, {Component} from "react";
import leisureIllustration from "../../../style/img/leisure-illustration.png";
import {connect} from "react-redux";

class PreEnrollmentRecordFound extends Component{

    constructor(props){
        super(props);
    }


    render() {
        let student = this.props.student;
        let preEnrollment = this.props.preEnrollment;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2 className="f90sbg">06.</h2>
                    <div className="violet-line"></div>
                </div>
                <p className="f30sbg"><span className="f30sbb">El estudiante {student.fullName}</span> actualmente tiene un registro de Pre-Matricula Pre-enrollment en:</p>
                <p className="f22slg mb-1"><i className="fas fa-university mr5"></i> <span
                    id="school">School Name</span>{preEnrollment.schoolName}</p>
                <p className="f22slg mb-1"><i className="icon-teacher mr5"></i> <span id="level">Grado</span>{preEnrollment.nextGradeLevelDescription}</p>
                {/*<p className="f22slg mb-1"><i className="icon-gps mr5"></i> <span id="adress">Direccion escuela</span></p>*/}
                <p className="f30sbg mt30">Habrá algun cambio para esta Pre-Matricula?</p>
            </div>
            {this.props.footer}
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={leisureIllustration} alt=""/></div>
            </div>];
    }

}

function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        preEnrollment: store.preEnrollment.info
    };
}


export default connect(mapStateToProps)(PreEnrollmentRecordFound);
