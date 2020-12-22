import { AUTH_SUCCESS, LOGOUT, USER_LOADED, AUTH_ERROR, AUTH } from './types';
import api from '../utils/api';
//import { setAlert } from './alerts';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/user/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const confirmUser = (token) => async (dispatch) => {
  try {
    await api.get('/auth/confirmation/' + token);
  } catch (error) {
    console.log(error);
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    await api.post('/auth/register', formData);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const body = { username, password };
  try {
    const res = await api.post('/auth/login', body);
    dispatch({ type: AUTH_SUCCESS, payload: res.data.data });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const isAuth = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/check');
    dispatch({ type: AUTH, payload: res.data.data });
    if (res.data.data) {
      dispatch(loadUser());
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.get('/auth/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err);
  }
};

export const changePassword = (currentPassword, newPassword) => async (
  dispatch,
) => {
  try {
    await api.put(`/auth/password`, { currentPassword, newPassword });
    dispatch(setAlert('Password Changed Successfully ', 'info'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
  }
};
export const deleteUser = () => async (dispatch) => {
  try {
    await api.delete(`/auth/delete`);
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err);
  }
};
