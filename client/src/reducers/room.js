import {
  CLEAR_ROOM,
  CLEAR_ROOM_PREVIEW,
  CREATE_ROOM,
  GET_ROOM,
  GET_USER_ROOMS,
  LEAVE_ROOM,
  PREVIEW_ROOM,
  ROOM_AVATAR,
} from '../actions/types';

const initialState = {
  room: null,
  userRooms: null,
  roomLoading: true,
  userRoomsLoading: true,
  roomPreview: null,
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
        roomLoading: null,
        next: true,
      };
    case ROOM_AVATAR:
      return {
        ...state,
        userRooms: [...state.userRooms.slice(0, -1), payload],
        room: payload,
        roomLoading: false,
      };
    case LEAVE_ROOM:
      return {
        ...state,
        userRooms: state.userRooms.filter(
          (room) => room._id + ' ' !== payload + ' ',
        ),
        room: null,
        roomLoading: true,
        next: false,
      };
    case PREVIEW_ROOM:
      return { ...state, roomPreview: payload };
    case CLEAR_ROOM:
      return {
        ...state,
        room: null,
        roomLoading: true,
        next: false,
      };
    case CLEAR_ROOM_PREVIEW:
      return {
        ...state,
        roomPreview: null,
      };

    default:
      return state;
  }
}
