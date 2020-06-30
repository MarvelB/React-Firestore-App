import React from "react";
import HairStyle from "./HairStyle";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Main from "../Main/Main";

const HairStyles = ({hairStyles}) => {
    
    return(
        <Main>
            <div className="container content white">
                <h1 className="brown-text center">Hair Styles</h1>
                <div className="row">
                    {hairStyles && hairStyles.map( hairStyle => {
                        return(
                            <HairStyle hairStyle={hairStyle} key={hairStyle.id} />
                        )
                    })}
                </div>
            </div>
        </Main>
    )
}

const mapStateToProps = (state) => {
    
    return {
        hairStyles: state.firestore.ordered.hairStyles
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'hairStyles'}
    ])
)(HairStyles);