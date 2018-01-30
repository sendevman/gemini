/**
 * Created by fran on 1/29/18.
 */
import React, {Component} from "react";
import Codes from "./data/index";
import PropTypes from "prop-types";

class CodeSelect extends Component {

    constructor(props) {
        super(props);
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
        }
    }

    render() {

        let elementProps = Object.assign({}, this.props);
        delete elementProps.codeType;
        return (<select className="form-control" {...elementProps}>
            <option value="">{this.props.placeholder}</option>
            {this.codes.map((code, i) => (
                <option key={i} value={code.value}>{code.description}</option>
            ))}
        </select>);
    }
}

CodeSelect.propTypes = {
    codeType: PropTypes.string
};


export default CodeSelect;


