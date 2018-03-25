/**
 * Created by fran on 1/26/18.
 */

import React, {Component} from "react";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getSchools, loadCodes, partialAlternatePreEnrollmentSave} from "../../../redux/actions";
import AnimationHelper from "../../../AnimationHelper";
import {Button} from "reactstrap";

class PreEnrollmentAlternateSchoolsSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedSchool: null};
        this.regionChanged = this.regionChanged.bind(this);
        this.gradeLevelChanged = this.gradeLevelChanged.bind(this);
        this.schoolChanged = this.schoolChanged.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount() {
        this.props.loadCodes();
    }

    onAdd() {
        let form = this.props.alternateEnrollment;
        let size = this.props.alternateEnrollment.length || 0;
        let object = {priority: size + 1, school: this.state.selectedSchool};
        form.alternateSchools.push(object);
        this.cleanSchoolCode()
    }

    onDelete = (index) => (e) => {
        let form = this.props.alternateEnrollment;
        let schoolDeleted = form.alternateSchools[index];
        form.alternateSchoolsToDelete.push(schoolDeleted);
        form.alternateSchools.splice(index, 1);
        this.forceUpdate();
    };

    onPress(onResult) {
        let form = this.props.alternateEnrollment;
        this.props.partialAlternatePreEnrollmentSave(form, onResult);
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

    render() {
        let student = this.props.student;
        let regions = this.props.regions;
        let gradeLevels = this.props.gradeLevels;
        let schools = this.props.schools;
        let selectedSchool = this.state.selectedSchool;
        let form = this.props.preEnrollment;
        let schoolName = !selectedSchool || selectedSchool.schoolId === -1
            ? "Sin Seleccion"
            : selectedSchool.displayName;

        let schoolAddress = !selectedSchool || selectedSchool.schoolId === -1
            ? "Sin Seleccion"
            : selectedSchool.address.addressFormatted;

        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb30"><h2>Registro de <span>Pre-Matricula</span></h2></div>
                <span className="f20slg"><span className="f20slb">Vamos a crear el registro.</span> Selecciona dos escuelas como alternativas para la matr&iacute;cula del año escolar 2018-2019:</span>
            </div>
            <div className="body d-flex flex-column justify-content-end" style={{marginTop: -150}}>
                <div className="row" style={{margin: 2, marginBottom: 15}}>
                    <div className="col-md-4">
                        <span>Escuela: <h6>{schoolName}</h6></span>
                    </div>
                    <div className="col-md-8">
                        <span>Direcci&oacute;n: <h6>{schoolAddress}</h6></span>
                    </div>
                </div>
                <div className="row mt-2">

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


                    <div className="col-md-7">
                        <RemoteCodeSelect id="schools"
                                          label="Escuela a matricular"
                                          placeholder="Seleccione escuela"
                                          codes={schools}
                                          onObjectChange={this.schoolChanged}
                                          target="schoolId"
                                          display="displayName"
                                          value={form.schoolId}/>
                    </div>
                    <div className="col-md-1">
                        <Button color="primary" onClick={this.onAdd}><i className="fa fa-plus"/></Button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        {this.renderSchoolsSelected()}
                    </div>
                </div>
            </div>
            <div style={{marginTop: -120}}>
                {this.props.footer}
            </div>
        </div>, <div className="col-md-4 illustration-section d-flex align-items-center text-center">
            {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
            <AnimationHelper type="blackboard"/>
        </div>];
    }

    renderSchoolsSelected() {
        let alternateSchools = this.props.alternateEnrollment.alternateSchools;
        return (
            <table className="table table-striped table-hover ">
                <thead>
                <tr>
                    <th>Prioridad</th>
                    <th>Escuela</th>
                    <th>Direccion</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {alternateSchools && alternateSchools.length > 0
                    ? alternateSchools.map((school, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{school.school.schoolName}</td>
                            <td>{school.school.address.addressFormatted}</td>
                            <td>
                                <Button size="sm" color="danger" onClick={this.onDelete(index)}>
                                    <i className="fas fa-trash"/>
                                </Button>
                            </td>
                        </tr>
                    ))
                    : <tr><td colSpan={3} style={{left: 50, top: 50}}>No posee ningun programa aun</td></tr>}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(store) {
    return {
        student: store.studentInfo.student,
        regions: store.config.regions,
        gradeLevels: store.config.gradeLevels,
        schools: store.config.schools,
        preEnrollment: store.preEnrollment.info,
        alternateEnrollment: store.preEnrollment.alternateSchoolEnrollment
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadCodes, getSchools, partialAlternatePreEnrollmentSave}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PreEnrollmentAlternateSchoolsSelection);
