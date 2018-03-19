/**
 * Created by fran on 2/2/18.
 */
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadHome, resetWizard} from "../redux/actions";
import * as Utils from "../Utils";

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
        return (
            <div className="container">
                <div>
                    <div className="row">
                        <div className="col-md-10">
                            <h3 style={{textAlign: "right"}}>Desea pre-matricular un estudiante?</h3>
                        </div>
                        <div className="col-md-2">
                            <button className="button-yellow" onClick={this.preEnroll}>Pre-Matricular</button>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: 20}}>
                        <div className="col-md-12">
                            {this.renderPreEnrollmentList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPreEnrollmentList() {
        let preEnrollments = this.props.preEnrollments;
        if (!preEnrollments || preEnrollments.length <= 0)
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        No posee pre-matriculas aun
                    </div>
                </div>
            );

        return preEnrollments.map((pre, index) => (
            <div key={index} className="card" style={{height: 150, marginTop: 5}}>

                <div className="card-block">
                    <div className="card-title">
                        <h5>Estudiante {pre.student.fullName} -> {Utils.format(pre.student.dateOfBirth, "ll")}</h5>
                        <div className="float-right" style={{marginTop: -40}}>
                            {pre.requestStatus === "ACTIVE"
                                ?
                                (<Button bsSize="small" bsStyle="info" onClick={this.editPreEnroll(pre.id)}>
                                    <i className="fas fa-edit"/>
                                </Button>)
                                : (null)
                            }
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-3">
                                Estatus de Pre-Matricula:
                            </div>
                            <div className="col-md-3">
                                <span className="text-danger">{pre.requestStatusText}</span>
                            </div>
                            <div className="col-md-6"/>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Fecha de Solicitud:
                            </div>
                            <div className="col-md-9">
                                {(pre.submitDate && moment(pre.submitDate).format('LL, h:mm:ss a')) || "Aun no ha sido sometida"}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                Matricula:
                            </div>
                            <div className="col-md-3">
                                {pre.type === "VOCATIONAL" ? "Vocacional" : "Regular"}
                            </div>
                            <div className="col-md-6"/>

                        </div>
                    </div>
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



