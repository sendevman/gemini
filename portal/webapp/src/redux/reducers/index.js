import {combineReducers} from "redux";
import login from "./login"
import home from "./home";
import wizard from "./wizard";
import registration from "./registration";
import studentLookup from "./studentLookup";
import studentInfo from "./studentInfo";
import config from "./config";


export default combineReducers({login, home, wizard, registration, studentLookup, studentInfo, config})

