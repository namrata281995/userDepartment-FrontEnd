import React, { useEffect, useState } from 'react'
import { getRequests } from '../../store/actions/request'
import { Table , Button, Card} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateRequest } from '../../store/actions/request'
import swal from 'sweetalert';
import './request.css' 

const Request = (props) => {
    //get the type of request status from the url Params
    let { type } = useParams();   

    let getRequests = async (type) =>{ 
        await props.getRequests(type)  
    }

    useEffect(() => {
        //get the requests 
        getRequests(type) 
    }, [type])  

    let approveRequest = async (requestid, createdByUserid, assignedToUserName) => {
        const res = await props.updateRequest(requestid, 'Approved')        
        res && res && swal("Success!", "Your request status has been updated!", "success");
    }

    let rejectRequest = async (requestid, createdByUserid, assignedToUserName) => {
        const res = await props.updateRequest(requestid, 'Rejected') 
        res && swal("Success!", "Your request status has been updated!", "success");
    }

    let count = 1;

    return (
        <div className='requestdiv'>
            <Card className='table_card'>
            <Card.Body>  
            <Table className='request_table'  striped bordered hover size="sm">
                <thead>
                    <th>#</th>
                    <th>Created By</th>
                    <th>Department</th>
                    <th>Assigned To</th>
                    <th>Message</th> 
                    { type === 'Department' && <th>Status</th>  }
                    { type === 'Department' && <th>Action</th>  }
                </thead>
                <tbody>   
                        { type === 'Department' ? (props.Department.filter( request => request.status !== 'Approved').length > 0 ? props.Department.filter( request => request.status !== 'Approved').map(
                                request => {
                                    return(
                                        <tr key={request._id}>
                                            <td>{count++}</td>
                                            <td>{request.createdByName}</td>
                                            <td>{request.departmentName}</td>
                                            <td>{request.assignedToName}</td>
                                            <td>{request.message}</td> 
                                            { type === 'Department' && <td>{request.status}</td> }
                                              { type === 'Department' &&
                                                <td>
                                                    { request.assignedTo === props.userid && request.status === 'Pending'
                                                    ?
                                                        <div>
                                                            <Button variant='success' className='action_btn' onClick={()=> approveRequest(request._id, request.createdBy, request.assignedToName)}>Approve</Button>
                                                            <Button variant='danger' className='action_btn' onClick={()=> rejectRequest(request._id, request.createdBy, request.assignedToName)}>Reject</Button> 
                                                        </div>
                                                    : <span>-</span>
                                                    }
                                                </td>
                                              }
                                        </tr>
                                    )
                            }) : <tr><td colspan='7'><span className='norequest_span'>No Requests available</span></td></tr>)
                            :
                            ( props.Own.filter(request => request.status === type).length > 0 ? props.Own.filter(request => request.status === type).slice(0, 5).map(
                                request => {
                                    return(
                                        <tr key={request._id}>
                                            <td>{count++}</td>
                                            <td>{request.createdByName}</td>
                                            <td>{request.departmentName}</td>
                                            <td>{request.assignedToName}</td>
                                            <td>{request.message}</td>                                                                                       
                                        </tr>
                                    )
                            }) : <tr><td colspan='5'><span className='norequest_span'>No Requests available</span></td></tr> )
                        }          
                </tbody>
            </Table> 
            </Card.Body>
            </Card>
        </div>
    )
}

let mapStateToProps = (state) => { 
    return { 
        Department : state.request.department,
        Own : state.request.own,
        userid : state.user.user._id
    }
}

export default connect(mapStateToProps, {getRequests, updateRequest})(Request)