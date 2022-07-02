import { LOG_IN, LOG_OUT, UPDATE_INFO } from "../../actions/actionTypes";

const initialState = {
  isLogin: false,
  id: "",
  email: "",
  nickname: "",
  login_method: "",
  accessToken: "",
  password: "",
};

const userReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case LOG_IN:
      state = {
        ...prevState,
        isLogin: true,
        ...action.payload,
      };
      // console.log('저장한 로그인상태가 변했나요?',state)
      break;
    case LOG_OUT:
      state = { ...initialState };
      break;
    case UPDATE_INFO:
      state = {
        ...prevState,
        nickname: action.payload.data.nickname,
        password: action.payload.data.password,
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default userReducer;
