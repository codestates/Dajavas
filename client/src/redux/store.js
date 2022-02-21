//actions(actions.js, types.js), reducer, store

import { createStore, applyMiddleware } from 'redux';
//import { fishBoardReducer } from './fishBoard/reducers';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk' // acion에서 dispatch를 리턴해줄 수 있다.

// 미들웨어 여러개 생길 수 있으니
const middleware = [logger, thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;