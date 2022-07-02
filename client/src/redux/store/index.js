import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // 텅크를 사용하는이유: action에서 dispatch를 가능하게해준다.
import rootReducer from "../store/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
