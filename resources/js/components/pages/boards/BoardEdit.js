import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {storeNewBoard, updateBoard} from "../../../services/BoardService";

class BoardEdit extends React.Component{
    state = {
        isLoading: false,
        id: this.props.board.id,
        name: this.props.board.name,
        description: this.props.board.description,
        errors:{},

    };
    componentDidMount() { }

    changeInput = (e) =>{
        this.setState({
           [e.target.name] : e.target.value,

        });
        // alert(e.target.name);
    }

    submitForm = async (e) => {
        console.log('he2');
        e.preventDefault();
        const {history} = this.props;

        this.setState({isLoading: true});

        const postBody = {
            name: this.state.name,
            description: this.state.description,
            user_id: this.props.board.user_id,
            user_name:this.props.board.user_name,
        };
        const response = await updateBoard(this.state.id, postBody);
        if(response.success){
            this.setState({
                name:"",
                description:"",
                isLoading:false,
            });
            // history.push(`${PUBLIC_URL}boards`);
            // alert('Board Added');
            console.log('he');
            this.props.onCompleteBoardEdit();

        }else{
            this.setState({
                errors:response.errors,
                isLoading:false,
            });
            // alert('Error');
        }
    };


    render() {

        return (
            <>

                <Card>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>

                            {/*<div className="alert alert-danger">*/}

                            {/*</div>*/}

                            <Form.Group controlId="name">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Enter Title"
                                              name="name"
                                              value={this.state.name}
                                              onChange={(e)=>this.changeInput(e)}/>
                            </Form.Group>
                            {this.state.errors && this.state.errors.name &&(
                                <p className="text-danger">{this.state.errors.name[0]}</p>)}

                            <Form.Group controlId="description">
                                <Form.Label>내용</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Enter Description"
                                              as="textarea"
                                              rows="5"
                                              name="description"
                                              value={this.state.description}
                                              onChange={(e)=>this.changeInput(e)}
                                />
                            </Form.Group>
                            {this.state.errors && this.state.errors.description &&(
                                <p className="text-danger">{this.state.errors.description[0]}</p>)}

                            {this.state.isLoading && (
                                    <Button variant="primary" type="button" disabled>
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>{" "}
                                        Saving...
                                    </Button>
                            )}
                            {!this.state.isLoading && (
                                    <Button variant="outline-primary" className="btn-sm" type="submit">
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

export default withRouter(BoardEdit);
