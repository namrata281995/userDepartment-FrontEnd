import { GET_ALL_DEPARTMENT, GET_ALL_ASSIGNED_USERS } from '../types/types' 

const initialstate = {
    departments : [],
    assignedusers : []
}

const dropdownReducer = (state = initialstate , action) => {
    switch(action.type)
    {
        case GET_ALL_DEPARTMENT :
        return { ...state, departments : action.payload }
        case GET_ALL_ASSIGNED_USERS : 
        return { ...state, assignedusers : action.payload }
        default :
        return state
    }
}
export default dropdownReducer

