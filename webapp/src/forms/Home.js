/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Button, Col, ProgressBar, Row} from "react-bootstrap";
import StudentIdentification from "./wizard/StudentIdentification";
import PersonalInfo from "./wizard/PersonalInfo";
import Address from "./wizard/Address";
import Demografic from "./wizard/Demografic";
import Enrollment from "./wizard/Enrollment";
import EmergencyContacts from "./wizard/EmergencyContacts";
import TutorInfo from "./wizard/TutorInfo";

import "react-datepicker/dist/react-datepicker.css";


function form(title, form) {
    return {title: title, form: form};
}


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {currentForm: 0};
        this.accountablePertangeForm = 6;
        this.maxForms = 7;

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

    }

    next() {
        let current = this.state.currentForm;
        if (current < (this.maxForms - 1))
            this.setState({currentForm: current + 1})
    }

    previous() {
        let current = this.state.currentForm;
        if (current > 0)
            this.setState({currentForm: current - 1})
    }


    render() {
        let current = this.state.currentForm;
        let wizardForms = [
            form("Identificaci\u00f3n de Estudiante", <StudentIdentification/>),
            form("Informaci\u00f3n Personal", <PersonalInfo/>),
            form("Direcci\u00f3n", <Address/>),
            form("Datos Demograficos", <Demografic/>),
            form("Matricula", <Enrollment/>),
            form("Contactos de Emergencia", <EmergencyContacts/>),
            form("Tutores Legales", <TutorInfo/>)
        ];

        return (<div>
            <div className="container">
                <Row>
                    <Col xs={12}>
                        <h3>{wizardForms[this.state.currentForm].title}</h3>
                    </Col>
                </Row>
                <div style={{marginTop: 20}}>
                    {wizardForms[this.state.currentForm].form}
                </div>
            </div>
            {this.renderFooter()}

        </div>);
    }

    renderFooter() {
        let current = this.state.currentForm;
        let percentage = Math.floor(((current - 1) / this.accountablePertangeForm) * 100);
        let initForm = current > 0;
        let showProgressBar = initForm
            ? (    <Col xs={4}>
                <label> {percentage} % Completed</label>
                <ProgressBar now={percentage}/>
            </Col>)
            : (<Col xs={4}/>);

        return (   <footer className="footer">
            <div className="overlay"/>
            <Row>
                <Col xs={1}/>
                {showProgressBar}
                <Col xs={4}/>
                <Col xs={3}>
                    <div style={{marginRight: 5, zIndex: 100}} className="pull-right">
                        {initForm
                            ? <Button onClick={this.previous} style={{marginRight: 5}}
                                      bsStyle="primary">Back</Button>
                            : null}
                        <Button onClick={this.next} bsStyle="primary">{initForm ? 'Next' : 'Comenzar'}</Button>
                    </div>
                </Col>
            </Row>
        </footer>)
    }


}
