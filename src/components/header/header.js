import React ,{ useEffect, useState } from 'react';
import Notification from '../notification/notification'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import socket from '../../socket/socket'
import { userlogout } from '../../store/actions/user'
import './header.css' 
import { Badge } from 'react-bootstrap'; 
 

function Header(props) {
  const [countofNotifications, setCountofNotifications] = useState(0)
  const [showBadge , setShowBadge] = useState(false)
  const [notifdata , setnotifdata] = useState('') 

  let showcurrBadge = (cname='formbadge') => { 
    let badges = document.getElementsByClassName('headerbadge')
    Array.from(badges).forEach(badge => badge.style.display = 'none') 
    document.getElementsByClassName(cname)[0].style.display = 'block';
  }

  useEffect(() => { 
    socket.on("notify", data => { 
      setnotifdata(data)
      setCountofNotifications((count) => {
        return ++count
      })
      setShowBadge(true)  
    });  
  }, []);

  let logout = async () => {
    let res = await props.userlogout()  
  }

  let joinsocket = () => {
    socket.emit('join', props.user._id)
  }
  if(props.isAuthenticated) {
    joinsocket()

  return (

    //Make use of NavLink from react-bootstrap
    <div className="header">
      <div className='leftheader'>
        <div className='requestheader' onClick={()=>showcurrBadge('formbadge')}>
          <div className='formbadge headerbadge'><Badge pill variant='light'>&nbsp;</Badge></div>
          <Badge pill variant='success'></Badge>
          <Link to='/addRequest'>
            <span className='headerspan'>Request Form</span>
          </Link>
        </div>
        <div className='requestheader' onClick={()=>showcurrBadge('pendingbadge')}>
          <div className='pendingbadge headerbadge'><Badge pill variant='light'>&nbsp;</Badge></div>
          <Link to='/request/queue/Pending'>
            <span className='headerspan'>Pending Request</span>
            </Link>
        </div>
        <div className='requestheader' onClick={()=>showcurrBadge('approvedbadge')}>
          <div className='approvedbadge headerbadge'><Badge pill variant='light'>&nbsp;</Badge></div>
          <Link to='/request/queue/Approved'>
            <span className='headerspan'>Approved Requests</span>
          </Link>
        </div>
        <div className='requestheader' onClick={()=>showcurrBadge('rejectedbadge')}>
          <div className='rejectedbadge headerbadge'><Badge pill variant='light'>&nbsp;</Badge></div>
          <Link to='/request/queue/Rejected'>
            <span className='headerspan'>Rejected Request</span>
          </Link>
        </div>
        <div className='requestheader' onClick={()=>showcurrBadge('departmentbadge')}>
          <div className='departmentbadge headerbadge'><Badge pill variant='light'>&nbsp;</Badge></div>
          <Link to='/request/queue/Department'>
            <span className='headerspan'>Request (Department)</span>
            </Link>
        </div>
      </div>

       <div className='rightheader'>
       <div className='userheader'>
         <span className='headerspan'>{props.user.name},<br/> {props.department.name}</span>
       </div>
       <div className='notifheader'>
         <Notification notifconfig={{showBadge , count : countofNotifications , notifdata, setCountofNotifications , setShowBadge}}/>
       </div>
       <div className='logoutheader' onClick={logout}><span className='headerspan'>Logout</span></div>
       </div>

    </div>
  );
  }
  return  <Redirect to='/'/>
}

let mapstateToProps = (state) => {
  return {
     isAuthenticated : state.user.isAuthenticated,
     user : state.user.user,
     department : state.user.department
  }
}
export default connect(mapstateToProps , {userlogout})(Header);