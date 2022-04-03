import { SIDE_BAR_ON, SIDE_BAR_OFF } from "../../actions/actionTypes";

const initialState = {
    isSideBar: false,
};

const sideBarReducer = (prevState = initialState, action) => {
    let state;
    switch (action.type){
        case SIDE_BAR_ON:
            state = {...prevState, isSideBar: true};
            break;
        case SIDE_BAR_OFF:
            state = {...initialState};
            break;
        default:
            state = {...prevState};
    }
    return state;
}

export default sideBarReducer;