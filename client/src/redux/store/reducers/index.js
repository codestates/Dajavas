import { combineReducers } from 'redux';
import modalReducer from './modalReducer/modalReducer';
import userReducer from './userReducer/userReducer';
import fishBoardReducer from './fishBoardReducer/fishBoardReducer';

const rootReducer = combineReducers({
    modalReducer,
    userReducer,
    fishBoardReducer
    
});

export default rootReducer;