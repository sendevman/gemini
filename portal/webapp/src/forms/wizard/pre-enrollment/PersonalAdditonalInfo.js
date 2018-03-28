import React, {Component} from "react";
import CodeSelect from "../../../components/CodeSelect";
import AnimationHelper from "../../../components/AnimationHelper";
import Button from "../../../components/Button";

export default class PersonalAdditonalInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let student = {};
        let studentExists = false;//this.props.found;
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description"><h2 className="f90sbg">OK.</h2>
                    <div className="violet-line"></div>
                </div>
                <span className="f30slg">Por favor ingrese los siguientes<span
                    className="f30slb"> Datos Demogr&aacute;ficos</span> del estudiante en el sistema</span>
            </div>
            <div className="body d-flex flex-column">
                <div className="row " style={{marginTop: -120}}>
                    <div className="col-md-6 ">
                        <CodeSelect id="gender"
                                    label="Cuidadania"
                                    codeType="residentialStatus"
                                    value={student.gender}
                                    required
                                    onChange={this.inputHandler}
                                    placeholder=""
                                    disabled={studentExists}
                        />
                    </div>
                    <div className="col-md-6">
                        <CodeSelect id="language"
                                    label="Idioma"
                                    codeType="languageCodes"
                                    value={student.gender}
                                    required
                                    onChange={this.inputHandler}
                                    placeholder=""
                                    disabled={studentExists}
                        />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-10">
                        <CodeSelect id="ethnicCodes"
                                    label="Seleccione las categorias de raza del estudiante"
                                    codeType="ethnicCodes"
                                    value={student.gender}
                                    required
                                    onChange={this.inputHandler}
                                    placeholder=""
                                    disabled={studentExists}
                        />
                    </div>
                    <div className="col-md-2">
                        <Button color="primary" size="small"><i className="fa fa-plus"/></Button>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-12">
                        {this.renderEthnicCodesSelected()}
                    </div>
                </div>
                <div style={{marginTop: -20}}>
                    {this.props.footer}
                </div>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={entrollmentIllustration} alt=""/></div>*/}
                <AnimationHelper type="blackboard"/>
            </div>];
    }

    renderEthnicCodesSelected() {
        let alternateSchools = [];//this.props.alternateEnrollment.alternateSchools;
        return (
            <table className="table table-striped table-hover ">
                <thead>
                <tr>
                    <th>Raza</th>
                </tr>
                </thead>
                <tbody>
                {alternateSchools && alternateSchools.length > 0
                    ? alternateSchools.map((school, index) => (
                        <tr key={index}>
                            <td>{school.priority}</td>
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
                        <td style={{left: 50, top: 50}}>No posee ninguna raza aun</td>
                    </tr>}
                </tbody>
            </table>
        );
    }

}