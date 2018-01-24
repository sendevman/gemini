import React, {Component} from "react";
import {Grid} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

class App extends Component {


    render() {
        return (
            <Grid>
                <Routes/>
            </Grid>
        );
    }


}

export default App;
