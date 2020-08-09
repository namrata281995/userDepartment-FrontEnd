import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = (props) => { 
   return(
      props.isAuthenticated ? <Route path={props.path} component={props.component}></Route> : <Redirect to='/'></Redirect>
   )
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated : state.user.isAuthenticated
    }
}
export default connect(mapStateToProps , null)(PrivateRoute)