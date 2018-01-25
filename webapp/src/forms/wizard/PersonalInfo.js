/**
 * Created by fran on 1/25/18.
 */
import React, {Component} from "react";
import {ButtonToolbar, Col, ControlLabel, DropdownButton, FormControl, FormGroup, MenuItem, Row} from "react-bootstrap";
const genders = {male: 'Masculino', female: 'Femenino'};
const countries = [{name: 'pr', desc: 'Puerto Rico'},
    {name: 'us', desc: 'Estados Unidos'},
    {name: 'pe', desc: 'Peru'},
    {name: 'me', desc: 'Mexico'}];

export default class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {form: {genderLabel: 'Genero', gender: null, firstname: '', countryLabel: 'Pais'}};
    }

    render() {
        let form = this.state.form;
        return (
            <form style={{marginTop: 40}}>
                <Row>
                    <Col xs={3}>
                        <ControlLabel>Nombre:</ControlLabel>
                        <FormGroup controlId="firstname">
                            <FormControl type="text" placeholder="Nombre"/>
                            <FormControl.Feedback />
                        </FormGroup>

                    </Col>
                    <Col xs={3}>
                        <ControlLabel>Segundo Nombre:</ControlLabel>
                        <FormGroup controlId="middlename">
                            <FormControl type="text" placeholder="Segundo Nombre"/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>

                    <Col xs={3}>
                        <ControlLabel>Apellido Materno:</ControlLabel>
                        <FormGroup controlId="mother-lastname">
                            <FormControl type="text" placeholder="Apellido Materno"/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col xs={3}>
                        <ControlLabel>Apellido Paterno:</ControlLabel>
                        <FormGroup controlId="father-lastname">
                            <FormControl type="text" placeholder="Apellido Paterno"/>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ControlLabel>Genero:</ControlLabel>
                        <ButtonToolbar>
                            <DropdownButton id="dropdown-size-medium"
                                            title={form.genderLabel}
                                            onSelect={(eventKey, event) => {
                                                this.setState({
                                                    form: {
                                                        ...form,
                                                        genderLabel: genders[eventKey],
                                                        gender: eventKey
                                                    }
                                                })
                                            }}>
                                <MenuItem eventKey="male">Masculino</MenuItem>
                                <MenuItem eventKey="female">Femenino</MenuItem>
                            </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={6}>
                        <ControlLabel>Pais:</ControlLabel>
                        <ButtonToolbar>
                            <DropdownButton id="dropdown-size-medium"
                                            title={form.countryLabel}
                                            onSelect={(eventKey, event) => {
                                                alert(countries[eventKey]);
                                                this.setState({
                                                    form: {
                                                        ...form,
                                                        countryLabel: countries[eventKey].desc,
                                                    }
                                                })
                                            }}>
                                {countries.map((country, i) => (
                                    <MenuItem key={i} eventKey={i}>{country.desc}</MenuItem>
                                ))}
                            </DropdownButton>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </form>
        );
    }
}


// row = () =>(di<);
