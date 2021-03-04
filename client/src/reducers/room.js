import {
  CLEAR_ROOM,
  CREATE_ROOM,
  GET_ROOM,
  GET_USER_ROOMS,
  ROOM_AVATAR,
} from '../actions/types';

const initialState = {
  room: null,
  userRooms: null,
  roomLoading: true,
  userRoomsLoading: true,
  next: false,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ROOM:
      return {
        ...state,
        room: payload,
        roomLoading: false,
      };

    case GET_USER_ROOMS:
      return {
        ...state,
        userRooms: payload,
        userRoomsLoading: false,
      };
    case CREATE_ROOM:
      return {
        ...state,
        userRooms: [...state.userRooms, payload],
        room: payload,
        roomLoading: false,
        next: true,
      };
    case ROOM_AVATAR:
      return {
        ...state,
        userRooms: [...state.userRooms.slice(0, -1), payload],
        room: payload,
        roomLoading: false,
      };
    case CLEAR_ROOM:
      return {
        ...state,
        room: null,
        roomLoading: true,
        next: false,
      };

    default:
      return state;
  }
}
