/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Button, Col, ProgressBar, Row} from "react-bootstrap";
import Immutable from "immutable";
//forms
import StudentIdentification from "./pre-enrollment/StudentIdentification";
import PersonalInfo from "./pre-enrollment/PersonalInfo";
import Address from "./pre-enrollment/Address";
import PreEnrollment from "./pre-enrollment/PreEnrollment";
import SubmitRequest from "./pre-enrollment/SubmitRequest";
import Question from "./pre-enrollment/Question";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {load, onNextAction, onPreviousAction} from "../../redux/actions";
import Instructions from "./Instructions";
import UserInfoRequest from "./pre-enrollment/UserInfoRequest";
import VocationalProgramsSelection from "./pre-enrollment/VocationalProgramsSelection";
import VocationalPreEnrollment from "./pre-enrollment/VocationalPreEnrollment";
import Info from "./pre-enrollment/Info";
import VocationalReviewSubmit from "./pre-enrollment/VocationalReviewSubmit";

function form(title, form) {
    return {title: title, form: form};
}

class Wizard extends Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onError = this.onError.bind(this);

    }

    componentWillMount() {
        let requestId = this.props.match.params.id;
        console.log(this.props.match.params.id);
        this.props.load(requestId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wizardCompleted) {
            this.props.history.push('/home')
        }

    }

    onError() {
        alert("Ha ocurrido un error")
    }

    next() {
        let idx = `page${this.props.current}`;
        let pageRef = this.refs[idx].getWrappedInstance ? this.refs[idx].getWrappedInstance() : null;
        this.props.onNextAction((callback) => {
            if (pageRef && pageRef.onPress) {
                pageRef.onPress(callback, this.onError);
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

    configForms() {
        let student = this.props.student;
        let preEnrollment = this.props.preEnrollment;
        let enrollmentPredicate = preEnrollment && preEnrollment.hasPreviousEnrollment
            ? `${preEnrollment.schoolName} para el grado ${preEnrollment.nextGradeLevelDescription}`
            : "";
        let formsToDisplay = this.props.formsToDisplay;
        let vocationalSchool = this.props.currentVocationalEnrollment;

        let CATALOG = [
            {title: "Su Informacion Personal", renderObj: UserInfoRequest}
            , {title: "Instrucciones", renderObj: Instructions}
            , {title: null, question: "Es su hijo un estudiante de escuela vocacional", renderObj: Question}
            , {
                title: null,
                question: "Tiene usted su hijo matriculado en Departamento de Educacion de PR",
                renderObj: Question
            }
            , {title: "Identificaci\u00f3n de Estudiante", renderObj: StudentIdentification}
            , {
                title: null,
                question: "Estudiante no fue encontrado con la informacion provista, desea realizar nuevamente la busqueda",
                renderObj: Question
            }
            , {
                title: null,
                question: `Hemos encontrado al estudiante ${student && student.fullName}, desea pre-matricularlo para año escolar 2019 (2018-2019)`,
                renderObj: Question
            }
            , {title: "Informaci\u00f3n del Estudiante", renderObj: PersonalInfo}
            , {title: "Direcci\u00f3n", renderObj: Address}
            , {
                title: null,
                question: `Su estudiante continuará en la escuela ${enrollmentPredicate}`,
                renderObj: Question
            }
            , {title: "Pre-Matricula", renderObj: PreEnrollment}
            , {title: "Someter Solicitud", renderObj: SubmitRequest}

            //vocational forms
            , {title: "Seleccione su Escuela Vocacional", renderObj: VocationalPreEnrollment}
            , {
                title: null,
                info: `Gracias, ahora por favor seleccione los programas a los cuales desea aplicar en la escuela ${vocationalSchool && vocationalSchool.schoolName}.`,
                renderObj: Info
            }
            , {title: "Seleccione los Programas Vocacionales", renderObj: VocationalProgramsSelection}
            , {title: "Revise su pre-matricula Vocacional", renderObj: VocationalReviewSubmit}

        ];

        this.wizardForms = [];

        let c = 0;
        for (let formIndex of formsToDisplay) {
            let pageConfig = CATALOG[formIndex];
            let RenderObj = pageConfig.renderObj;
            let props = {ref: `page${c++}`};
            if (pageConfig.question)
                props.question = pageConfig.question;
            else if (pageConfig.info)
                props.info = pageConfig.info;
            this.wizardForms.push(form(pageConfig.title, <RenderObj {...props}/>));
        }

    }


    render() {
        let current = this.props.current;
        this.configForms();
        if (!this.wizardForms || this.wizardForms.length === 0)
            return (null);

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
        let props = this.props.wizard.toJS();
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
        wizardCompleted: store.wizard.wizardCompleted,
        student: store.studentLookup.student,
        formsToDisplay: store.wizard.formsToDisplay,
        wizard: Immutable.fromJS(store.wizard),
        preEnrollment: store.preEnrollment.info,
        currentVocationalEnrollment: store.preEnrollment.currentVocationalEnrollment,
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({load, onNextAction, onPreviousAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Wizard);

