import React from "react";
import { Link } from "react-router-dom";

const HairStyle = ({hairStyle, blockLink}) => {
    
    return (
        <div className="col s6 m6">
            <div className="card z-depth-2 appointment-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{hairStyle.style.toUpperCase()}</span>
                    <p>{hairStyle.description}</p>
                </div>
                <div className="card-action">
                    <Link to="#">${hairStyle.price}</Link>
                    { blockLink ? null: <Link to="/create-appointment">
                        <span className="btn">Book Appointment</span>
                    </Link>}
                </div>
            </div>
        </div>
    );
};

export default HairStyle;