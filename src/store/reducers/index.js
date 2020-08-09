import { combineReducers } from 'redux';
import userReducer from './user';
import requestReducer from './request'; 
import dropdownReducer from './dropdown'

const rootReducer = combineReducers({
  user : userReducer,
  request : requestReducer,
  dropdown : dropdownReducer
});

export default rootReducer;
