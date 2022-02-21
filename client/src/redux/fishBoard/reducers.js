import { ADD_FISH } from './types';
import { AXIOS_FISH_REQUEST, AXIOS_FISH_SUCCESS, AXIOS_FISH_FAILURE } from './types';
const initialState = {
   
    src:'',
    fish_name:'',
    size:'',
    ranked:1    
}       



export  const fishBoardReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_FISH: 
            return {
                ...state,
                src: action.payload.src,
                fish_name: action.payload.fish_name,
                size: action.payload.size
            }
        default: return state    
    }
}



