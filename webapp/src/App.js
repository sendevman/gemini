import React, {Component} from "react";
import {MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
        this.onRouteChanged = this.onRouteChanged.bind(this);
    }

    onRouteChanged(nextRoute) {
        this.setState({showMenu: nextRoute.pathname !== "/"});
    };

    componentDidMount() {
        if (!this.state.showMenu) {
            if (window.location.pathname !== "/") {
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
                            <a href="#home">MEL</a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Juan Del Pueblo" id="navbarResponsive">
                            <MenuItem eventKey="profile">Perfil</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="logout" href="/">
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
