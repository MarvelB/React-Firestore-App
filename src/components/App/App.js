import React from "react";
import { Switch, Route } from "react-router-dom";
// Next lines are for Redux
// import Home from "../Home/Home";
// import Login from "../Login/Login";
// import SignUp from "../SignUp/SignUp";
// import Profile from "../Profile/Profile";
// import Appointments from "../Appointments/Appointments";
// import DinamicRoute from "../DinamicRoute";
// import AppointmentDetails from "../Appointments/AppointmentDetails";
// import CreateAppointment from "../Appointments/CreateAppointment";
// import NailStyles from "../Nails/NailStyles";
// import HairStyles from "../HairStyles/HairStyles";

//Following lines are for React Hooks
import Home from "../Home/Homev2";
import Login from "../Login/Loginv2";
import SignUp from "../SignUp/SignUpv2";
import Profile from "../Profile/Profilev2";
import Appointments from "../Appointments/Appointmentsv2";
import CreateAppointment from "../Appointments/CreateAppointmentv2";
import NailStyles from "../Nails/NailStylesv2";
import HairStyles from "../HairStyles/HairStylesv2";
import { AuthCheck } from 'reactfire';

const App = () => {

    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/nails" component={NailStyles} />
            <Route exact path="/hairStyles" component={HairStyles} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <AuthCheck fallback={<Home />}>
                <Route exact path="/create-appointment" component={CreateAppointment} />
            </AuthCheck>
            
        </Switch>
    );

    // return (
    //     <Switch>
    //         <Route exact path="/" component={Home} />
    //         <Route exact path="/nails" component={NailStyles} />
    //         <Route exact path="/hairStyles" component={HairStyles} />
    //         <DinamicRoute exact path="/login" component={Login} />
    //         <DinamicRoute exact path="/signup" component={SignUp} />
    //         <DinamicRoute exact path="/profile" component={Profile} />
    //         <DinamicRoute exact path="/appointment/:id" component={AppointmentDetails} />
    //         <DinamicRoute exact path="/appointments" component={Appointments} />
    //         <DinamicRoute exact path="/create-appointment" component={CreateAppointment} />
    //     </Switch>
    // )
}

export default App;