import {
    LOG_IN,
    LOG_OUT,
    UPDATE_INFO,
    CONFIRM_MODAL_ON,
    MODAL_OFF,

} from './actionTypes';

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