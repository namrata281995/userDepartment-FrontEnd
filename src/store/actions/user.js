import axios from '../../axios/axiosInstance'

import {
    LOG_IN_SUCESS,
    LOG_IN_FAIL,
    LOG_OUT
} from '../types/types'

export const userlogin = (user) => async (dispatch) => {
    try { 
    //request to get user data
    const res = await axios.post('/user/login', user)  
    //dispatch payload to the reducer
         dispatch({
             type : LOG_IN_SUCESS,
             payload : res.data
        })
        return true;
    }
    catch(e) {
        dispatch({
        type : LOG_IN_FAIL
      })
      return false
    }
}

export const userlogout = () => async (dispatch) => {
    try { 
    //request to get user data
    const res = await axios.post('/user/logout')  
    //dispatch payload to the reducer
         dispatch({
             type : LOG_OUT
        })
    }
    catch(e) {
        dispatch({
        type : LOG_IN_FAIL
      })
    }
}