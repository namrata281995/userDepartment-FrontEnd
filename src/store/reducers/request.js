import { ADD_REQUEST, UPDATE_REQUEST , GET_REQUEST
} from '../types/types' 
 
const initialstate = {
    own : [],
    department : []
}

const requestReducer = (state = initialstate , action) => {
    switch(action.type) {
        case ADD_REQUEST :  
        let newown = [...state.own]
        newown.push(action.payload)
            return { ...state,  own : newown }
        case UPDATE_REQUEST :   
           const index = state.department.findIndex( element => element._id === action.payload._id) 
           let newdepartment = [...state.department ]
           newdepartment[index] = action.payload 
            return {...state, department : newdepartment }
        case GET_REQUEST : 
            switch(action.requesttype){                       
                 case 'Department' : 
                 return { ...state, department : action.payload }
                 default : 
                 return { ...state, own : action.payload }       
            }
        default :
            return state
    }
}

export default requestReducer