import React, {Component} from "react";
import AnimationHelper from "../../../components/AnimationHelper";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";

export default class PreEnrollmentTechnicalSchoolsSelection extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let student = this.props.student;
        let regions = this.props.regions;
        let gradeLevels = this.props.gradeLevels;
        let schools = this.props.schools;

        let selectedSchool = this.state.selectedSchool;
        let form = this.props.currentVocationalEnrollment;

        let schoolName = !selectedSchool || selectedSchool.schoolId === -1
            ? "No ha selecionado escuela aun"
            : selectedSchool.displayName;

        let schoolAddress = !selectedSchool || selectedSchool.schoolId === -1
            ? "No ha selecionado escuela aun"
            : selectedSchool.address.addressFormatted;

        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb30"><h2><span>Registro de</span> Pre-Matricula Institutos </h2></div>
                    <span className="f20slg"><span className="f20slb">Vamos a crear una nueva pre-matricula.</span> Por favor seleccione region, grado y escuela:</span>
                </div>
                <div className="body d-flex flex-column justify-content-end">
                    <form id="enrollment-form" className="mt50">
                        <div className="row" style={{margin: 2, marginBottom: 15}}>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span>Estudiante: <h6>{student && student.fullName}</h6></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span>Direcci&oacute;n Escuela: <h6>{schoolAddress}</h6></span>
                                    </div>

                                </div>
                                <div className="row"/>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-2">
                                <RemoteCodeSelect id="gradeLevel"
                                                  label="Grado"
                                                  placeholder="Grado"
                                                  onObjectChange={this.gradeLevelChanged}
                                                  codes={gradeLevels}
                                                  target="name"
                                                  display="displayName"
                                                  value={form.nextGradeLevel}/>
                            </div>

                            <div className="col-md-2">
                                <RemoteCodeSelect id="region"
                                                  label="Region"
                                                  placeholder="Region"
                                                  onChange={this.regionChanged}
                                                  codes={regions}
                                                  target="regionId"
                                                  display="description"
                                                  value={form.regionId}/>
                            </div>


                            <div className="col-md-8">
                                <RemoteCodeSelect id="schools"
                                                  label="Escuela a matricular"
                                                  placeholder="Escuela"
                                                  codes={schools}
                                                  onObjectChange={this.schoolChanged}
                                                  target="schoolId"
                                                  display="displayName"
                                                  value={form.schoolId}/>
                            </div>
                        </div>
                        {this.props.footer}
                    </form>
                </div>
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
                <AnimationHelper type="blackboard"/>
            </div>
        ];
    }
}