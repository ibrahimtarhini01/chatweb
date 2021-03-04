import { CLEAR_ROOM, GET_ROOM, GET_USER_ROOMS } from './types';
import api from '../utils/api';

export const createRoom = () => async (dispatch) => {};

export const joinRoom = () => async (dispatch) => {};

export const addUserRoom = () => async (dispatch) => {};

export const kick = () => async (dispatch) => {};

export const leaveRoom = () => async (dispatch) => {};

export const makeAdmin = () => async (dispatch) => {};

export const updateRoomInfo = () => async (dispatch) => {};

export const updateRoomAvatar = () => async (dispatch) => {};

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
