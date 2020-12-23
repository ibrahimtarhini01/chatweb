//import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import {
  AUTH_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  AUTH,
  RESET_PASSWORD,
} from '../actions/types';

const initialState = {
  reset: false,
  sent: false,
  isAuthenticated: false,
  loading: true,
  user: null,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        sent: true,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        reset: true,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
      };
    default:
      return state;
  }
}
