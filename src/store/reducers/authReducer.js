const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                success: action.success
            }
        case 'SIGNOUT_SUCCESS':
            return {
                ...state,
                success: action.success
            };
        case 'SIGNUP_SUCCESS':
            return{
                ...state,
                authError: null,
                success: action.success
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'MISSING_DATA':
            return {
                ...state,
                incompleteData: action.err
            }
        default:
            return state;
    }
}

export default authReducer;