import React from "react";
import { Link } from "react-router-dom";

const NailStyle = ({nailStyle, blockLink}) => {
    
    return (
        <div className="col s6 m6">
            <div className="card z-depth-2 appointment-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{nailStyle.style.toUpperCase()}</span>
                    <div>{nailStyle.description}</div>
                </div>
                <div className="card-action">
                    <Link to="#">${nailStyle.price}</Link>
                    { blockLink ? null : <Link to="/create-appointment">
                        <span className="btn">Book Appointment</span>
                    </Link>}
                </div>
            </div>
        </div>
    );
};

export default NailStyle;