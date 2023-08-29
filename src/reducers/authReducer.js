export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER = 'SET_USER';
export const LOGIN_FAIL = 'LOGIN_FAIL';


const initialState = {
    isAuthenticated: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_USER:
            return initialState;
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
