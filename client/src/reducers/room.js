import { GET_ROOM, GET_USER_ROOMS } from '../actions/types';

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

    default:
      return state;
  }
}
