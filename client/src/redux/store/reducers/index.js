import { combineReducers } from 'redux';
import modalReducer from './modalReducer/modalReducer';
import userReducer from './userReducer/userReducer';
import fishBoardReducer from './fishBoardReducer/fishBoardReducer';
import updateFishReducer from './updateFishReducer/updateFishReducer';
import sideBarReducer from './sideBarReducer/sideBarReducer';

const rootReducer = combineReducers({
    modalReducer,
    userReducer,
    fishBoardReducer,
    updateFishReducer,
    sideBarReducer,
});

export default rootReducer;