import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import axios from '../axios/axiosInstance'

const initialState = {
  user: {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null,
  }
}

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set the currentState for first run of the app
let currentState = initialState;

store.subscribe(() => {
  // store previous currentState in a object
  const previousState = currentState; 
  // get current value for the state
  currentState = store.getState(); 
  // compare the token
  if (previousState.user.token !== currentState.user.token) {
    if (currentState.user.token) {
      localStorage.setItem('token', currentState.user.token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${currentState.user.token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});

export default store;
