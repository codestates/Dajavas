import { combineReducers } from 'redux';
import modalReducer from './modalReducer/modalReducer';
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
    modalReducer,
    userReducer,
});

export default rootReducer;