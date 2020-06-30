import authReducer from "./authReducer";
import appointmentReducer from "./appointmentsReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    appointments: appointmentReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;