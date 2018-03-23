/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getVocationalSchools, loadVocationalCodes, partialSaveVocationalPreEnrollment} from "../../../redux/actions";
import entrollmentIllustration from "../../../style/img/entrollment-illustration.png";
import AnimationHelper from "../../../AnimationHelper";

class VocationalPreEnrollment extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedSchool: null};
        this.regionChanged = this.regionChanged.bind(this);
        this.gradeLevelChanged = this.gradeLevelChanged.bind(this);
        this.schoolChanged = this.schoolChanged.bind(this);
    }

    componentWillMount() {
        this.props.loadVocationalCodes();
    }

    onPress(onResult, onError) {
        let form = this.props.currentVocationalEnrollment;
        this.props.partialSaveVocationalPreEnrollment(form, onResult, onError);
    }

    cleanSchoolCode() {
        let form = this.props.currentVocationalEnrollment;
        form.schoolId = -1;
        this.setState({selectedSchool: null});
    }

    regionChanged(e) {
        this.cleanSchoolCode();
        let form = this.props.currentVocationalEnrollment;
        let element = e.target;
        form.regionId = element.value;
        if (form.nextGradeLevel !== "-1" && form.nextGradeLevel) {
            this.props.getVocationalSchools(form.regionId, form.nextGradeLevel);
        }
    }

    gradeLevelChanged(gradeLevelObject) {
        this.cleanSchoolCode();
        let form = this.props.currentVocationalEnrollment;
        form.nextGradeLevel = gradeLevelObject.name;
        if (form.regionId !== "-1" && form.regionId) {
            form.nextGradeLevelDescription = gradeLevelObject.displayName;
            this.props.getVocationalSchools(form.regionId, form.nextGradeLevel);
        }
    }

    schoolChanged(schoolObject) {
        let form = this.props.currentVocationalEnrollment;
        form.schoolId = schoolObject.schoolId;
        if (form.schoolId !== "-1" && form.schoolId) {
            form.schoolName = schoolObject.schoolName;
            form.schoolAddress = schoolObject.address;
        }
        form.school = schoolObject;
        // form.schoolName = schoolObject.schoolName;
        // form.schoolAddress = schoolObject.address;

        this.setState({selectedSchool: schoolObject});
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
                    <div className="description mb30"><h2><span>Registro de</span> Pre-Matricula Vocacional </h2></div>
                    <span className="f20slg"><span className="f20slb">Vamos a crear una nueva pre-matricula.</span> Por favor seleccione region, grado y escuela:</span>
                </div>
                <div className="body" style={{marginTop: -100, padding: 20}}>
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
                                                  placeholder="Seleccione Grado"
                                                  onObjectChange={this.gradeLevelChanged}
                                                  codes={gradeLevels}
                                                  target="name"
                                                  display="displayName"
                                                  value={form.nextGradeLevel}/>
                            </div>

                            <div className="col-md-2">
                                <RemoteCodeSelect id="region"
                                                  label="Region"
                                                  placeholder="Seleccione Region"
                                                  onChange={this.regionChanged}
                                                  codes={regions}
                                                  target="regionId"
                                                  display="description"
                                                  value={form.regionId}/>
                            </div>


                            <div className="col-md-8">
                                <RemoteCodeSelect id="schools"
                                                  label="Escuela a matricular"
                                                  placeholder="Seleccione escuela"
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


function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        //this is manage by redux logic
        regions: store.config.regions,
        gradeLevels: store.config.gradeLevels,
        schools: store.config.schools,
        preEnrollment: store.preEnrollment.info,
        currentVocationalEnrollment: store.preEnrollment.currentVocationalEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadVocationalCodes, getVocationalSchools, partialSaveVocationalPreEnrollment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(VocationalPreEnrollment);
