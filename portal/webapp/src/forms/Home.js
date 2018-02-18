/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Button, Col, ProgressBar, Row} from "react-bootstrap";
//Tabs
import StudentIdentification from "./wizard/StudentIdentification";
import PersonalInfo from "./wizard/PersonalInfo";
import Address from "./wizard/Address";
import Demographic from "./wizard/Demographic";
import Enrollment from "./wizard/Enrollment";
import EmergencyContacts from "./wizard/EmergencyContacts";
import TutorInfo from "./wizard/TutorInfo";
import AdditionalInfo from "./wizard/AdditionalInfo";
import LanguageInfo from "./wizard/LanguageInfo";
import MedicalInfo from "./wizard/MedicalInfo";
import MedicalInfoAdditional from "./wizard/MedicalInfoAdditional";
import FinancialFamilyInfo from "./wizard/FinancialFamilyInfo";
import TransportationInfo from "./wizard/TransportationInfo";
import SubmitRequest from "./SubmitRequest";

function form(title, form) {
    return {title: title, form: form};
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {currentForm: 0, finalStep: false};
        this.accountablePertangeForm = 12;
        this.maxForms = 14;

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        let current = this.state.currentForm;
        let finalStep = (this.maxForms - 2) === current;
        if (current < (this.maxForms - 1)) {
            //before change validate current view
            // this.page.onPress();
            console.log(current);
            let idx = `page${current}`;
            console.log(this.refs[idx].getWrappedInstance());
            this.refs[idx].getWrappedInstance().onPress(
                () => {
                    this.setState({currentForm: current + 1, finalStep: finalStep})
                },
                () => {
                    alert("Ha ocurrido un error")
                }
            );
        }
        else
            this.props.history.push("/status")

    }

    previous() {
        let current = this.state.currentForm;
        if (current > 0)
            this.setState({currentForm: current - 1, finalStep: false})
    }


    render() {
        let current = this.state.currentForm;

        let c = 0;
        this.wizardForms = [
            form("Identificaci\u00f3n de Estudiante", <StudentIdentification ref={`page${c++}`}/>),
            form("Informaci\u00f3n Personal", <PersonalInfo ref={`page${c++}`}/>),
            form("Direcci\u00f3n", <Address ref={`page${c++}`}/>),
            form("Datos Demograficos", <Demographic ref={`page${c++}`}/>),
            form("Matricula", <Enrollment ref={`page${c++}`}/>),
            form("Informaci\u00f3n Adicional", <AdditionalInfo ref={`page${c++}`}/>),
            form("Contactos de Emergencia", <EmergencyContacts ref={`page${c++}`}/>),
            form("Lenguajes", <LanguageInfo ref={`page${c++}`}/>),
            form("Informacion Medica", <MedicalInfo ref={`page${c++}`}/>),
            form("Informacion Medica Adicional", <MedicalInfoAdditional ref={`page${c++}`}/>),
            form("Tutores Legales", <TutorInfo ref={`page${c++}`}/>),
            form("Finanzas", <FinancialFamilyInfo ref={`page${c++}`}/>),
            form("Transportaci\u00f3n", <TransportationInfo ref={`page${c++}`}/>),
            form("Someter Solicitud", <SubmitRequest ref={`page${c++}`}/>),
        ];

        return (<div>
            <div className="container">
                <Row>
                    <Col xs={12}>
                        <h3>{this.wizardForms[current].title}</h3>

                    </Col>
                </Row>
                <div style={{marginTop: 20}}>
                    {this.wizardForms[current].form}
                </div>
            </div>
            <div style={{marginTop: 70}}/>
            {this.renderFooter()}
        </div>);
    }

    renderFooter() {
        let current = this.state.currentForm;
        let percentage = Math.floor(((current - 1) / this.accountablePertangeForm) * 100);
        let initForm = current > 0;
        let lastForm = this.state.finalStep;
        let previousLabel = lastForm ? 'Cancelar' : 'Back';
        let nextLabel = initForm
            ? (lastForm ? 'Finalizar' : 'Next')
            : 'Comenzar';
        let showProgressBar = initForm
            ? (<Col xs={4} style={{paddingTop: 10}}>
                <ProgressBar now={percentage} label={`${percentage}%`}/>
            </Col>)
            : (<Col xs={4}/>);

        return (<footer className="footer">
            <div className="overlay"/>
            <Row>
                <Col xs={1}/>
                {showProgressBar}
                <Col xs={7}>
                    <div style={{marginRight: 5, zIndex: 100}} className="pull-right">
                        {initForm
                            ? <Button onClick={this.previous} style={{marginRight: 5}}
                                      bsStyle="primary">{previousLabel}</Button>
                            : null}
                        <Button onClick={this.next} bsStyle="primary">{nextLabel}</Button>
                    </div>
                </Col>
            </Row>
        </footer>)
    }


}
