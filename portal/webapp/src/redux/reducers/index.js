import {combineReducers} from "redux";
import profile from "./profile"
import home from "./home";
import wizard from "./wizard";
import registration from "./registration";
import studentLookup from "./studentLookup";
import studentInfo from "./studentInfo";
import config from "./config";
import preEnrollment from "./preEnrollment";

export default combineReducers({profile, home, wizard, registration, studentLookup, studentInfo, config, preEnrollment})

