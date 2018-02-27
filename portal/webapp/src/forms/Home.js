/**
 * Created by fran on 2/2/18.
 */
import React, {Component} from "react";
import {Button, Glyphicon} from "react-bootstrap";
import moment from "moment";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadHome} from "../redux/actions";

class Home extends Component {

    constructor(props) {
        super(props);
        this.editPreEnroll = this.editPreEnroll.bind(this);
        this.preEnroll = this.preEnroll.bind(this);
    }

    componentWillMount() {
        this.props.loadHome();
    }

    preEnroll() {
        this.props.history.push("/wizard");
    }

    editPreEnroll() {
        alert("Next build")
    }

    render() {
        return (
            <div className="container">
                <div style={{marginTop: 20}}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3 style={{textAlign: "right"}}>Desea pre-matricular un estudiante?</h3>
                        </div>
                        <div className="col-md-2" style={{marginTop: 20}}>
                            <Button onClick={this.preEnroll} bsStyle="primary" block={true}>Pre-Matricular</Button>
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
            <div key={index} className="panel panel-primary" style={{height: 150}}>
                <div className="panel-heading">
                    Estudiante {pre.studentFullName}
                    <div className="pull-right" style={{marginTop: -5}}>
                        <Button bsSize="small" bsStyle="info" onClick={this.editPreEnroll}>
                            <Glyphicon glyph="glyphicon glyphicon-pencil"/>
                        </Button>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-3">
                            Estatus de Pre-Matricula:
                        </div>
                        <div className="col-md-3">
                            <p className="text-danger">{pre.requestStatusText}</p>
                        </div>
                        <div className="col-md-6"/>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            Fecha de Solicitud:
                        </div>
                        <div className="col-md-3">
                            {moment(pre.submitDate).format('LL')}
                        </div>
                        <div className="col-md-6"/>
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
    return bindActionCreators({loadHome}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Home);



