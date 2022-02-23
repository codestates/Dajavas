import {
    LOG_IN,
    LOG_OUT,
    UPDATE_INFO,
    CONFIRM_MODAL_ON,
    MODAL_OFF,
    FISH_BOARD, 
    FISH_BOARD_REQUEST, 
    FISH_BOARD_SUCCESS,
    FISH_BOARD_FAILURE
} from './actionTypes';
import axios from 'axios';

export const loginAction = (data) => ({
    type: LOG_IN,
    payload: {...data},
});

export const logoutAction = {
    type: LOG_OUT,
};

export const updateInfoAction = (data) => ({
    type: UPDATE_INFO,
    payload: {
        ...data,
    }
});

export const confirmModalOnAction = {
    type: CONFIRM_MODAL_ON,
};

export const modalOffAction = {
    type: MODAL_OFF,
}


// FishBoard 
export const fishBoardRequestAction = () => {
    return {
        type: FISH_BOARD_REQUEST,
    }
}

export const fishBoardSuccessAction = (data) => {
    return {
        type: FISH_BOARD_SUCCESS,
        payload:data
    }
}

export const fishBoardFailureAction = (error) => {
    return {
        type: FISH_BOARD_FAILURE,
        payload: error
    }
}

//*thunk를 사용하면 action에서 dispatch를 인자로 갖는 함수를 만들 수 있다. 
// action에서 직접 외부api요청을 보낼 수 있다. 
export const fishBoard = () => {
    return (dispatch) => {
        dispatch(fishBoardRequestAction())
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(result => result.json())
        .then(data => dispatch(fishBoardSuccessAction(data)))
        .catch(error => dispatch(fishBoardFailureAction(error)))
    } 
}

