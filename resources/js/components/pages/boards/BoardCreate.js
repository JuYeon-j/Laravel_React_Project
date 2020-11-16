import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {storeNewBoard} from "../../../services/BoardService";

class BoardCreate extends React.Component{
    state = {
        isLoading: false,
        name:"",
        description:"",
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
        e.preventDefault();
        const {history} = this.props;

        this.setState({isLoading: true});

        const postBody = {
            name: this.state.name,
            description: this.state.description,
        };
        const response = await storeNewBoard(postBody);
        if(response.success){
            this.setState({
                name:"",
                description:"",
                isLoading:false,
            });
            history.push(`${PUBLIC_URL}boards`);
            // alert('Board Added');
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
                <div className="header-part">
                    <div className="float-left">
                        <h2>New Board</h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}boards`} className="btn btn-info">See All Boards</Link>
                    </div>
                    <div className="clearfix">

                    </div>
                </div>

                <Card>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>

                            {/*<div className="alert alert-danger">*/}

                            {/*</div>*/}

                            <Form.Group controlId="name">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Enter Title"
                                              name="name"
                                              value={this.state.name}
                                              onChange={(e)=>this.changeInput(e)}/>
                            </Form.Group>
                            {this.state.errors && this.state.errors.name &&(
                                <p className="text-danger">{this.state.errors.name[0]}</p>)}

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
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
                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                            )}

                        </Form>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default withRouter(BoardCreate);
