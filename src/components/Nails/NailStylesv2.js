import React from "react";
import NailStyle from "./NailStyle";
import Main from "../Main/Mainv2";
import { withRouter } from "react-router";
import { useFirestore, useFirestoreCollection } from 'reactfire';

const NailStyles = (props) => {

    const nailStyles = [];
    const nailsRef = useFirestoreCollection(useFirestore().collection('nails'));
    nailsRef.forEach(nailStyle => {
        //console.log(nailStyle)
        nailStyles.push({...nailStyle.data(), id: nailStyle.id})
    })
    
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

export default withRouter(NailStyles);