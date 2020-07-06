const initState = {
    authError: null,
    success: null
}

const appointmentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_APPOINTMENT':
            return {
                ...state,
                authError: null,
                success: action.success
            }
        case 'CREATE_APPOINTMENT_ERROR':
            return {
                ...state,
                authError: action.err,
                success: null
            }
        case 'RESTORE':
            return{
                ...state,
                authError: null,
                success: null
            }
        default:
            return state;
    }
}

export default appointmentReducer;