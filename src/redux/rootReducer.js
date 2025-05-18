import { combineReducers } from 'redux';
import userReducer from './reducer/user';

const rootReducer = combineReducers({
    userState: userReducer,
});

export default rootReducer;