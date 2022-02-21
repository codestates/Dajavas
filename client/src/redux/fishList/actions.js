import { AXIOS_FISH_REQUEST, AXIOS_FISH_SUCCESS, AXIOS_FISH_FAILURE } from './types'
import axios from 'axios'

const axiosFishSuccess = (comments) => {
    return {
        type: AXIOS_FISH_SUCCESS,
        payload: comments
    }
}

const axiosFishFailure  = (error) => {
    return {
        type: AXIOS_FISH_FAILURE,
        payload: error
    }
}

const axiosFishRequest = () => {
    return {
        type: AXIOS_FISH_REQUEST
    }
}




//* 여기서 dispatch를 사용할 수 있는 이유: thunk때문( action에서 dispatch가능하게 해준다. )
export const axiosFishBoard = () =>  {
    return(dispatch)  => {
        dispatch(axiosFishRequest())
        axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(result => console.log(dispatch(axiosFishSuccess(result))))
        .catch(error => dispatch(axiosFishFailure(error)))

    }
}
