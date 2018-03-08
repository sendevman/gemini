import React, {Component} from "react";
import {MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.min.css";
import "./App.css";
import Routes from "./Routes";
import moment from "moment";
import esLocale from "moment/locale/es";
import {connect} from "react-redux";
import {checkSession, logout} from "./redux/actions";
import * as types from "./redux/types";
import ReduxBlockUi from 'react-block-ui/redux';
import {bindActionCreators} from "redux";
import * as env from "./env";

moment.updateLocale('es', esLocale);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {showMenu: false};
        this.onRouteChanged = this.onRouteChanged.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
    }

    componentWillMount() {
        this.props.checkSession();
    }

    onRouteChanged(nextRoute) {
        this.setState({showMenu: !env.isPublicUrl(nextRoute.pathname) && this.props.authenticated});
    };

    handleLogout() {
        this.props.logout(() => {
            this.props.history.push(`/`);
        });
    }

    goToProfile() {
        this.props.history.push("/profile");
    }

    componentDidMount() {
        //double check
        if (!this.state.showMenu) {
            let path = this.props.location.pathname;
            if (!env.isPublicUrl(path)) {
                this.setState({showMenu: true})
            }
        }
    }

    render() {
        return (
            <ReduxBlockUi tag="div" block={types.blockUIActions} unblock={types.unblockUIActions}>
                <div>
                    {this.renderNavbar()}
                    <Routes loading={this.props.loading} authenticated={this.props.authenticated}
                            onRouteChanged={this.onRouteChanged}/>
                </div>
            </ReduxBlockUi>
        );
    }

    renderNavbar() {
        if (this.state.showMenu)
            return (
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href={`/${env.default.baseContext}/home`}>SRS Student Registration System</a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={this.props.fullName} id="navbarResponsive">
                            <MenuItem eventKey="profile" onClick={this.goToProfile}>
                                Perfil
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="logout" onClick={this.handleLogout}>
                                Salir
                            </MenuItem>
                        </NavDropdown>

                    </Nav>
                </Navbar>
            );

        return (null);
    }
}

function mapStateToProps(store) {
    return {
        fullName: store.profile.user.fullName || "Sin Nombre",
        authenticated: store.profile.authenticated,
        loading: store.profile.loading
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({logout, checkSession}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(App));
