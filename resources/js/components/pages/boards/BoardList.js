import React from "react";
import {Card, Button, Badge, Spinner} from 'react-bootstrap'
import Axios from "axios";

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
        console.log('coming render');
        return (
            <>
                <h2>Board List</h2>
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
                        <Card.Header>
                            {board.name} {" "}
                            <Badge variant="primary">1</Badge>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {board.description}
                            </Card.Text>
                            <Button variant="primary" className="mr-2">View</Button>
                            <Button variant="success" className="mr-2">Edit</Button>
                            <Button variant="danger" className="mr-2">Delete</Button>
                        </Card.Body>
                    </Card>
                ))}

            </>
        );
    }
}

export default BoardList;
