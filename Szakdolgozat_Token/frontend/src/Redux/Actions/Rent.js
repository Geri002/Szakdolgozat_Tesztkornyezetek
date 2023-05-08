import axios from 'axios'
import { toast } from 'react-toastify';


export const rentCar = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try{

        await axios.post('/api/rent/rentcar', reqObj);
        toast.success("Sikeresen lefoglaltad az autót!")
        dispatch({type: 'LOADING', payload: false});


    }catch(error){
        console.log(error);
        dispatch({type: 'LOADING', payload: false});
        toast.error("Hiba, kérlek próbáld újra később!")
    }

}