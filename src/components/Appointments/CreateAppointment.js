import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "../Main/Main";
import { createAppointment } from "../../store/actions/appointmentsActions";
import { compose } from "redux";
import { DatePicker } from "react-materialize";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom"
import moment from "moment";

class CreateAppointment extends Component {
    state = {
        description: '', 
        hairStyle: null,
        nailStyle: null, 
        employee: null
    }

    componentDidMount(){
        const { success } = this.props;
        if(success){
            this.props.history.push('/appointments')
        }
    }

    handleCalendar = (e) => {
        const key = e.target.id;
        const val = e.target.value;

        const newState = {...this.state};
        newState[key] = val;
        this.setState(newState);
    }

    handleSubmits = async (e) => {
        e.preventDefault();

        this.props.createAppointment(this.state);
    };

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    handleEmployeeChange = (e) => {
        const inEmployee = this.props.employees ? this.props.employees.filter(emp => e.target.value === emp.id) : null;
        
        this.setState({
            employee: inEmployee[0]
        })
    }

    handleHairStyleChange = (e) => {
        const inHair = this.props.hairStyles ? this.props.hairStyles.filter(hairStyle => e.target.value === hairStyle.id) : null;
        
        this.setState({
            hairStyle: inHair[0]
        })
    }

    handleNailStyleChange = (e) => {
        const inNail = this.props.nails ? this.props.nails.filter(nailStyle => e.target.value === nailStyle.id) : null;
        
        this.setState({
            nailStyle: inNail[0]
        });
    }

    handleTimeSlotsChange = (e) => {
        const inTimeSlot = this.props.timeSlots ? this.props.timeSlots.filter(timeSlot => e.target.value === timeSlot.id) : null;
        
        this.setState({
            timeSlot: inTimeSlot[0]
        });
    }

    render() {
        const { nails, hairStyles, employees, timeSlots, authError, success } = this.props;
        
        return (
            <Main>
                <div className="container">
                    <form onSubmit={this.handleSubmits} className="white">
                        <h5 className="brown-text text-darken-2">Create Appointment</h5>
                        <div className="input-field">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className="materialize-textarea" onChange={this.handleChange} required={true} aria-required={true}></textarea>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s6 m6">
                                <select className="browser-default" onChange={this.handleHairStyleChange} defaultValue={'DEFAULT'} id="hairStyle" required={true} aria-required={true}>
                                    <option value="DEFAULT" disabled>Select Hair Style</option>
                                    {hairStyles && hairStyles.map((hairStyle) =>{
                                        return <option key={hairStyle.id} value={hairStyle.id}>{hairStyle.style}</option>
                                    })}
                                </select>
                                { this.state.hairStyle ? 
                                    <div className="">
                                        <div className="card z-depth-2 appointment-summary">
                                            <div className="card-content grey-text text-darken-3">
                                                <span className="card-title">{this.state.hairStyle.style.toUpperCase()}</span>
                                                <p>{this.state.hairStyle.description}</p>
                                            </div>
                                            <div className="card-action">
                                                <p>${this.state.hairStyle.price}</p>
                                            </div>
                                        </div>
                                    </div> : null
                                }
                            </div>
                            <div className="input-field col s6 m6">
                                <select className="browser-default" onChange={this.handleNailStyleChange} defaultValue={'DEFAULT'} id="nailStyle" required={true} aria-required={true}>
                                    <option value="DEFAULT" disabled>Select Nail Style</option>
                                    {nails && nails.map((nail) =>{
                                        return <option key={nail.id} value={nail.id}>{nail.style}</option>
                                    })}
                                </select>
                                { this.state.nailStyle ? 
                                    <div className="">
                                        <div className="card z-depth-2 appointment-summary">
                                            <div className="card-content grey-text text-darken-3">
                                                <span className="card-title">{this.state.nailStyle.style.toUpperCase()}</span>
                                                <p>{this.state.nailStyle.description}</p>
                                            </div>
                                            <div className="card-action">
                                                <p>${this.state.nailStyle.price}</p>
                                            </div>
                                        </div>
                                    </div> : null
                                }
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6 m6">
                                <select className="browser-default" onChange={this.handleEmployeeChange} defaultValue={'DEFAULT'} id="employee" required={true} aria-required={true}>
                                    <option value="DEFAULT" disabled>Select Employee</option>
                                    {employees && employees.map(employee => <option key={employee.id} value={employee.id}>{employee.firstName + " " + employee.lastName}</option>)}
                                </select>
                            </div>
                            <div className="col s6 m6">
                                { this.state.employee ? <img className="materialboxed" src={this.state.employee.picture} width="300" /> : null }
                            </div>
                        </div>
                        <div className="row">
                            <React.Fragment>
                            <div className="col s6">
                                <i className="material-icons prefix">date_range</i>
                                <DatePicker
                                    value={moment(this.state.day).format('ddd D, MMM')}
                                    readOnly
                                    id="day"
                                    onChange={(newDate) => {
                                        this.handleCalendar({
                                            target: {
                                                id: "day",
                                                value: newDate
                                            }
                                        })
                                    }} />
                            </div>
                            </React.Fragment>
                            <select className="browser-default col s6 m6" onChange={this.handleTimeSlotsChange} defaultValue={'DEFAULT'} id="timeSlot" required={true} aria-required={true}>
                                <option value="DEFAULT" disabled>Select Time Slot</option>
                                {timeSlots && timeSlots.map((timeSlot) =>{
                                    return <option key={timeSlot.id} value={timeSlot.id}>{timeSlot.from} - {timeSlot.to}</option>
                                })}
                            </select>
                        </div>
                        <span className="red-text darken-text-4" name="errors">{authError}</span>
                        
                        <div className="input-field">
                            <button className="btn green z-depth-2">Create Appointment</button>
                        </div>
                    </form>
                </div>
            </Main>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createAppointment: (appointment) => dispatch(createAppointment(appointment)),
    }
}

const mapStateToProps = (state) => {
    
    return {
        hairStyles: state.firestore.ordered.hairStyles,
        nails: state.firestore.ordered.nails,
        employees: state.firestore.ordered.employees,
        timeSlots: state.firestore.ordered.timeSlots,
        authError: state.appointments.authError,
        success: state.appointments.success
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'hairStyles'},
        { collection: 'nails'},
        { collection: 'users',
          where: [['employee', '==', true]],
          storeAs: 'employees'
        },
        { collection: 'timeSlots', orderBy: ['createdAt', 'asc']}
    ])
)(withRouter(CreateAppointment));