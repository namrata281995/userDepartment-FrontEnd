import React, { useState } from 'react'
import { Redirect } from 'react-router-dom' 
import {connect} from 'react-redux'
import { userlogin } from '../../store/actions/user'
import {Card, Container} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import './login.css'

const Login = (props) => { 
    const [name , changeName ] = useState('')
    const [password , changepassword ] = useState('')
    const [error , setError] = useState(false)
    const [loading , setLoading] = useState(false)

    let handleSubmit = async (e) => { 
          setLoading(true)
          e.preventDefault(); 
            let res = await props.userlogin({ userid : name, password })
          if(!res)
          {
              setError(true)
              setLoading(false)              
          }
          res && setLoading(false) 
    }
  
    if(props.isAuthenticated) {  
       return ( 
        <Redirect to='/addRequest'/>
       )
    }

    return (
        <Container>
              <div className= 'login'>
                  <Card className='login_card'>
                  <Card.Title className='login_title'>Login</Card.Title>
                    <Card.Body> 
                    <form onSubmit={handleSubmit}>
                        <div className='loginform'>
                        <div>
                            <label>UserID : </label>
                            <input className='login_input' type='text' value={name} onChange={(e)=>changeName(e.target.value)} placeholder='UserName' required/>
                        </div>
                        <div>
                            <label>Password : </label>
                            <input className='login_input' type='password' value={password} onChange={(e)=>changepassword(e.target.value)} placeholder='Password' required/>
                        </div>
                        { error && <div><span className='errormsgspan'>Invalid Credentials!! Please Try again</span></div> }

                        <div>
                            <Button type='submit'>
                                Log In { loading &&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            }</Button>                            
                        </div>
                        </div>
                    </form> 
                    </Card.Body>
                  </Card>
              </div>
        </Container>
    ) 
}

let mapStateToProps = state => {return { isAuthenticated : state.user.isAuthenticated }}

export default connect(mapStateToProps, {userlogin})(Login)