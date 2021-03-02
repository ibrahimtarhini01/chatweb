import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import chat from './chat';
import room from './room';

export default combineReducers({ auth, alerts, chat, room });
