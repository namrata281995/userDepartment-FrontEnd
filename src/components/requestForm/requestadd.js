import React, { Component } from 'react'
import { getAllDepartments, getAllDepartmentUsers } from '../../store/actions/dropdown'
import { addrequest } from '../../store/actions/request'
import { Dropdown, Button, Card, Row, Container} from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert';
import './requestadd.css'

class AddRequestForm extends Component {
    constructor(props){
        super(props)
        this.state = {  
            selectedDepartment : { name : 'Select Department'},
            selecteduser : {username : 'Select User'},
            message : '',
            formerror : false
        }
    }

    async componentDidMount() {
        //call to get departments for dropdown 
        await this.props.getAllDepartments(this.props.userdepartment._id)
    }

    changemessage = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    departmentoptionchangeHandler = async (option) => { 
        this.setState({
            selectedDepartment : option
        }) 
        await this.props.getAllDepartmentUsers(option._id)
    }

    assignedusersoptionchangeHandler = (option) => {
        this.setState({
            selecteduser : option
        })
    }

    resetForm = () => { 
        this.setState({
            selectedDepartment : { name : 'Select Department'},
            selecteduser : {username : 'Select User'},
            message : '',
            formerror : false
         })
    }

    validateform = () => {
        return this.state.selectedDepartment._id !== undefined && this.state.selecteduser._id !== undefined && this.state.message !== ''
    }

    submitHandler = async () => {
        if(this.validateform())
        {
            let request = { 
            createdBy : this.props.userid,
            createdByName : this.props.username, 
            department :  this.state.selectedDepartment._id,
            assignedTo :  this.state.selecteduser._id,
            message : this.state.message,
            departmentName : this.state.selectedDepartment.name,
            assignedToName : this.state.selecteduser.username
        }
        //add request
        const res = await this.props.addrequest(request, this.props.userdepartment.name)
        res && swal("Success!", "Your request has been created!", "success");
        this.resetForm();
        }
        else {
            this.setState({formerror : true })
        }
    }

    render() {
        return (
            
            <div className='addrequest'>
                <Card className='form_card'> 
                <form className='addrequestform'>
                    {/* created By */}
                    <div className='requestform_div'>
                        <label>Created By: </label>
                        <span className='form_field'>{this.props.username}</span>
                    </div>

                    <div className='dropdown_div'> 
                        <label>Department :</label>
                        <div className='form_field'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.selectedDepartment.name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    { this.props.departments.map( (element) => { 
                                        return <Dropdown.Item key={element._id} onClick={()=>this.departmentoptionchangeHandler(element)}>{element.name}</Dropdown.Item>
                                    }
                                    )} 
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='dropdown_div'>
                        <label>Assign To :</label>
                        <div className='form_field'>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.selecteduser.username}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    { this.props.assignedusers.map( (element) => {  
                                        return <Dropdown.Item key={element._id} onClick={()=>this.assignedusersoptionchangeHandler(element)}>{element.username}</Dropdown.Item>
                                    }
                                    )} 
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='requestform_div'>
                        <label>Message : </label>
                        <textarea  className='form_field' value={this.state.message} onChange={this.changemessage}></textarea>
                    </div>
                    { this.state.formerror && <div className='requestform_div'><span className='errormsgspan'>Please enter all details.</span></div> }
                    <div className='requestform_div'>
                        <Button onClick={this.submitHandler}>Request</Button>
                    </div>
                </form> 
                </Card>
            </div> 
        )
    }
}

let mapStateToProps = (state) => {
    return { 
        userid : state.user.user._id,
        username : state.user.user.name,
        userdepartment : state.user.department,
        departments : state.dropdown.departments,
        assignedusers : state.dropdown.assignedusers
    }
}
export default connect(mapStateToProps, { getAllDepartments , getAllDepartmentUsers, addrequest})(AddRequestForm)