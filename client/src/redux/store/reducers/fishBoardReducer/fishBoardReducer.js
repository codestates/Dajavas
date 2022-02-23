import {FISH_BOARD_REQUEST, FISH_BOARD_SUCCESS, FISH_BOARD_FAILURE} from '../../actions/actionTypes'

const initialState = {
    data: [],
    loading:false,
    err:null
}

const fishBoardReducer = (state=initialState, action) => {
    switch(action.type) {
        case FISH_BOARD_REQUEST:
            return {
                ...state,
                loading:true

            }
        case FISH_BOARD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading:false
            }
        case FISH_BOARD_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading:false
            }        
        default: return state;
    }
}
export default fishBoardReducer