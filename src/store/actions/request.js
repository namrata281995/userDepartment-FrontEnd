import axios from '../../axios/axiosInstance'
import {     ADD_REQUEST, UPDATE_REQUEST, GET_REQUEST
} from '../types/types'
import socket from '../../socket/socket'

export const addrequest = (request, userdepartment) => async (dispatch) => {
    try{ 
        let res = await axios.post('/request', request); 
        socket.emit('createrequest', { userid : request.assignedTo, sender : request.createdByName ,department : userdepartment })
        dispatch(
            {
                type : ADD_REQUEST,
                payload : res.data
           }
        )
        return true
    }
    catch(e)
    {
        console.log(e)
        return false
    }
}

export const getRequests = (type) => async(dispatch) => {
    try{
        let res = {}  
        if(type === 'Department') {
        res = await axios.get(`/request/all`)
        }
        else {
            res = await axios.get(`/request/own`)
        } 
        dispatch({
            type : GET_REQUEST,
            payload : res.data,
            requesttype : type
        }) 
    }
    catch(e)
    {
        console.log(e)
    }
}

export const updateRequest = (requestid, type) => async(dispatch) => {
    try{
        let res = await axios.put(`/request/${requestid}/${type}`) 
        socket.emit('requestupdate',{ userid : res.data.createdBy, status : res.data.status, username : res.data.assignedToName})
        console.log(res)
        dispatch({
            type : UPDATE_REQUEST,
            payload : res.data,
            requesttype : type
        }) 
        return true;
    }
    catch(e)
    {
        console.log(e)
        return false
    }
}