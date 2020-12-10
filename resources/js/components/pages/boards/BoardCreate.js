import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import {PUBLIC_URL} from "../../../constants";
import {storeNewBoard} from "../../../services/BoardService";
import {checkIfAuthenticated} from "../../../services/AuthService";

class BoardCreate extends React.Component{
    state = {
        isLoading: false,
        name:"",
        description:"",
        errors:{},
        user:{},

    };
    componentDidMount() { 
        if(checkIfAuthenticated()){
            console.log("BoardCreate", checkIfAuthenticated());
            this.setState({
                user:checkIfAuthenticated(),
            });
        }
    }

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
            description: this.state.description.replace(/\n/g, '<br/>'),
            user_id:this.state.user.id,
            user_name:this.state.user.name,
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
                        <h2>글쓰기</h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}boards`} className="btn btn-info">취소</Link>
                    </div>
                    <div className="clearfix">

                    </div>
                </div>

                <Card>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>

                            <Form.Group controlId="name">
                                <Form.Label>제목</Form.Label>
                                <Form.Control type="text"
                                              placeholder="제목을 입력하세요"
                                              name="name"
                                              value={this.state.name}
                                              onChange={(e)=>this.changeInput(e)}/>
                            </Form.Group>
                            {this.state.errors && this.state.errors.name &&(
                                <p className="text-danger">{this.state.errors.name[0]}</p>)}

                            <Form.Group controlId="description">
                                <Form.Label>내용</Form.Label>
                                <Form.Control type="text"
                                              placeholder="내용을 입력하세요"
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

export default withRouter(BoardCreate);
