import {
  CLEAR_ROOM,
  CLEAR_ROOM_PREVIEW,
  CREATE_ROOM,
  GET_ROOM,
  GET_USER_ROOMS,
  LEAVE_ROOM,
  PREVIEW_ROOM,
  ROOM_AVATAR,
  CLEAR_ROOMS,
  SET_LAST_MESSAGE,
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
    case SET_LAST_MESSAGE: {
      return {
        ...state,
        room:
          state.room !== null
            ? {
                ...state.room,
                lastMessage: {
                  message: payload.message,
                  username: payload.sender.username,
                  createdAt: Date.now(),
                },
                chat: [
                  ...state.room.chat,
                  {
                    message: payload.message,
                    sender: payload.sender,
                    room: payload.room,
                    createdAt: Date.now(),
                  },
                ],
              }
            : null,
        userRooms: state.userRooms.map((room, id) =>
          payload.room === room._id
            ? {
                ...room,
                lastMessage: {
                  message: payload.message,
                  username: payload.sender.username,
                  createdAt: Date.now(),
                },
                chat: [
                  ...room.chat,
                  {
                    message: payload.message,
                    sender: payload.sender,
                    room: payload.room,
                    createdAt: Date.now(),
                  },
                ],
              }
            : room,
        ),
      };
    }
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
    case CLEAR_ROOMS: {
      return {
        room: null,
        userRooms: null,
        roomLoading: true,
        userRoomsLoading: true,
        roomPreview: null,
        next: false,
      };
    }

    default:
      return state;
  }
}
