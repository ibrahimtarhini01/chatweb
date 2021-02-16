import { GET_CHAT, AFTER_POST_MESSAGE } from './types';
import api from '../utils/api';

export const getChats = () => async (dispatch) => {
  const res = await api.get('/chat');
  dispatch({
    type: GET_CHAT,
    payload: res.data.data,
  });
};

export const afterPostMessage = (data) => (dispatch) => {
  dispatch({
    type: AFTER_POST_MESSAGE,
    payload: data,
  });
};
