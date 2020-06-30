const initState = {
    appointments: []
}

const appointmentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_APPOINTMENT':
            return state;
        case 'CREATE_APPOINTMENT_ERROR':
            return state;
        default:
            return state;
    }
}

export default appointmentReducer;