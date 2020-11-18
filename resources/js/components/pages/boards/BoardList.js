import React from "react";
import {Card, Button, Badge, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";

class BoardList extends React.Component{
    state ={
        boardList: [],
        isLoading: false,

    };
    componentDidMount() {
        this.getBoardLists();
    }

    getBoardLists = () => {
        this.setState({isLoading:true});
        Axios.get("https://reactlaravel.test/api/boards").then((res)=>{
            console.log("res",res);
            const boardList = res.data.data;
            this.setState({
                boardList,
                isLoading: false,
            });
        });
    }

    render() {

        return (
            <>
                <div className="header-part">
                    <div className="float-left">
                        <h2>Board List{" "}
                            <Badge variant="primary">{this.state.boardList.length}</Badge>
                        </h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}boards/create`} className="btn btn-info">+ Create New</Link>
                    </div>
                    <div className="clearfix">

                    </div>
                </div>

                {
                    this.state.isLoading && (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }
                {this.state.boardList.map((board,index)=>(
                    <Card key={index}>
                        <Card.Body>
                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`${PUBLIC_URL}boards/view/${board.id}`} >{board.name}</Link>
                            {" "}
                            <Badge variant="primary">{board.tasks_count}</Badge>
                            <div className="float-right">{board.user_id}</div>
                        </Card.Body>
                        {/*<Card.Body>*/}
                        {/*    <Card.Text>*/}
                        {/*        {board.description}*/}
                        {/*    </Card.Text>*/}

                        {/*    <Link to={`${PUBLIC_URL}boards/view/${board.id}`} className="btn btn-primary mr-2">View</Link>*/}

                        {/*    <Button variant="success" className="mr-2">Edit</Button>*/}
                        {/*    <Button variant="danger" className="mr-2">Delete</Button>*/}
                        {/*</Card.Body>*/}
                    </Card>
                ))}

            </>
        );
    }
}

export default BoardList;
