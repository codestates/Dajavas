import { LOG_IN, LOG_OUT, UPDATE_INFO } from "../../actions/actionTypes";

const initialState = {
    isLogin: false,
    id: '',
    email: '',
    nickname: '',
    login_method: '',
    accessToken: '',
};

const userReducer = (prevState = initialState, action) => {
    let state;
    switch(action.type) {
        case LOG_IN:
            state = {
                ...prevState,
                isLogin: true,
                ...action.payload,
            };
            break;
        case LOG_OUT:
            state = {...initialState};
            break;
        case UPDATE_INFO:
            state = {
                ...prevState,
                nickname: 'action.payload.data.nickname',
            };
            break;
        default:
            state = {...prevState};
    }
    return state;
};

export default userReducer;