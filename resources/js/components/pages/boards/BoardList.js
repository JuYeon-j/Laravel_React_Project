import React from "react";
import {Card, Button, Badge, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import BoardView from "./BoardView";
import {getBoardList} from "../../../services/BoardService";
import {checkIfAuthenticated} from "../../../services/AuthService";

class BoardList extends React.Component{
    

    state ={
        boardList: [],
        isLoading: false,
     

    };

    componentDidMount() {
        this.getBoardLists();
       
        // console.log('this.props', this.props);
    }

    getBoardLists = async () => {
        this.setState({isLoading:true});
        const response = await getBoardList();
        if(response.success){
            this.setState({
                boardList:response.data,
                isLoading:false,
            });
        }else{
            this.setState({
                isLoading:false,
            });
        }
    }
  


    render() {

        return (
            <>

                <div className="header-part">
                    <div className="float-left">
                        <h2>게시판{" "}
                            <Badge variant="primary">{this.state.boardList.length}</Badge>
                        </h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}boards/create`} className="btn btn-info">글쓰기</Link>
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
                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`${PUBLIC_URL}boards/view/${board.id}`} >
                                {board.name}</Link>
                            {" "}
                            <Badge variant="primary">{board.tasks_count}</Badge>
                            <div className="float-right">{board.user_name}</div>
                       
                        </Card.Body>
                    </Card>
                ))}

            </>
        );
    }
}

export default BoardList;
