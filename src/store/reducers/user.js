import { 
    LOG_IN_SUCESS,  
    LOG_IN_FAIL,
    LOG_OUT
} from '../types/types'

const initialstate = { 
        token: null,
        isAuthenticated: null, 
        user: null, 
        department : null, 
}

const userReducer = (state = initialstate, action) => { 
    switch(action.type){ 
        case LOG_IN_SUCESS: 
            return {
                ...state,
                token : action.payload.token,
                user : { _id : action.payload.user._id, name : action.payload.user.username },
                department : action.payload.userdepartment,
                isAuthenticated : true
            } 
        case LOG_IN_FAIL:
            return{
                ...state,
                token : null,
                user : null,
                isAuthenticated : false
            }
        case LOG_OUT :
            return {
                ...state,
                token : '',
                user : null,
                department : null,
                isAuthenticated : false
            }
        default :
            return state
    }
}

export default userReducer;