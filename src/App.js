import React from 'react'; 
import {Switch , Route} from 'react-router-dom'
import Header from './components/header/header' 
import Login from './components/login/login' 
import PrivateRoute from './components/privateRoute/privateRoute'
import AddRequestForm from './components/requestForm/requestadd'; 
import Request from './components/request/request'
import './App.css';

function App () {
  return (
    <div className="App">
      <Header></Header> 
      <Switch> 
        <Route path="/" exact component={Login}/>
        {/* <Route path="/addRequest" exact component={AddRequestForm}/>

        <Route path="/request/queue/:type" exact component={Request}/>   */}
        
        <PrivateRoute path='/addRequest' component={AddRequestForm}/>

        <PrivateRoute path='/request/queue/:type' component={Request}/>
        
     </Switch>  
    {/* <Footer></Footer> */}
    </div>
  )
}

export default App;
