import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {storeNewComment, updateComment, deleteComment} from "../../../services/CommentService";
import BoardEdit from "../boards/BoardEdit";

class CommentEdit extends React.Component{
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
        const response = await updateComment(this.state.id, postBody);

        if(response.success){

            this.setState({
                comment:"",
                isLoading:false,
                toggleEdit:false,
            });

            this.props.onCompleteCommentEdit();
            this.props.onEdit();

        }else{
            this.setState({
                errors:response.errors,
                isLoading:false,
            });

        }
    };


    toggleCommentEdit = (item) =>{
        console.log("item",item);
        this.setState({
            comment: item.comment,
            toggleEdit: !this.state.toggleEdit,
            id: item.id,
            board_id:item.board_id,
       
        });
        this.props.onEdit();
    }


    deleteComment = async (id)=>{
        const response = await deleteComment(id);
        if(response.success){
            this.props.onCompleteCommentEdit();
        }else{
            alert("Sorry!");
        }
    }

  
    comment = () =>{
        this.props.commentList.map((comment)=>(
            this.setState({
                user_id:comment.id
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
                        {this.props.commentList.map((comment,index)=>(
                            <div key={index}>
                                { (() => { 
                                    if(this.props.user.id == comment.user_id && this.props.user.id != undefined  && comment.user_id != undefined){ 
                                
                                        EditButton = <button className="btn btn-outline-success btn-sm float-right" onClick={()=>this.toggleCommentEdit(comment)}>수정</button>
                                        DeleteButton = <button className="btn btn-outline-danger btn-sm float-right" onClick={()=>this.deleteComment(comment.id)}>삭제</button> 

                                    
                                    }else{ 
                                        EditButton = null; 
                                        DeleteButton = null;
                                    } })() }

                                {DeleteButton}  
                                {EditButton}

                                <b>{comment.user_name}</b>
                                <p>{comment.comment} </p>
                                <hr />
                                        
                            </div>
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

export default withRouter(CommentEdit);
