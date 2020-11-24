import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {storeNewTask, updateTask, deleteTask} from "../../../services/TaskService";
import BoardEdit from "../boards/BoardEdit";

class TaskEdit extends React.Component{
    state = {
        isLoading: false,
        id:"",
        board_id: "",
        comment:"",
        errors:{},
        toggleEdit:false,
        user:{},

    };
    componentDidMount() { 
        
      
    }

    changeInput = (e) =>{
        this.setState({
            comment : e.target.value,
        });

    }

    submitForm = async (e) => {

        e.preventDefault();
        const {history} = this.props;

        this.setState({isLoading: true});

        const postBody = {
            comment: this.state.comment,
            board_id:this.state.board_id,
            user_id:this.props.user.id,
            user_name:this.props.user.name,

        };
        console.log('submit',postBody);
        const response = await updateTask(this.state.id, postBody);

        if(response.success){

            this.setState({
                comment:"",
                isLoading:false,
                toggleEdit:false,
            });

            this.props.onCompleteTaskEdit();

        }else{
            this.setState({
                errors:response.errors,
                isLoading:false,
            });

        }
    };


    toggleTaskEdit = (item) =>{
        console.log("item",item);
        this.setState({
            comment: item.comment,
            toggleEdit: !this.state.toggleEdit,
            id: item.id,
            board_id:item.board_id,
       
        });
    }


    deleteTask = async (id)=>{
        const response = await deleteTask(id);
        if(response.success){
            this.props.onCompleteTaskEdit();
        }else{
            alert("Sorry!");
        }
    }

  
    task = () =>{
        this.props.taskList.map((task)=>(
            this.setState({
                user_id:task.id
            })
        ));

    }


    render() {
        let EditButton = null
        let DeleteButton = null
     
     
        return (
            <>
                
                
                {!this.state.toggleEdit && (
                    <>
                        {this.props.taskList.map((task,index)=>(
                    

                            <Card key={index}>
                                
                                <Card.Body>
                                { (() => { 
                                    if(this.props.user.id == task.user_id && this.props.user.id != undefined  && task.user_id != undefined){ 
                               
                                        EditButton = <button className="btn btn-outline-success btn-sm float-right" onClick={()=>this.toggleTaskEdit(task)}>수정</button>
                                        DeleteButton = <button className="btn btn-outline-danger btn-sm float-right" onClick={()=>this.deleteTask(task.id)}>삭제</button> 

                                   
                                    }else{ 
                                        EditButton = null; 
                                        DeleteButton = null;
                                    } })() }

                                    {DeleteButton}  
                                    {EditButton}
                                        
                                 <Card.Title>{task.user_name}</Card.Title>
                                    
                                    {this.props.isDetailsView &&(
                                        
                                        <Card.Text>{task.comment} </Card.Text>
                                     
                                    )}
                                </Card.Body>
                            </Card>

                        ))}
                    </>
                )}




                {this.state.toggleEdit && (
                    <>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.submitForm}>
                                    <Form.Group controlId="comment" >
                                        <Form.Control type="text"
                                                      placeholder="댓글 수정"
                                                      name="comment"
                                                      as="textarea"
                                                      value={this.state.comment}
                                                      onChange={(e)=>this.changeInput(e)}/>
                                    </Form.Group>
                                    {this.state.errors && this.state.errors.name &&(
                                        <p className="text-danger">{this.state.errors.name[0]}</p>)}
                                    {" "}
                                    {this.state.isLoading && (
                                        <Button variant="primary" type="button" disabled>
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>{" "}
                                            Saving...
                                        </Button>
                                    )}

                                    {!this.state.isLoading && (
                                        <Button variant="" type="submit" className="btn btn-outline-primary btn-sm float-right">
                                            등록
                                        </Button>
                                    )}

                                    <button className="btn btn-outline-success btn-sm float-right">

                                    {this.state.toggleEdit && <span>취소</span>}</button>


                                </Form>
                            </Card.Body>
                        </Card>
                    </>
                )}


            </>
        );
    }
}

export default withRouter(TaskEdit);
