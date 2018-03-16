import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {cancelResetPassword} from "../../../redux/actions";
import {Button} from "react-bootstrap";

class CancelResetPasswordRequest extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        let key = this.props.match.params.key;
        this.props.cancelResetPassword(key);
    }

    onClick() {
        this.props.history.push("/")
    }


    render() {
        let form = this.props.form;
        if (form.loading)
            return (null);
        let message = form.validKey ? "Su solicitud de reiniciar su contraseña ha sido cancelada" : "Enlace ha caducado, ya no es valido";
        return (<div className="container">
            <div className="forgot-password-result">
                <div className="row">
                    <div className="col-md-12">
                        <h5>{message}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Button block bsStyle="primary" onClick={this.onClick}> Volver</Button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(store) {
    return {form: store.loginHelp};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({cancelResetPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(CancelResetPasswordRequest);
