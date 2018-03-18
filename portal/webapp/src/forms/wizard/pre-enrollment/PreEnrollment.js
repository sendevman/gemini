/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getSchools, loadCodes} from "../../../redux/actions";
import entrollmentIllustration from "../../../style/img/entrollment-illustration.png";

class PreEnrollment extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedSchool: null};
        this.regionChanged = this.regionChanged.bind(this);
        this.gradeLevelChanged = this.gradeLevelChanged.bind(this);
        this.schoolChanged = this.schoolChanged.bind(this);
    }

    componentWillMount() {
        this.props.loadCodes();
    }

    onPress(onResult) {
        onResult();
    }

    cleanSchoolCode() {
        let form = this.props.preEnrollment;
        form.schoolId = -1;
        this.setState({selectedSchool: null});
    }

    regionChanged(e) {
        this.cleanSchoolCode();
        let form = this.props.preEnrollment;
        let element = e.target;
        form.regionId = element.value;
        if (form.nextGradeLevel !== "-1") {
            this.props.getSchools(form.regionId, form.nextGradeLevel);
        }
    }

    gradeLevelChanged(gradeLevelObject) {
        this.cleanSchoolCode();
        let form = this.props.preEnrollment;
        form.nextGradeLevel = gradeLevelObject.name;
        if (form.regionId !== "-1") {
            form.nextGradeLevelDescription = gradeLevelObject.displayName;
            this.props.getSchools(form.regionId, form.nextGradeLevel);
        }
    }

    schoolChanged(schoolObject) {
        let form = this.props.preEnrollment;
        form.schoolId = schoolObject.schoolId;
        if (form.schoolId !== "-1") {
            form.schoolName = schoolObject.schoolName;
            form.schoolAddress = schoolObject.address;
        }
        this.setState({selectedSchool: schoolObject});
    }

    renderUI() {
        return [
            <div className="col-md-7 content-section">
                <div className="title">
                    <div className="description mb30"><h2>Pre-Enrollment <span>Record</span></h2></div>
                    <span className="f20slg"><span className="f20slb">Let’s create a new pre-enrollment record.</span> Please select the Region, Grade Level and School that your child will be attending:</span>
                </div>
                <div className="body d-flex align-items-center flex-column justify-content-end">
                    <form id="enrollment-form" action="preenrollment" method="POST" className="mt50">
                        <div className="row plr15">
                            <div className="group form-group has-feedback col-md-6 pl-0 pr50">
                                <input className="inputMaterial" type="text" name="region" required/>
                                <i className="n icon-gps fs26"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Region Example</label>
                            </div>
                            <div className="group form-group has-feedback col-md-6 pl50 pr-0 numeric">
                                <input className="inputMaterial" type="text" name="level" required/>
                                <i className="n icon-teacher fs26"></i>
                                <i className="icon-top"></i>
                                <i className="icon-down"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Grade Level</label>
                            </div>
                            <div className="group form-group has-feedback col-md-6 pl-0 pr50">
                                <input className="inputMaterial" type="text" name="school" required/>
                                <i className="n fas fa-university fs26"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>School Name</label>
                            </div>
                            <div className="group form-group has-feedback col-md-6 pl50 pr-0">
                                <input className="inputMaterial" type="text" name="adress" required/>
                                <i className="n fas fa-map-marker-alt fs26"></i>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>School Adress</label>
                            </div>
                        </div>
                        <div className="row mt50 bt1p pt40">
                            <div className="col-md-12">
                                <button className="button-green mr30 mob-mb30px" type="submit"><span>s</span>Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={entrollmentIllustration} alt=""/></div>
            </div>
        ]
    }

    render() {
        let student = this.props.student;
        let regions = this.props.regions;
        let gradeLevels = this.props.gradeLevels;
        let schools = this.props.schools;
        let selectedSchool = this.state.selectedSchool;
        let form = this.props.preEnrollment;
        let schoolName = !selectedSchool || selectedSchool.schoolId === -1
            ? "No ha selecionado escuela aun"
            : selectedSchool.displayName;

        let schoolAddress = !selectedSchool || selectedSchool.schoolId === -1
            ? "No ha selecionado escuela aun"
            : selectedSchool.address.addressFormatted;

        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb30"><h2>Pre-Enrollment <span>Record</span></h2></div>
                <span className="f20slg"><span className="f20slb">Let’s create a new pre-enrollment record.</span> Please select the Region, Grade Level and School that your child will be attending:</span>
            </div>
            <div className="row" style={{margin: 2, marginBottom: 15}}>
                <div className="col-md-4">
                    <div className="row">
                        <p>Estudiante: </p>
                    </div>
                    <div className="row">
                        <h5>{student && student.fullName}</h5>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <p>Escuela: <span className="text-primary">{schoolName}</span></p>
                    </div>
                    <div className="row">
                        <p>Direcci&oacute;n: <span className="text-primary">{schoolAddress}</span></p>
                    </div>

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
        </div>, <div className="col-md-4 illustration-section d-flex align-items-center text-center">
            <div className="illustration"><img src={entrollmentIllustration} alt=""/></div>
        </div>];
    }
}


function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        regions: store.config.regions,
        gradeLevels: store.config.gradeLevels,
        schools: store.config.schools,
        preEnrollment: store.preEnrollment.info
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadCodes, getSchools}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PreEnrollment);
