import { TARGET_FIND} from '../../actions/actionTypes'

const initialState = {

    data: null
   
}

const updateFishReducer = (state=initialState, action) => {
    switch(action.type) {
        case TARGET_FIND:
            return {
                ...state,
                data: action.payload
            }
        default: return state   
    }
}
export default updateFishReducer