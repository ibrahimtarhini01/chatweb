import {
  CLEAR_ROOM,
  CREATE_ROOM,
  GET_ROOM,
  GET_USER_ROOMS,
  LEAVE_ROOM,
  PREVIEW_ROOM,
  ROOM_AVATAR,
  CLEAR_ROOM_PREVIEW,
} from './types';
import api from '../utils/api';
import { setAlert } from './alerts';

export const createRoom = (data) => async (dispatch) => {
  try {
    const res = await api.post('/room', data);
    dispatch({ type: CREATE_ROOM, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const joinRoom = (id, formData) => async (dispatch) => {
  try {
    console.log(id);
    await api.post(`/room/join/${id}`, formData);
    dispatch(getRoomById(id));
    dispatch(clearRoomPreview());
    dispatch(getUserRooms());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

export const addUserRoom = () => async (dispatch) => {};

export const leaveRoom = (id) => async (dispatch) => {
  try {
    await api.post(`/room/leave/${id}`);
    dispatch({ type: LEAVE_ROOM, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const makeAdmin = (roomId, userId) => async (dispatch) => {
  try {
    await api.post(`/room/admin/${roomId}`, { user: userId });
    dispatch(getRoomById(roomId));
  } catch (error) {
    console.log(error);
  }
};

export const removeAdmin = (roomId, userId) => async (dispatch) => {
  try {
    await api.put(`/room/admin/${roomId}`, { user: userId });
    dispatch(getRoomById(roomId));
  } catch (error) {
    console.log(error);
  }
};

export const kickMember = (roomId, userId) => async (dispatch) => {
  try {
    await api.post(`/room/kick/${roomId}`, { user: userId });
    dispatch(getRoomById(roomId));
  } catch (error) {
    console.log(error);
  }
};

export const updateRoomInfo = (id, formData) => async (dispatch) => {
  try {
    await api.put(`/room/${id}`, formData);
    dispatch(getRoomById(id));
  } catch (err) {
    console.log(err);
  }
};

export const updateRoomAvatar = (id, image) => async (dispatch) => {
  try {
    const res = await api.put(`/room/avatar/${id}`, image);
    dispatch({ type: ROOM_AVATAR, payload: res.data.data });
    dispatch(getUserRooms());
  } catch (err) {
    console.log(err);
  }
};

export const getRoomInfo = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/room/preview/${id}`);
    dispatch({ type: PREVIEW_ROOM, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
};

export const getRoomById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/room/${id}`);
    dispatch({ type: GET_ROOM, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
};

export const editPassword = (id, formData) => async (dispatch) => {
  try {
    await api.post(`/room/password/${id}`, formData);
    dispatch(getRoomById(id));
    dispatch(getUserRooms());
  } catch (err) {
    console.log(err);
  }
};

export const getUserRooms = () => async (dispatch) => {
  try {
    const res = await api.get('/room');
    dispatch({ type: GET_USER_ROOMS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    console.log(100);
  }
};

export const setCurrentRoom = (data) => (dispatch) => {
  try {
    //const res = await api.get(`/room/${data}`);
    dispatch({ type: GET_ROOM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const clearRoom = () => (dispatch) => {
  dispatch({ type: CLEAR_ROOM });
};

export const clearRoomPreview = () => (dispatch) => {
  dispatch({ type: CLEAR_ROOM_PREVIEW });
};
