/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Button, Col, ProgressBar, Row} from "react-bootstrap";
//Tabs
import StudentIdentification from "./wizard/StudentIdentification";
import PersonalInfo from "./wizard/PersonalInfo";
import Address from "./wizard/Address";
import PreEnrollment from "./wizard/PreEnrollment";
import SubmitRequest from "./wizard/SubmitRequest";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {load, onNextAction, onPreviousAction} from "../redux/actions";
import Question from "./wizard/Question";

function form(title, form) {
    return {title: title, form: form};
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    componentWillMount() {
        this.props.load();
    }

    next() {
        let idx = `page${this.props.current}`;
        let pageRef = this.refs[idx].getWrappedInstance ? this.refs[idx].getWrappedInstance() : null;
        this.props.onNextAction((callback) => {
            if (pageRef && pageRef.onPress) {
                pageRef.onPress(callback);
            }
            else {
                callback();
            }
        })

    }

    previous() {
        this.props.onPreviousAction();
    }

    unusedForms() {
        /* form("Datos Demograficos", <Demographic ref={`page${c++}`}/>),
         form("Informaci\u00f3n Adicional", <AdditionalInfo ref={`page${c++}`}/>),
         form("Contactos de Emergencia", <EmergencyContacts ref={`page${c++}`}/>),
         form("Lenguajes", <LanguageInfo ref={`page${c++}`}/>),
         form("Informacion Medica", <MedicalInfo ref={`page${c++}`}/>),
         form("Informacion Medica Adicional", <MedicalInfoAdditional ref={`page${c++}`}/>),
         form("Tutores Legales", <TutorInfo ref={`page${c++}`}/>),
         form("Finanzas", <FinancialFamilyInfo ref={`page${c++}`}/>),
         form("Transportaci\u00f3n", <TransportationInfo ref={`page${c++}`}/>)*/

    }


    render() {
        let current = this.props.current;
        let student = this.props.student;
        let c = 0;
        this.wizardForms = [
            form("", <Question question="Tiene usted su hijo matriculado en Departamento de Educacion de PR"
                               ref={`page${c++}`}/>),
            form("Identificaci\u00f3n de Estudiante", <StudentIdentification ref={`page${c++}`}/>),
            form("", <Question
                question="Estudiante no fue encontrado con la informacion provista, desea realizar nuevamente la busqueda"
                ref={`page${c++}`}/>),
            form("", <Question
                question={`Hemos encontrado al estudiante ${student && student.fullName}, desea pre-matricularlo para año escolar 2019 (2018-2019)`}
                ref={`page${c++}`}/>),
            form("Informaci\u00f3n Personal", <PersonalInfo ref={`page${c++}`}/>),
            form("Direcci\u00f3n", <Address ref={`page${c++}`}/>),
            form("", <Question question="Su estudiante permanece en la misma escuela" ref={`page${c++}`}/>),
            form("Matricula", <PreEnrollment ref={`page${c++}`}/>),
            form("Someter Solicitud", <SubmitRequest history={this.props.history} ref={`page${c++}`}/>)
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
        let props = {...this.props.wizard};
        let showProgressBar = props.initForm
            ? (<Col xs={4} style={{paddingTop: 10}}>
                <ProgressBar now={props.percentage} label={`${props.percentage}%`}/>
            </Col>)
            : (<Col xs={4}/>);

        return (<footer className="footer">
            <div className="overlay"/>
            <Row>
                <Col xs={1}/>
                {showProgressBar}
                <Col xs={7}>
                    <div style={{marginRight: 5, zIndex: 100}} className="pull-right">
                        {props.previousLabel
                            ? <Button onClick={this.previous} style={{marginRight: 5}}
                                      bsStyle="primary">{props.previousLabel}</Button>
                            : null}
                        <Button onClick={this.next} bsStyle="primary">{props.nextLabel}</Button>
                    </div>
                </Col>
            </Row>
        </footer>)
    }
}

function mapStateToProps(store) {
    return {
        current: store.wizard.current,
        wizard: store.wizard,
        student: store.studentLookup.student

    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({load, onNextAction, onPreviousAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Home);

