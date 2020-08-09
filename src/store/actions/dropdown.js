import { GET_ALL_DEPARTMENT, GET_ALL_ASSIGNED_USERS } from '../types/types' 
import axios from '../../axios/axiosInstance'

export const getAllDepartments = (departmentid) => async (dispatch) => {
    try{ 
    const res = await axios.get(`/department/except/${departmentid}`) 
    //dispatch payload to the reducer
    dispatch({
             type : GET_ALL_DEPARTMENT,
             payload : res.data
        })
    } 
    catch(e){
        console.log(e)
    }
}

export const getAllDepartmentUsers = (departmentid) => async (dispatch) => {
    try{
    const res = await axios.get(`/department/user/${departmentid}`) 
    //dispatch payload to the reducer
    dispatch({
             type : GET_ALL_ASSIGNED_USERS,
             payload : res.data
        })
    } 
    catch(e){
        console.log(e)
    }
}