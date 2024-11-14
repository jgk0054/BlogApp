import axios from 'axios';


export const loginUser = (username, password) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data.user
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response ? error.response.data : 'Login failed'
    });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: 'LOGOUT'
  });
};
