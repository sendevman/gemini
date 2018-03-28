import React, {Component} from "react";
import CodeSelect from "../../../components/CodeSelect";
import AnimationHelper from "../../../components/AnimationHelper";
import Button from "../../../components/Button";
import {loadDemographics, saveDemographics} from "../../../redux/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class PersonalAdditionalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedCode: null};
        this.addEthnicCode = this.addEthnicCode.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    inputHandler(e) {
        let form = this.props.form;
        let element = e.target;
        form[element.id] = element.value;
    }


    onPress(onResult, onError) {
        let form = this.props.form;
        this.props.saveDemographics(form, onResult, onError);
    }

    addEthnicCode() {
        let form = this.props.form;
        let size = form.ethnicCodes.length || 0;
        let ethnicCode = this.refs.ethnicCodes.getRawObject();
        if (size < 5) {
            let object = {
                value: ethnicCode.value,
                description: ethnicCode.description
            };
            form.ethnicCodes.push(object);
            this.cleanEthnicCode()
        } else {
            alert("Ya ha alcanzado el maximo de codigos permitidos")
        }
    }

    deleteEthnicCode = (index) => (e) => {
        let form = this.props.form;
        let ethnicCodeDeleted = form.ethnicCodes[index];
        form.ethnicCodesToDelete.push(ethnicCodeDeleted);
        form.ethnicCodes.splice(index, 1);
        this.forceUpdate();
    };

    cleanEthnicCode() {
        this.setState({selectedCode: null});
    }

    render() {
        let form = this.props.form;
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
                        <CodeSelect id="citizenship"
                                    label="Cuidadania"
                                    codeType="residentialStatus"
                                    value={form.citizenship}
                                    required
                                    onChange={this.inputHandler}
                                    placeholder=""
                        />
                    </div>
                    <div className="col-md-6">
                        <CodeSelect id="language"
                                    label="Idioma"
                                    codeType="languageCodes"
                                    value={form.language}
                                    required
                                    onChange={this.inputHandler}
                                    placeholder=""
                        />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-10">
                        <CodeSelect id="ethnicCodes"
                                    ref="ethnicCodes"
                                    label="Códigos Ethnicos"
                                    codeType="ethnicCodes"
                                    required
                                    value={this.state.selectedCode}
                                    placeholder=""
                        />
                    </div>
                    <div className="col-md-2">
                        <Button color="primary" size="small" onClick={this.addEthnicCode}><i
                            className="fa fa-plus"/></Button>
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
        let form = this.props.form;
        let ethnicCodes = form.ethnicCodes;
        return (
            <table className="table table-striped table-hover ">
                <thead>
                <tr>
                    <th>Índice</th>
                    <th>Raza</th>
                    <th>Acci&oacute;n</th>
                </tr>
                </thead>
                <tbody>
                {ethnicCodes && ethnicCodes.length > 0
                    ? ethnicCodes.map((code, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{code.description}</td>
                            <td>
                                <Button size="sm" color="danger" onClick={this.deleteEthnicCode(index)}>
                                    <i className="fas fa-trash"/>
                                </Button>
                            </td>
                        </tr>
                    ))
                    : <tr>
                        <td colSpan={3} style={{left: 50, top: 50}}>No posee ningun codigo ethnico aun</td>
                    </tr>}
                </tbody>
            </table>
        );
    }

}


function mapStateToProps(store) {
    return {
        form: store.studentInfo.demographics,
        found: store.studentLookup.found
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadDemographics, saveDemographics}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions, null, {withRef: true})(PersonalAdditionalInfo);
