import { combineReducers } from "redux";
import { fishBoardReducer } from './fishBoard/reducers';
import { fishRecordReducer } from './fishList/reducers'
//import fishRecordReducer from './fishBoard/reducers';

const rootReducer = combineReducers({
   /*  board: fishBoardReducer, */
    board: fishBoardReducer,
    record: fishRecordReducer

})

export default rootReducer;