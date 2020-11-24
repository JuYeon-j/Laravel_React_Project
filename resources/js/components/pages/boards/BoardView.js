import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {deleteBoard} from "../../../services/BoardService";
import {checkIfAuthenticated} from "../../../services/AuthService";
import TaskCreate from "../tasks/TaskCreate";
import BoardEdit from "./BoardEdit";
import TaskEdit from "../tasks/TaskEdit";

class BoardView extends React.Component{

    state ={
        board:{},
        taskList: [],
        isLoading: false,
        toggleEditBoard:false,
        user:{},
        isLoggedIn:false,
    };

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.getBoardDetails();
        if(checkIfAuthenticated()){
            console.log("BoardView", checkIfAuthenticated());
            this.setState({
                user:checkIfAuthenticated(),
                isLoggedIn:true,
            });
        }
        
    }

    getBoardDetails = () => {
        this.setState({isLoading:true});
        Axios.get(
            `https://reactlaravel.test/api/boards/${this.props.match.params.id}`)
            .then((res)=>{
            console.log("res",res.data);
            const taskList = res.data.data;
            
            this.setState({
                taskList:res.data.data.tasks,
                board:res.data.data,
                isLoading: false,
            });
        });
        
    }


    onCompleteTaskCreate = (task) => {
        let tasks = this.state.taskList;
        tasks.unshift(task);
        this.setState({
            taskList: tasks,
        });
    }

    toggleEditBoard = () =>{
        this.setState({
           toggleEditBoard: !this.state.toggleEditBoard,
        });
   
    }

    onCompleteBoardEdit = (task) => {
        console.log('hello');
        this.getBoardDetails();
        this.toggleEditBoard();

    }

    onCompleteTaskEdit = (task) => {
        this.getBoardDetails();

    }

    deleteBoard = async (id)=>{

        const {history} = this.props;
        this.setState({isLoading: true});

        const response = await deleteBoard(id);
        if(response.success){
            history.push(`${PUBLIC_URL}boards`);
        }else{
            this.setState({
                errors:response.errors,
                isLoading:false,
            });

        }
    }

    render() {

    let EditButton = null
    let DeleteButton = null
    if(this.state.user.id == this.state.board.user_id && this.state.user.id != undefined  &&
        this.state.board.user_id != undefined){
        EditButton = <Button className="btn btn-success mr-2" onClick={()=>this.toggleEditBoard()}>{!this.state.toggleEditBoard && <span>수정</span>}{this.state.toggleEditBoard && <span>취소</span>}</Button> 
        DeleteButton = <Button variant="danger" className="mr-2" onClick={()=>this.deleteBoard(this.props.match.params.id)}>삭제</Button>
 
    }

        return (
            <>
            
                <div className="header-part">
                    <div>
                        {!this.state.toggleEditBoard && (
                            <>

                                <h2>{this.state.board.name}{" "}
                                    <Badge variant="primary">{this.state.taskList.length}</Badge>
                                </h2>
                                <hr />
                                <p>{this.state.board.description}</p>
                                <hr />

                                <TaskEdit taskList={this.state.taskList} user={this.state.user} isDetailsView={true} onCompleteTaskEdit={this.onCompleteTaskEdit}/>

                                {
                                    this.state.isLoggedIn && (
                                        <>
                                            <TaskCreate board_id={this.props.match.params.id} user={this.state.user} onCompleteTaskCreate={this.onCompleteTaskCreate}/>
                                        </>
                                    )
                                }

                            </>
                        )}
                        {this.state.toggleEditBoard && (
                            <>
                                <BoardEdit board={this.state.board} onCompleteBoardEdit={this.onCompleteBoardEdit}/>
                            </>
                        )}

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

                <br />
                {EditButton}
                {DeleteButton}

            </>
        );
    }
}

export default BoardView;
