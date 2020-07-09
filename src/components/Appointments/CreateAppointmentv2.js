import React, { useState, useEffect } from "react";
import Main from "../Main/Mainv2";
import { DatePicker } from "react-materialize";
import { withRouter } from "react-router-dom";
import { useFirestore, useFirestoreCollection, useFirestoreDocData, useUser } from 'reactfire';
import moment from "moment";

const CreateAppointment = (props) => {
    const initState = {
        description: '', 
        hairStyle: null,
        nailStyle: null, 
        employee: null,
        day: null,
        timeSlot: null
    }

    const [appointment, setAppointment] = useState(initState);
    const [valError, setValError] = useState({});
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null);

    const user = useUser();
    const firestore = useFirestore();
    const userProfileRef = firestore.collection('users').doc(user ? user.uid: '1');

    const profile = useFirestoreDocData(userProfileRef);

    ////Section for data retrieval
    const collections = {
        hairStyles: [],
        nailStyles: [],
        employees: [],
        timeSlots: []
    }
    
    const hairRef = useFirestoreCollection(firestore.collection('hairStyles'));
    hairRef.forEach(hairStyle => {
        collections.hairStyles.push({...hairStyle.data(), id: hairStyle.id})
    })

    const nailsRef = useFirestoreCollection(firestore.collection('nails'));
    nailsRef.forEach(nailStyle => {
        collections.nailStyles.push({...nailStyle.data(), id: nailStyle.id})
    })

    const timeSlotsRef = useFirestoreCollection(firestore.collection('timeSlots').orderBy('createdAt', 'asc'));
    timeSlotsRef.forEach(timeSlot => {
        collections.timeSlots.push({...timeSlot.data(), id: timeSlot.id})
    })

    const employeesRef = useFirestoreCollection(firestore.collection('users').where('employee', '==', true));
    employeesRef.forEach(employee => {
        collections.employees.push({...employee.data(), id: employee.id})
    })
    /////End of data retrieval

    const handleCalendar = (e) => {
        const key = e.target.id;
        const val = e.target.value;

        const newState = {...appointment};
        newState[key] = val;
        setAppointment(newState);
    }

    const handleSubmits = async (e) => {
        e.preventDefault();

        var err = null;

        for(const field in appointment) {
            if(!appointment[field]){
                err = {...err, [field]: 'Please provide a valid ' + field};
            }
        }

        if(!err){
            var day = appointment.day.toString();

            setAppointment(prev => ({...prev, day: day}));

            firestore.collection('appointments').add({
                ...appointment,
                custFName: profile.firstName,
                custLName: profile.lastName,
                custId: user.uid,
                createdAt: new Date()
            }).then(() => {
                setSuccess('Complete');
            }).catch((err) => {
                setServerError(err.message);
            });

        }else{
            setValError(err);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        setAppointment(prev => ({...prev, [id]: value}))
    }

    //This fucntion is built to be used with dropdown menus in this component
    const handleDropDownChange = (e) => {
        const { id, value } = e.target;

        const dropodownSelection = collections[id + 's'] ? collections[id + 's'].filter(currObj => value === currObj.id) : null;
        
        if(dropodownSelection){
            setAppointment(prev => ({...prev, [id]: dropodownSelection[0]}))
        }
    }

    useEffect(() => {
        if(success){
            props.history.push('/appointments');
        }
    });
    
    return (
        <Main>
            <div className="container">
                <form onSubmit={handleSubmits} className="white">
                    <h5 className="brown-text text-darken-2">Create Appointment</h5>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className="materialize-textarea" onChange={handleChange} ></textarea>
                        <span className="red-text darken-text-4" name="errors">{valError && valError.description}</span>
                    </div>
                    
                    <div className="row">
                        <div className="input-field col s6 m6">
                            <select className="browser-default" onChange={handleDropDownChange} defaultValue={'DEFAULT'} id="hairStyle">
                                <option value="DEFAULT" disabled>Select Hair Style</option>
                                {collections.hairStyles && collections.hairStyles.map((hairStyle) =>{
                                    return <option key={hairStyle.id} value={hairStyle.id}>{hairStyle.style}</option>
                                })}
                            </select>
                            <span className="red-text darken-text-4" name="errors">{valError && valError.hairStyle}</span>
                            { appointment.hairStyle ? 
                                <div className="">
                                    <div className="card z-depth-2 appointment-summary">
                                        <div className="card-content grey-text text-darken-3">
                                            <span className="card-title">{appointment.hairStyle.style.toUpperCase()}</span>
                                            <p>{appointment.hairStyle.description}</p>
                                        </div>
                                        <div className="card-action">
                                            <p>${appointment.hairStyle.price}</p>
                                        </div>
                                    </div>
                                </div> : null
                            }
                        </div>
                        <div className="input-field col s6 m6">
                            <select className="browser-default" onChange={handleDropDownChange} defaultValue={'DEFAULT'} id="nailStyle">
                                <option value="DEFAULT" disabled>Select Nail Style</option>
                                {collections.nailStyles && collections.nailStyles.map((nail) =>{
                                    return <option key={nail.id} value={nail.id}>{nail.style}</option>
                                })}
                            </select>
                            <span className="red-text darken-text-4" name="errors">{valError && valError.nailStyle}</span>
                            { appointment.nailStyle ? 
                                <div className="">
                                    <div className="card z-depth-2 appointment-summary">
                                        <div className="card-content grey-text text-darken-3">
                                            <span className="card-title">{appointment.nailStyle.style.toUpperCase()}</span>
                                            <p>{appointment.nailStyle.description}</p>
                                        </div>
                                        <div className="card-action">
                                            <p>${appointment.nailStyle.price}</p>
                                        </div>
                                    </div>
                                </div> : null
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6 m6">
                            <select className="browser-default" onChange={handleDropDownChange} defaultValue={'DEFAULT'} id="employee">
                                <option value="DEFAULT" disabled>Select Employee</option>
                                {collections.employees && collections.employees.map(employee => <option key={employee.id} value={employee.id}>{employee.firstName + " " + employee.lastName}</option>)}
                            </select>
                            <span className="red-text darken-text-4" name="errors">{valError && valError.employee}</span>
                        </div>
                        <div className="col s6 m6">
                            { appointment.employee ? <img className="materialboxed" src={appointment.employee.picture} width="300" /> : null }
                        </div>
                    </div>
                    <div className="row">
                        <React.Fragment>
                        <div className="col s6">
                            <i className="material-icons prefix">date_range</i>
                            <DatePicker
                                value={moment(appointment.day).format('ddd D, MMM')}
                                readOnly
                                id="day"
                                onChange={(newDate) => {
                                    handleCalendar({
                                        target: {
                                            id: "day",
                                            value: newDate
                                        }
                                    })
                                }} />
                            <span className="red-text darken-text-4" name="errors">{valError && valError.day}</span>
                        </div>
                        </React.Fragment>

                        <select className="browser-default col s6 m6" onChange={handleDropDownChange} defaultValue={'DEFAULT'} id="timeSlot">
                            <option value="DEFAULT" disabled>Select Time Slot</option>
                            {collections.timeSlots && collections.timeSlots.map((timeSlot) =>{
                                return <option key={timeSlot.id} value={timeSlot.id}>{timeSlot.from} - {timeSlot.to}</option>
                            })}
                        </select>
                        <span className="red-text darken-text-4" name="errors">{valError && valError.timeSlot}</span>
                    </div>
                    
                    <div className="input-field">
                        <button className="btn green z-depth-2">Create Appointment</button>
                        <span className="red-text darken-text-4" name="errors">{serverError && serverError.timeSlot}</span>
                    </div>
                </form>
            </div>
        </Main>
    );
};

export default withRouter(CreateAppointment);