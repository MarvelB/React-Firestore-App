import React, {useState} from 'react';
import nailsMethods from "../Firebase/nailsMethods";

export const firebaseNails = React.createContext();

const NailsProvider = (props) => {
    const initState = {nailStyles: []}
    const [nailStyles, setNailStyles] = useState(initState);
    const [errors, setErrors] = useState([]);

    const getNailStyles = () => {
        nailsMethods.getNailStyles(setErrors, setNailStyles);
    }

    return(
        <firebaseNails.Provider
        value= {{
            getNailStyles,
            nailStyles,
            errors
        }}>
            {props.children}
        </firebaseNails.Provider>
    )
}

export default NailsProvider;