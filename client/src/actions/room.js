import {
  CLEAR_ROOM,
  CREATE_ROOM,
  GET_ROOM,
  GET_USER_ROOMS,
  LEAVE_ROOM,
  ROOM_AVATAR,
} from './types';
import api from '../utils/api';

export const createRoom = (data) => async (dispatch) => {
  try {
    const res = await api.post('/room', data);
    dispatch({ type: CREATE_ROOM, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const joinRoom = () => async (dispatch) => {};

export const addUserRoom = () => async (dispatch) => {};

export const kick = () => async (dispatch) => {};

export const leaveRoom = (id) => async (dispatch) => {
  try {
    await api.post(`/room/leave/${id}`);
    dispatch({ type: LEAVE_ROOM, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const makeAdmin = () => async (dispatch) => {};

export const updateRoomInfo = () => async (dispatch) => {};

export const updateRoomAvatar = (id, image) => async (dispatch) => {
  try {
    const res = await api.put(`/room/avatar/${id}`, image);
    dispatch({ type: ROOM_AVATAR, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
};

export const editPassword = () => async (dispatch) => {};

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
