import { GET_CHAT, AFTER_POST_MESSAGE } from '../actions/types';

const initialState = { chats: null };

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAT:
      return { ...state, chats: payload };
    case AFTER_POST_MESSAGE:
      return { ...state, chats: state.chats.concat(payload) };
    default:
      return state;
  }
}
