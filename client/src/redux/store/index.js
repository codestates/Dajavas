import { createStore, applyMiddleware } from "redux";
//import reducers from "./reducers";
import thunk from 'redux-thunk' // 텅크를 사용하는이유: action에서 dispatch를 가능하게해준다.
import logger from 'redux-logger'
import rootReducer from '../store/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [logger, thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))


// /* eslint-disable no-underscore-dangle */
// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // Redux DevTools Extension
//   /* applyMiddleware(...middleware) */
// );
// /* eslint-enable */

export default store;


