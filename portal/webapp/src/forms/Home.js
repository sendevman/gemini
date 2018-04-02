/**
 * Created by fran on 2/2/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadHome, resetWizard} from "../redux/actions";
import AnimationHelper from "../components/AnimationHelper";
import * as UIHelper from "../UIHelper";

class Home extends Component {

    constructor(props) {
        super(props);
        this.preEnroll = this.preEnroll.bind(this);
    }

    componentWillMount() {
        this.props.resetWizard();
        this.props.loadHome();
    }

    preEnroll() {
        this.props.history.push("/wizard");
    }

    editPreEnroll = id => e => {
        this.props.history.push(`/wizard/${id}`);
    };


    render() {
        return [
            <div className="col-md-7 content-section">
                <div className="home">
                    {this.renderHome()}
                </div>
                {this.props.footer}
            </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>
        ];
    }

    renderHome() {
        return [

            <div className="row">
                <div className="col-md-8">
                    <h5 className="f20slb" style={{textAlign: "right"}}>
                        {UIHelper.getText("enrollmentLabel")}
                    </h5>
                </div>
                <div className="col-md-4">
                    <button className="button-yellow" style={{padding: 10}} onClick={this.preEnroll}>
                        {UIHelper.getText("enrollmentButton")}
                    </button>
                </div>
            </div>,
            <div className="row" style={{marginTop: 20}}>
                <div className="col-md-12">
                    {this.renderPreEnrollmentList()}
                </div>
            </div>
        ];
    }

    renderPreEnrollmentList() {
        let preEnrollments = this.props.preEnrollments;
        if (!preEnrollments || preEnrollments.length <= 0)
            return (
                <div className="card">
                    <div className="card-block">
                        <span className="f20sbgr"><i className="fa fa-times-circle"/> No posee pre-matriculas a&uacute;n</span>
                    </div>
                </div>
            );

        return preEnrollments.map((pre, index) => (
            <div key={index} style={{height: 150, marginTop: 5, padding: 20, borderBottom: "1px solid #edeef2"}}>

                <h5>Estudiante {pre.student.fullName}</h5>
                <div className="float-right" style={{marginTop: -40}}>
                    {pre.requestStatus === "ACTIVE"
                        ?
                        (<Button bsSize="small" bsStyle="info" onClick={this.editPreEnroll(pre.id)}>
                            <i className="fas fa-edit"/>
                        </Button>)
                        : (null)
                    }
                </div>
                <div className="row">
                    <div className="col-md-3">
                        Estatus:
                    </div>
                    <div className="col-md-6">
                        <span className="text-danger">{pre.requestStatusText}</span>
                    </div>
                    <div className="col-md-3"/>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        Fecha:
                    </div>
                    <div className="col-md-9">
                        {(pre.submitDate && moment(pre.submitDate).format('LL, h:mm:ss a')) || "Aun no ha sido sometida"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        Matricula:
                    </div>
                    <div className="col-md-6">
                        {pre.enrollmentTypeText}
                    </div>
                    <div className="col-md-3"/>

                </div>
            </div>));
    }

}

function mapStateToProps(store) {
    return {
        preEnrollments: store.home.preEnrollments
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({loadHome, resetWizard}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Home);



