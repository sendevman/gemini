/**
 * Created by fran on 1/24/18.
 */
import React, {Component} from "react";
import {Row, Well} from "react-bootstrap";

export default class NotFoundPage extends Component{

    render(){
        return (<Row>
            <Well bsSize="large">
                <h3>404 page not found</h3>
            </Well>
        </Row>);
    }

}
