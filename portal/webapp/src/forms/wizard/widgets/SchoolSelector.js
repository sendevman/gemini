import React, {Component} from "react";
import RemoteCodeSelect from "../../../components/RemoteCodeSelect";
import Button from "../../../components/Button";

export default class SchoolSelector extends Component {

    constructor(props) {
        super(props);
        this.regionChanged = props.regionChanged.bind(this);
        this.gradeLevelChanged = props.gradeLevelChanged.bind(this);
        this.schoolChanged = props.schoolChanged.bind(this);
        this.onAdd = props.onAdd.bind(this);
    }

    limit(){
        let schoolsSelected = this.props.schoolsSelected;
        return this.props.maxSchools ? schoolsSelected.length >= this.props.maxSchools : false;
    }

    onDelete = (index) => (e) => {
        let form = this.props.form;
        let schoolDeleted = form.alternateSchools[index];
        form.alternateSchoolsToDelete.push(schoolDeleted);
        form.alternateSchools.splice(index, 1);
        this.forceUpdate();
    };

    render() {
        let form = this.props.form;
        let limit = this.limit();
        let schoolsSelected = this.props.schoolsSelected;
        let gradeLevels = this.props.gradeLevels;
        let regions = this.props.regions;
        let schools = this.props.schools;

        let selectedSchool = this.props.selectedSchool;
        let schoolName = !selectedSchool || selectedSchool.schoolId === -1
            ? "Sin Selección"
            : selectedSchool.displayName;

        let schoolAddress = !selectedSchool || selectedSchool.schoolId === -1
            ? "Sin Selección"
            : selectedSchool.address.addressFormatted;

        let disabledGradeLevels = (schoolsSelected.length > 0) || form.nextGradeLevel;

        return [
            <div className="row" style={{margin: 2, marginBottom: 15}}>
                <div className="col-md-4">
                    <span>Escuela: <h6>{schoolName}</h6></span>
                </div>
                <div className="col-md-8">
                    <span>Direcci&oacute;n: <h6>{schoolAddress}</h6></span>
                </div>
            </div>,
            <div className="row mt-2">
                <div className="col-md-2">
                    <RemoteCodeSelect id="gradeLevel"
                                      label="Grado"
                                      placeholder="Grado"
                                      onObjectChange={this.gradeLevelChanged}
                                      codes={gradeLevels}
                                      target="name"
                                      display="displayName"
                                      disabled={disabledGradeLevels}
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
                                      disabled={limit}
                                      value={form.regionId}/>
                </div>
                <div className="col-md-7">
                    <RemoteCodeSelect id="schools"
                                      label="Escuela a matricular"
                                      placeholder="Escuela"
                                      codes={schools}
                                      onObjectChange={this.schoolChanged}
                                      target="schoolId"
                                      display="displayName"
                                      disabled={limit}
                                      value={form.schoolId}/>
                </div>
                <div className="col-md-1">
                    <Button color="primary" onClick={this.onAdd} disabled={limit}><i
                        className="fa fa-plus"/></Button>
                </div>
            </div>,
            <div className="row mt-3">
                <div className="col-md-12">
                    {this.renderSchoolsSelected()}
                </div>
            </div>
        ];
    }

    renderSchoolsSelected() {
        let specializedSchool = this.props.specializedSchool;
        let alternateSchools = this.props.form.alternateSchools;
        return (
            <table className="table table-striped table-hover ">
                <thead>
                <tr>
                    <th>Prioridad</th>
                    {specializedSchool ? <th>Tipo</th> : (null)}
                    <th>Escuela</th>
                    <th>Direccion</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {alternateSchools && alternateSchools.length > 0
                    ? alternateSchools.map((school, index) => (
                        <tr key={index}>
                            <td>{school.priority}</td>
                            {specializedSchool ? (<td>{school.specializedCategory}</td>) : (null)}
                            <td>{school.schoolName}</td>
                            <td>{school.schoolAddress.addressFormatted}</td>
                            <td>
                                <Button size="sm" color="danger" onClick={this.onDelete(index)}>
                                    <i className="fas fa-trash"/>
                                </Button>
                            </td>
                        </tr>
                    ))
                    : <tr>
                        <td colSpan={3} style={{left: 50, top: 50}}>No posee ningun programa aun</td>
                    </tr>}
                </tbody>
            </table>
        );
    }
}