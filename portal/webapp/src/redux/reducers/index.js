import {combineReducers} from "redux";
import wizard from "./wizard";
import registration from "./registration";
import studentLookup from "./studentLookup";
import studentInfo from "./studentInfo";


export default combineReducers({wizard, registration, studentLookup, studentInfo})

