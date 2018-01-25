/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Button, Col, Grid, ProgressBar, Row} from "react-bootstrap";
import PersonalInfo from "./wizard/PersonalInfo";

export default class Home extends Component {

    render() {
        return (<div>
            <div className="container">
                <Row>
                    <Col xs={12}>
                        <h3>Informaci&oacute;n Personal</h3>
                    </Col>
                </Row>
                <PersonalInfo/>
            </div>
            <footer className="footer">
                <div className="overlay"/>
                <Row>
                    <Col xs={1}/>
                    <Col xs={4}>
                        <label> 60 % Completed</label>
                        <ProgressBar now={60}/>
                    </Col>
                    <Col xs={4}/>
                    <Col xs={3}>
                        <div style={{marginRight: 5, zIndex: 100}} className="pull-right">
                            <Button onClick={() => {
                                console.log("back")
                            }} style={{marginRight: 5}} bsStyle="primary">Back</Button>
                            <Button onClick={() => {
                                console.log("next")
                            }} bsStyle="primary">Next</Button>
                        </div>
                    </Col>
                </Row>
            </footer>
        </div>);
    }


}
