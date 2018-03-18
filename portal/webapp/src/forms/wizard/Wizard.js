/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
//forms
import StudentIdentification from "./pre-enrollment/StudentIdentification";
import PersonalInfo from "./pre-enrollment/PersonalInfo";
import Address from "./pre-enrollment/Address";
import PreEnrollment from "./pre-enrollment/PreEnrollment";
import SubmitRequest from "./pre-enrollment/SubmitRequest";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {load, onNextAction, onPreviousAction} from "../../redux/actions";
import Instructions from "./Instructions";
import UserInfoRequest from "./pre-enrollment/UserInfoRequest";
import VocationalProgramsSelection from "./pre-enrollment/VocationalProgramsSelection";
import VocationalPreEnrollment from "./pre-enrollment/VocationalPreEnrollment";
import Info from "./pre-enrollment/Info";
import VocationalReviewSubmit from "./pre-enrollment/VocationalReviewSubmit";
import IsVocationalQuestion from "./pre-enrollment/IsVocationalQuestion";
import StudentFound from "./pre-enrollment/StudentFound";
import StudentNotFound from "./pre-enrollment/StudentNotFound";
import IsStudentCurrentlyEnrolled from "./pre-enrollment/IsStudentCurrentlyEnrolled";
import PreEnrollmentRecordFound from "./pre-enrollment/PreEnrollmentRecordFound";

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
            , {renderObj: Instructions}
            , {renderObj: IsVocationalQuestion}
            , {renderObj: IsStudentCurrentlyEnrolled}
            , {renderObj: StudentIdentification}
            , {renderObj: StudentNotFound}
            , {renderObj: StudentFound}
            , {renderObj: PersonalInfo}
            , {title: "Direcci\u00f3n", renderObj: Address}
            , {renderObj: PreEnrollmentRecordFound}
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
            let props = {ref: `page${c++}`, footer: this.renderFooter()};
            if (pageConfig.question)
                props.question = pageConfig.question;
            else if (pageConfig.info)
                props.info = pageConfig.info;
            if (RenderObj instanceof StudentFound) {
                props["studentName"] = student && student.fullName;
            }

            this.wizardForms.push(form(pageConfig.title, <RenderObj {...props}/>));
        }

    }


    render() {
        let current = this.props.current;
        this.configForms();
        if (!this.wizardForms || this.wizardForms.length === 0)
            return (null);

        return this.wizardForms[current].form;
    }

    renderFooter() {
        let props = this.props.wizard;
        // props.nextShortLabel
        // props.previousShortLabel
        if (props.currentPageType === "PERSONAL_INFO" || props.currentPageType === "STUDENT_LOOKUP")
            return (<div className="row action-section">
                <div className="col-md-12 text-center text-lg-left p-0">
                    <button onClick={this.next} className="button-green mr30 mob-mb30px"><span>y</span>{props.nextLabel}
                    </button>
                    {props.previousLabel
                        ? (<a className="button-white mob-mb30px" onClick={this.previous}>
                            <span>n</span>{props.previousLabel}
                        </a>)
                        : null
                    }
                </div>
            </div>);

        return (<div key="footer" className="body d-flex align-items-center flex-column justify-content-end">
            <div className="row action-section">
                <div className="col-md-12 text-center text-lg-left p-0">
                    <a className="button-green mr30 mob-mb30px" onClick={this.next}>
                        <span>y</span>{props.nextLabel}
                    </a>
                    {props.previousLabel
                        ? (<a className="button-white mob-mb30px" onClick={this.previous}>
                            <span>n</span>{props.previousLabel}
                        </a>)
                        : null
                    }
                </div>
            </div>
        </div>)
    }
}

function mapStateToProps(store) {
    return {
        current: store.wizard.current,
        wizardCompleted: store.wizard.wizardCompleted,
        student: store.studentLookup.student,
        formsToDisplay: store.wizard.formsToDisplay,
        wizard: store.wizard,
        preEnrollment: store.preEnrollment.info,
        currentVocationalEnrollment: store.preEnrollment.currentVocationalEnrollment,
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({load, onNextAction, onPreviousAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Wizard);

