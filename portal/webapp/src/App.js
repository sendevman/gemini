import React, {Component} from "react";
import {MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.min.css";
// import "./App.css";
import classnames from "classnames";
import Routes from "./Routes";
import moment from "moment";
import esLocale from "moment/locale/es";
import {connect} from "react-redux";
import {checkSession, logout, onPreviousAction} from "./redux/actions";
import {blockUIActions, unblockUIActions} from "./redux/setup";
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
        this.goBack = this.goBack.bind(this);
    }

    componentWillMount() {
        if (!env.isUserActionUrl(this.props.location.pathname))
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

    goBack() {
        let pathname = this.props.location.pathname;
        if (pathname === "/wizard") {
            this.props.onPreviousAction();
        } else if (pathname !== "/")
            this.props.history.goBack();
    }

    render() {
        let pathname = this.props.location.pathname;
        let currentPageType = this.props.currentPageType;
        let baseClass = classnames({
            "signin": pathname === "/",
            "instructions": pathname === "/wizard" && currentPageType === "INSTRUCTIONS",
            "question": pathname === "/wizard" && currentPageType === "IS_VOCATIONAL_STUDENT_QUESTION"
        });
        console.log(`pathname = ${pathname} ${baseClass} ${currentPageType} ${currentPageType === "INSTRUCTIONS"}`);

        return (
            <ReduxBlockUi tag="div" block={blockUIActions()} unblock={unblockUIActions()}>
                <div className={`container-fluid ${baseClass}`}>
                    <div className="row content">
                        <div className="col-md-1 navigation-section violet d-flex align-items-center"
                             onClick={this.goBack}>
                            <i className="icon-arrow mirror"/>
                        </div>
                        <Routes loading={this.props.loading} authenticated={this.props.authenticated}
                                onRouteChanged={this.onRouteChanged}/>
                    </div>
                    <div className="row footer d-flex align-items-center">
                        <div className="col-md-1"/>
                        <div className="col-md-11">
                            <span>© 2018 All Rights Reserved</span>
                        </div>
                    </div>
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
        loading: store.profile.loading,
        currentPageType: store.wizard.currentPageType
    };
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({logout, checkSession, onPreviousAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(App));
