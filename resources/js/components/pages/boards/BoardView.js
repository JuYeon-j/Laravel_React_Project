import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Axios from "axios";
import {PUBLIC_URL} from "../../../constants";
import {storeNewBoard} from "../../../services/BoardService";
import TaskCreate from "../tasks/TaskCreate";

class BoardView extends React.Component{
    state ={
        board:{},
        taskList: [],
        isLoading: false,

    };
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.getBoardDetails();
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

    render() {
        return (
            <>
                <div className="header-part">
                    <div className="float-left">
                        <h2>{this.state.board.name}
                            <Badge variant="primary">{this.state.taskList.length}</Badge>
                        </h2>
                    </div>
                    <div className="float-right">
                        <Button className="btn btn-info mr-2">Edit</Button>
                        {/*<Button className-"btn btn-info mr-2" onClick={()=> this.toggleAddTask()}> +Add Task </Button>*/}
                        {/*<Link to={`${PUBLIC_URL}boards/create`} className="btn btn-info">+ Create Task</Link>*/}
                    </div>
                    <div className="clearfix">

                    </div>
                </div>
                <div>{this.state.board.description}</div>

                {
                    this.state.isLoading && (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }

                {this.state.taskList.map((task ,index)=>(
                    <Card key={index}>
                        <Card.Body>
                            {task.comment} {" "}
                            <Badge variant="primary">{task.tasks_count}</Badge>
                        </Card.Body>
                        {/*<Card.Body>*/}
                        {/*    <Card.Text>*/}
                        {/*        {task.description}*/}
                        {/*    </Card.Text>*/}
                        {/*    <Button variant="primary" className="mr-2">View</Button>*/}
                        {/*    <Button variant="success" className="mr-2">Edit</Button>*/}
                        {/*    <Button variant="danger" className="mr-2">Delete</Button>*/}
                        {/*</Card.Body>*/}

                    </Card>
                ))}

                <TaskCreate board_id={this.props.match.params.id} onCompleteTaskCreate={this.onCompleteTaskCreate}/>



            </>
        );
    }
}

export default BoardView;
