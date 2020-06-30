import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Profile from "../Profile/Profile";
import Appointments from "../Appointments/Appointments";
import DinamicRoute from "../DinamicRoute";
import AppointmentDetails from "../Appointments/AppointmentDetails";
import CreateAppointment from "../Appointments/CreateAppointment";
import NailStyles from "../Nails/NailStyles";
import HairStyles from "../HairStyles/HairStyles";

const App = () => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/nails" component={NailStyles} />
            <Route exact path="/hairStyles" component={HairStyles} />
            <DinamicRoute exact path="/login" component={Login} blockLoggedIn="true" />
            <DinamicRoute exact path="/signup" component={SignUp} blockLoggedIn="true" />
            <DinamicRoute exact path="/profile" component={Profile} />
            <DinamicRoute exact path="/appointment/:id" component={AppointmentDetails} />
            <DinamicRoute exact path="/appointments" component={Appointments} />
            <DinamicRoute exact path="/create-appointment" component={CreateAppointment} />
        </Switch>
    )
}

export default App;