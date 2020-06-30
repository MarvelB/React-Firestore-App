import React from "react";
import NailStyle from "./NailStyle";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Main from "../Main/Main";

const NailStyles = ({nailStyles}) => {
    
    return(
        <Main>
            <div className="container content white">
                <h1 className="brown-text center">Nail Styles</h1>
                <div className="row">
                    {nailStyles && nailStyles.map( nailStyle => {
                        return(
                            <NailStyle nailStyle={nailStyle} key={nailStyle.id} />
                        )
                    })}
                </div>
            </div>
        </Main>
    )
}

const mapStateToProps = (state) => {
    
    return {
        nailStyles: state.firestore.ordered.nails
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'nails'}
    ])
)(NailStyles);