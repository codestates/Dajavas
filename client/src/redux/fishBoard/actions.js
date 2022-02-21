import { ADD_FISH } from './types';




export const addFish = (photo, size, fishName) => {
    return {
        type: ADD_FISH,
        payload: {
            src: photo,
            fish_name: fishName,
            size: size,
            ranked:1   
        }
    }
}

// //여기서 dispatch를 사용할 수 있는 이유: thunk 
// export const axiosFishBoard = () =>  {
//     return(dispatch)  => {
//         axios.get("https://localhost:5000/fish/board/email?email={email}&&page?page={page}")
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.log(error))

//     }
//}