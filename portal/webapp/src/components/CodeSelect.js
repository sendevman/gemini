/**
 * Created by fran on 1/29/18.
 */
import React, {Component} from "react";
import Codes from "./data/index";
import PropTypes from "prop-types";

class CodeSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {pristine: true};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({pristine: value === "-1"});
        if (this.props.onChange)
            this.props.onChange(e)
    }

    valid() {
        return !this.state.pristine;
    }

    componentWillMount() {
        switch (this.props.codeType) {
            case "contactTypes":
                this.codes = Codes.contactTypes;
                break;
            case "countries":
                this.codes = Codes.countries;
                break;
            case "disabilityCodes":
                this.codes = Codes.disabilityCodes;
                break;
            case "educationLevels":
                this.codes = Codes.educationLevels;
                break;
            case "ethnicCodes":
                this.codes = Codes.ethnicCodes;
                break;
            case "gender":
                this.codes = Codes.gender;
                break;
            case "languageCodes":
                this.codes = Codes.languageCodes;
                break;
            case "maritalStatuses":
                this.codes = Codes.maritalStatuses;
                break;
            case "municipios":
                this.codes = Codes.municipios;
                break;
            case "relationTypes":
                this.codes = Codes.relationTypes;
                break;
            case "residentialStatus":
                this.codes = Codes.residentialStatus;
                break;
            case "states":
                this.codes = Codes.states;
                break;
            case "transportationTypes":
                this.codes = Codes.transportationTypes;
                break;
            case "foodOptions":
                this.codes = Codes.foodOptions;
                break;
            case "medicalConditions":
                this.codes = Codes.medicalConditions;
                break;
            case "schools":
                this.codes = Codes.schools;
                break;
            case "grades":
                this.codes = Codes.grades;
                break;
            case "jobTypes":
                this.codes = Codes.jobTypes;
                break;
            case "incomeTypes":
                this.codes = Codes.incomeTypes;
                break;
            case "registrationRelations":
                this.codes = Codes.registrationRelations;
                break;
        }
    }

    render() {
        let formGroupCss = "form-group ".concat(this.state.pristine ? "has-error" : "");
        let elementProps = Object.assign({}, this.props);
        delete elementProps.codeType;
        return (
            <div className={formGroupCss}>
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <select className="form-control" {...elementProps} onChange={this.onChange}>
                    <option value="-1">{this.props.placeholder}</option>
                    {this.codes.map((code, i) => (
                        <option key={i} value={code.value}>{code.description}</option>
                    ))}
                </select>
            </div>);
    }
}

CodeSelect.propTypes = {
    codeType: PropTypes.string
};


export default CodeSelect;


