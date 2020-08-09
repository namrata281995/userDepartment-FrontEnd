import React, { useState, useEffect } from 'react'
import { Badge } from 'react-bootstrap'
import NotificationBody from './notificationbody'
import './notification.css'

const Notification = (props) => {
    const [showtoast, setShowtoast] = useState(false)
    const [toastdata, settoastdata] = useState([])

    let notifclickhandler = () => {
        setShowtoast((toast) => {
            return !toast
          })
          props.notifconfig.setShowBadge(false)
          props.notifconfig.setCountofNotifications(0)
    }
 
    useEffect(() => { 
        if(props.notifconfig.count > 0)
        settoastdata((data) => { 
            data.push(props.notifconfig.notifdata) 
           return data
        })
    }, [props.notifconfig.count])

    return (
        <div>
            <div onClick={notifclickhandler} className='notificationdiv'>     
                { props.notifconfig.showBadge && <Badge variant="danger">{props.notifconfig.count}</Badge> }
                <span className='headerspan'>
                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg></span>    
                { showtoast && <NotificationBody data={toastdata}/> }
            </div>
            
        </div>
    )
}

export default Notification