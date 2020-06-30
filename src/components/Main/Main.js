import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidenav from "../Sidenav/Sidenav";

const Main = (props) => {
    
    return(
        <div>
            <Navbar />
            <Sidenav />
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default (Main);