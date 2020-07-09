import React from "react";
import Navbar from "../Navbar/Navbarv2";
import NavbarSignedIn from "../Navbar/NavbarSignedIn";
import Sidenav from "../Sidenav/Sidenavv2";
import { withRouter } from "react-router";
import { AuthCheck } from "reactfire";
import { useAuth, useFirestore } from 'reactfire';

const Main = (props) => {
    const firebase = useAuth();
    const firestore = useFirestore();
    
    return(
        <div>
            <AuthCheck fallback={<Navbar />}>
                <NavbarSignedIn firestore={firestore} firebase={firebase} />
                <Sidenav firestore={firestore} firebase={firebase} />
            </AuthCheck>
            
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default withRouter(Main);