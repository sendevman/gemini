import React, {Component} from "react";
import {Button} from "react-bootstrap";
import leisureIllustration from "../../../style/img/leisure-illustration.png";

export default class ResetPasswordResult extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push("/")
    }

    render() {
        let result = this.props.match.params.result === "success";
        let title = result? "Contraseña reiniciada" : "¡Upss!";
        let content;
        if (result === "invalid")
            content = "Lo siento, este enlace para reiniciar su contraseña ya no es valido. Por favor solicite otro";
        else
            content = result ? "Su contraseña ha sido reiniciada" : "Ocurrio un error reiniciando su contraseña";


        return [<div className="col-md-7 content-section">
            <div className="title">
                <div className="description mb40"><h2>{title}!</h2>
                    <div className="violet-line"/>
                </div>
                <p>{content}</p>
            </div>
            <div className="body d-flex align-items-center flex-column justify-content-end">
                <div className="row action-section">
                    <div className="col-md-12 text-center text-lg-left p-0">
                        <a className="button-green mr30 mob-mb30px" onClick={this.onClick}><span>y</span>Volver</a>
                    </div>
                </div>
            </div>
        </div>,
            <div className="col-md-4 illustration-section d-flex align-items-center text-center">
                <div className="illustration"><img src={leisureIllustration} alt=""/></div>
            </div>];
    }


    render() {
        let result = this.props.match.params.result === "success";
        let title;
        if (result === "invalid")
            title = "Lo siento, este enlace para reiniciar su contraseña ya no es valido. Por favor solicite otro";
        else
            title = result ? "Su contraseña ha sido reiniciada" : "Ocurrio un error reiniciando su contraseña";

        return (<div>
            <div className="forgot-password-result">
                <div className="row">
                    <div className="col-md-12">
                        <h5>{title}</h5>
                    </div>
                </div>
                {this.renderSuccess()}
                <div className="row">
                    <div className="col-md-12">
                        <Button block bsStyle="primary" onClick={this.onClick}> Volver</Button>
                    </div>
                </div>
            </div>
        </div>);
    }

    renderSuccess() {
        let success = this.props.match.params.result === "success";
        if (!success)
            return (null);
        return (<div className="row">
            <div className="col-md-12">
                <p>
                    Su contraseña ha sido reiniciada, ahora proceda autenticarse
                </p>
            </div>
        </div>)
    }
}