import React, {Component} from "react";
import {MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.min.css";
import "./App.css";
import Routes from "./Routes";
import moment from "moment";
import esLocale from "moment/locale/es";
moment.updateLocale('es', esLocale);
const baseContext = "mel";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
        this.onRouteChanged = this.onRouteChanged.bind(this);
    }

    onRouteChanged(nextRoute) {
        this.setState({showMenu: nextRoute.pathname !== "/" && nextRoute.pathname !== "/registration" });
    };

    componentDidMount() {
        //double check
        if (!this.state.showMenu) {
            let tokens = window.location.pathname.split("/");
            if (tokens.length > 2 && tokens[2] && tokens[2] !== "registration") {
                this.setState({showMenu: true})
            }
        }
    }

    render() {
        return (
            <div>
                {this.renderNavbar()}
                <Routes onRouteChanged={this.onRouteChanged}/>
            </div>
        );
    }

    renderNavbar() {
        if (this.state.showMenu)
            return (
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href={`/${baseContext}/Home`}>MEL</a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Juan Del Pueblo" id="navbarResponsive">
                            <MenuItem eventKey="profile">Perfil</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="logout" href="/mel/">
                                Salir
                            </MenuItem>
                        </NavDropdown>

                    </Nav>
                </Navbar>
            );

        return (null);
    }


}

export default withRouter(App)
