import React from "react";
import HairStyle from "./HairStyle";
import Main from "../Main/Mainv2";
import { withRouter } from "react-router";
import { useFirestore, useFirestoreCollection } from 'reactfire';

const HairStyles = (props) => {

    const hairStyles = [];
    const hairRef = useFirestoreCollection(useFirestore().collection('hairStyles'));
    hairRef.forEach(hairStyle => {
        //console.log(nailStyle)
        hairStyles.push({...hairStyle.data(), id: hairStyle.id})
    })
    
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

export default withRouter(HairStyles);