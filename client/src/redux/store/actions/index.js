import {
  LOG_IN,
  LOG_OUT,
  UPDATE_INFO,
  CONFIRM_MODAL_ON,
  MODAL_OFF,
  FISH_BOARD_REQUEST,
  FISH_BOARD_SUCCESS,
  FISH_BOARD_FAILURE,
  TARGET_FIND,
  UPDATE_FISH,
  SIDE_BAR_ON,
  SIDE_BAR_OFF,
} from "./actionTypes";
import axios from "axios";

export const loginAction = (data) => ({
  type: LOG_IN,
  payload: { ...data },
});

export const logoutAction = {
  type: LOG_OUT,
};

export const updateInfoAction = (data) => ({
  type: UPDATE_INFO,
  payload: {
    ...data,
  },
});

export const confirmModalOnAction = {
  type: CONFIRM_MODAL_ON,
};

export const modalOffAction = {
  type: MODAL_OFF,
};

// FishBoard
export const fishBoardRequestAction = () => {
  return {
    type: FISH_BOARD_REQUEST,
  };
};

export const fishBoardSuccessAction = (data) => {
  return {
    type: FISH_BOARD_SUCCESS,
    payload: data,
  };
};

export const fishBoardFailureAction = (error) => {
  return {
    type: FISH_BOARD_FAILURE,
    payload: error,
  };
};

export const fishBoard = (email, page, token) => {
  return (dispatch) => {
    dispatch(fishBoardRequestAction());
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}fish/board?email=${email}&page=${page}`,
        {
          headers: { authorizationtoken: token },
        }
      )
      .then((data) => dispatch(fishBoardSuccessAction(data.data)))
      .catch((error) => dispatch(fishBoardFailureAction(error)));
  };
};

// UpdateFish
export const targetFind = (fish) => {
  return {
    type: TARGET_FIND,
    payload: fish,
  };
};

export const updateFish = () => {
  return {
    type: UPDATE_FISH,
  };
};

export const sideBarOn = {
  type: SIDE_BAR_ON,
};

export const sideBarOff = {
  type: SIDE_BAR_OFF,
};
