/**
 * Created by fran on 2/2/18.
 */
import React, {Component} from "react";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadHome, resetWizard} from "../redux/actions";
import AnimationHelper from "../components/AnimationHelper";
import * as UIHelper from "../UIHelper";
import Button from "../components/Button";

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

                <div className="title">
                    <div className="description"/>
                    <span className="f30sbg"> Resumen de&nbsp;<span
                        className="f30sbb">{UIHelper.getText("homeTitle")}</span></span>
                    <div className="violet-line"/>

                    <span
                        className="f20slg">A continuaci&oacute;n un resumen de las matr&iacute;culas realizadas o en proceso.&nbsp;&nbsp;&nbsp;
                        <span className="f20slb">
                                {UIHelper.getText("enrollmentLabel")}
                            </span>&nbsp;&nbsp;&nbsp;
                        {/*<a href="#" onClick={this.preEnroll}>*/}
                        {/*{UIHelper.getText("enrollmentButton")}*/}
                        {/*</a>*/}
                        <Button size="small" style={{width: '40%'}} onClick={this.preEnroll}>
                            {UIHelper.getText("enrollmentButton")}
                        </Button>
                    </span>

                </div>
                <div className="body d-flex flex-column justify-content-end">
                    {this.renderHome()}
                    <div style={{marginBottom: 275}}/>
                </div>
                {/*{this.props.footer}*/}
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
                <div className="col-md-12 enrollmentList">
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
                        <span className="f20sbgr"><i
                            className="fa fa-times-circle"/> No posee matr&iacute;cula a&uacute;n</span>
                    </div>
                </div>
            );
        return preEnrollments.map((pre, index) => (

            <div className="row pt-2" key={index} style={{borderBottom: "1px solid #edeef2"}}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-9">
                            <h5>Estudiante {pre.student.fullName}</h5>
                        </div>
                        <div className="col-md-3">
                            {pre.requestStatus === "ACTIVE"
                                ?
                                (<Button bsSize="small" bsStyle="info" onClick={this.editPreEnroll(pre.id)}>
                                    <i className="fas fa-edit"/>
                                </Button>)
                                : (null)
                            }
                        </div>
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
                            {(pre.submitDate && moment(pre.submitDate).format('LL, h:mm:ss a')) || "Aún no ha sido sometida"}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            Matrícula:
                        </div>
                        <div className="col-md-6">
                            {pre.enrollmentTypeText}
                        </div>
                        <div className="col-md-3"/>

                    </div>
                </div>

            </div>

        ));
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



