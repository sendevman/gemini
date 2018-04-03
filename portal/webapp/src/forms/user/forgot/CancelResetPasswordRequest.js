import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {cancelResetPassword} from "../../../redux/actions";
import leisureIllustration from "../../../assets/img/leisure-illustration.png";
import AnimationHelper from "../../../components/AnimationHelper";
import * as UIHelper from "../../../UIHelper";

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
        this.props.history.push("/login")
    }

    render() {
        let form = this.props.form;
        if (form.loading)
            return (null);
        let message = form.validKey ? "Su solicitud de reiniciar su contraseña ha sido cancelada" : "Enlace ha caducado, ya no es valido";
        let title = form.validKey ? "Enlace cancelado" : "¡Upss!";
        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2>{title}!</h2>
                    <div className="violet-line"/>
                </div>
                <p>{message}</p>
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end">
                <div className="row action-section">
                    <div className="col-md-12 text-center text-lg-left p-0">
                        <a className="button-green mr30 mob-mb30px" onClick={this.onClick}><span>I</span>{UIHelper.getText("startSessionButton")}</a>
                    </div>
                </div>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                {/*<div className="illustration"><img src={leisureIllustration} alt=""/></div>*/}
                <AnimationHelper type="rest"/>
            </div>];
    }
}

function mapStateToProps(store) {
    return {form: store.loginHelp};
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({cancelResetPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(CancelResetPasswordRequest);
