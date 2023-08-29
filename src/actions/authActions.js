import axios from 'axios';
import { LOGIN_USER, LOGIN_FAIL, SET_USER, LOGOUT_USER } from '../reducers/authReducer'

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = (username, password) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });

    const { data } = response;
    localStorage.setItem('token', data.token);

    // Dispatch the LOGIN_USER action with both token and user data
    dispatch({ type: LOGIN_USER, payload: { token: data.token, user: data.user }});
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove token from local storage
  return {
    type: LOGOUT_USER
  };
};

export const setUser = (userData) => {
  return {
      type: SET_USER,
      payload: userData
  };
};
