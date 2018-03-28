/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import * as types from "../../redux/types";
//forms
import StudentIdentification from "./pre-enrollment/StudentIdentification";
import PersonalInfo from "./pre-enrollment/PersonalInfo";
import Address from "./pre-enrollment/Address";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {load, onNextAction, onPreviousAction, onProgramSelectionAction} from "../../redux/actions";
import Instructions from "./Instructions";
import UserInfoRequest from "./pre-enrollment/UserInfoRequest";
import UserAdditionalInfoRequest from "./pre-enrollment/UserAdditionalInfoRequest";
import VocationalProgramsSelection from "./pre-enrollment/VocationalProgramsSelection";
import VocationalPreEnrollment from "./pre-enrollment/VocationalPreEnrollment";
import VocationalReviewSubmit from "./pre-enrollment/VocationalReviewSubmit";
import DEProgramQuestion from "./pre-enrollment/DEProgramQuestion";
import StudentFound from "./pre-enrollment/StudentFound";
import StudentNotFound from "./pre-enrollment/StudentNotFound";
import IsStudentCurrentlyEnrolled from "./pre-enrollment/IsStudentCurrentlyEnrolled";
import PreEnrollmentAlternateSchoolsSelection from "./pre-enrollment/PreEnrollmentAlternateSchoolsSelection";
import PreEnrollmentRecordFoundSubmit from "./pre-enrollment/PreEnrollmentRecordFoundSubmit";
import PreEnrollmentAlternateSchoolsSubmit from "./pre-enrollment/PreEnrollmentAlternateSchoolsSubmit";
import CompletedPreEnrollment from "./pre-enrollment/CompletedPreEnrollment";
import ConfirmedPreEnrollment from "./pre-enrollment/ConfirmedPreEnrollment";
import VocationalSchoolSelectionInfo from "./pre-enrollment/VocationalSchoolSelectionInfo";
import ModalHelper from "../../components/ModalHelper";
import PersonalAdditionalInfo from "./pre-enrollment/PersonalAdditionalInfo";
import IsStudentHispanicQuestion from "./pre-enrollment/IsStudentHispanicQuestion";
import IsStudentBornPRQuestion from "./pre-enrollment/IsStudentBornPRQuestion";

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
        this.props.load(requestId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wizardCompleted) {
            if (nextProps.startOver) {
                window.location.reload();
            } else {
                this.props.history.push('/home');
            }
        } else {
            let current = this.props.wizard;
            let next = nextProps.wizard;
            if (current.currentPageType !== next.currentPageType)
                window.scrollTo(0, 0);
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onError(validationObj) {
        if (validationObj) {
            let formattedMessage = validationObj.title ? `${validationObj.title}:\n` : "";
            for (let message of validationObj.messages) {
                formattedMessage += `*\t${message}\n`;
            }
            this.refs.modal.open("Validaci\u00f3n", formattedMessage)
        } else {
            this.refs.modal.open("Upps!!!", "Ha ocurrido un error, disculpe el inconveniente")
        }
    }

    onProgramSelection = (selection) => e => {
        this.props.onProgramSelectionAction(selection);
    };

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
        let idx = `page${this.props.current}`;
        let pageRef = this.refs[idx].getWrappedInstance ? this.refs[idx].getWrappedInstance() : null;

        this.props.onPreviousAction((callback) => {
            if (pageRef && pageRef.onBack) {
                pageRef.onBack(callback, this.onError);
            }
            else {
                callback();
            }
        });
    }

    configForms() {
        let student = this.props.student;
        let formsToDisplay = this.props.formsToDisplay;
        let vocationalSchool = this.props.currentVocationalEnrollment;
        let currentPageType = this.props.wizard.currentPageType;

        let CATALOG = [
            {renderObj: UserInfoRequest}
            , {renderObj: UserAdditionalInfoRequest}
            , {renderObj: Instructions}
            , {renderObj: DEProgramQuestion}
            , {renderObj: IsStudentCurrentlyEnrolled}
            , {renderObj: StudentIdentification}
            , {renderObj: StudentNotFound}
            , {renderObj: StudentFound}
            , {renderObj: PersonalInfo}
            , {renderObj: PersonalAdditionalInfo}
            , {renderObj: IsStudentHispanicQuestion}
            , {renderObj: IsStudentBornPRQuestion}
            , {renderObj: Address}
            , {renderObj: PreEnrollmentAlternateSchoolsSelection}
            , {renderObj: PreEnrollmentAlternateSchoolsSubmit}
            , {renderObj: PreEnrollmentRecordFoundSubmit}
            , {renderObj: CompletedPreEnrollment}
            , {renderObj: ConfirmedPreEnrollment}

            //vocational forms
            , {renderObj: VocationalPreEnrollment}
            , {renderObj: VocationalSchoolSelectionInfo}
            , {renderObj: VocationalProgramsSelection}
            , {renderObj: VocationalReviewSubmit}

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

            if (currentPageType === "FOUND_INFO") {
                props["studentName"] = student && student.fullName;
            }

            if (currentPageType === "VOCATIONAL_SCHOOL_INFO") {
                props["vocationalSchool"] = vocationalSchool;
            }

            if(currentPageType === "PERSONAL_INFO"){
                props["history"] = this.props.history;
            }

            this.wizardForms.push(form(pageConfig.title, <RenderObj {...props}/>));
        }

    }

    render() {
        let current = this.props.current;
        this.configForms();
        if (!this.wizardForms || this.wizardForms.length === 0)
            return (null);

        return [this.wizardForms[current].form, <ModalHelper ref="modal"/>];
    }

    //todo: fran this needs improvements
    renderFooter() {
        let props = this.props.wizard;
        let commonStyle = {zIndex: 1000};
        let cssClass = props.currentPageType !== "USER_ADDITIONAL_INFO"
        && props.currentPageType !== "PERSONAL_ADDITIONAL_INFO"
        && props.currentPageType !== "VOCATIONAL_PROGRAMS"
        && props.currentPageType !== "VOCATIONAL_SCHOOL_SELECTION"
            ? "body d-flex align-items-center flex-column justify-content-end"
            : "";

        if (props.currentPageType === "PERSONAL_INFO"
            || props.currentPageType === "STUDENT_LOOKUP"
            || props.currentPageType === "VOCATIONAL_REVIEW_SUBMIT")
            return (<div className="row action-section" style={commonStyle}>
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
            </div>);
        else if (props.currentPageType === "USER_PROFILE") {
            return (<div className="row mt50 bt1p pt40">
                <div className="col-md-12">
                    <a className="button-green mr30 mob-mb30px" onClick={this.next}>
                        <span>y</span>{props.nextLabel}
                    </a>
                </div>
            </div>)
        } else if (props.currentPageType === "DE_PROGRAM_QUESTION") {
            return (
                <div key="footer" className={cssClass}
                     style={commonStyle}>
                    <div className="row action-section">
                        <div className="col-md-12 text-center text-lg-left p-0">
                            <a className="button-green mr30 mob-mb30px"
                               onClick={this.onProgramSelection(types.REGULAR_ENROLLMENT)}>
                                <span>R</span>Regular
                            </a>
                            <a className="button-white mob-mb30px"
                               onClick={this.onProgramSelection(types.OCCUPATIONAL_ENROLLMENT)}>
                                <span>O</span>Ocupacional
                            </a>
                            <a className="button-white mob-mb30px"
                               onClick={this.onProgramSelection(types.TECHNIQUE_ENROLLMENT)}>
                                <span>T</span>T&eacute;cnica
                            </a>
                        </div>
                    </div>
                </div>
            )
        }

        return (<div key="footer" className={cssClass}
                     style={commonStyle}>
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
        startOver: store.wizard.startOver
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({load, onNextAction, onPreviousAction, onProgramSelectionAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Wizard);

