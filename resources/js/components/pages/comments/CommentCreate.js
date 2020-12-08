import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {storeNewComment} from "../../../services/CommentService";

class CommentCreate extends React.Component{
    state = {
        isLoading: false,
        comment:"",
        errors:{},
        user:{},

    };
    componentDidMount() { }

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
            board_id:this.props.board_id,
            user_id:this.props.user.id,
            user_name:this.props.user.name,

        };
        const response = await storeNewComment(postBody);
        if(response.success){
            this.setState({
                comment:"",
                isLoading:false,
            });
            this.props.onCompleteCommentCreate(response.data);

        }else{
            this.setState({
                errors:response.errors,
                isLoading:false,
            });

        }
    };


    render() {

        return (
            <>
                <Card>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>
                            <Form.Group controlId="comment" >
                                <Form.Control type="text"
                                              placeholder="댓글을 적어주세요"
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
                                <Button variant="outline-primary" type="submit" className="btn-sm float-right">
                                    등록
                                </Button>
                            )}

                        </Form>
                    </Card.Body>
                </Card>

            </>
        );
    }
}

export default withRouter(CommentCreate);
