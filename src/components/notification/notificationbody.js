import React from 'react'
import { Toast } from 'react-bootstrap'

const NotificationBody = (props) => {
    return (
        <div>
            <Toast>
                <Toast.Header> 
                    <strong className="mr-auto">Notifications</strong> 
                </Toast.Header>
                <Toast.Body>
                    { props.data.length === 0 ? <span>No Notifications</span> :
                        props.data.map((element) => {
                        return <div>
                                <span>{element}</span>
                                <hr/>
                                </div>
                    })
                    }
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default NotificationBody