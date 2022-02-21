import { AXIOS_FISH_REQUEST, AXIOS_FISH_SUCCESS, AXIOS_FISH_FAILURE } from './types'

const initialState = {
    items:[]
}
export const fishRecordReducer = (state=initialState, action) => {
    switch (action.type) {
        case AXIOS_FISH_REQUEST: 
            return {
                ...state
            }
        case AXIOS_FISH_SUCCESS:
            return {
                ...state,
                items: action.payload
            }
        case AXIOS_FISH_FAILURE: 
            return {
                ...state,
                err:action.payload
            }        
        default: return state
    }
}