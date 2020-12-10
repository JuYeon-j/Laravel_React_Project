import React from "react";
import {Card, Button, Badge, Spinner, Form} from 'react-bootstrap'
import Axios from "axios";
import {Link} from 'react-router-dom'
import {PUBLIC_URL} from "../../../constants";
import {deleteBoard} from "../../../services/BoardService";
import {checkIfAuthenticated} from "../../../services/AuthService";
import CommentCreate from "../comments/CommentCreate";
import BoardEdit from "./BoardEdit";
import CommentEdit from "../comments/CommentEdit";

class BoardView extends React.Component{

    state ={
        board:{},
        commentList: [],
        isLoading: false,
        toggleEditBoard:false,
        user:{},
        isLoggedIn:false,
        toggleCreate:false,

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
            const commentList = res.data.data;
            
            this.setState({
                commentList:res.data.data.comments,
                board: res.data.data,
                isLoading: false,
            });
        });
        
    }


    onCompleteCommentCreate = (comment) => {
        let comments = this.state.commentList;
        comments.unshift(comment);
        this.setState({
            commentList: comments,
        });
    }

    toggleEditBoard = () =>{
        this.setState({
           toggleEditBoard: !this.state.toggleEditBoard,
        });
   
    }

    onCompleteBoardEdit = (comment) => {
        console.log('hello');
        this.getBoardDetails();
        this.toggleEditBoard();

    }

    onCompleteCommentEdit = (comment) => {
        this.getBoardDetails();

    }

    onEdit = () => {
        this.setState({
            toggleCreate: !this.state.toggleCreate,
        })
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
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}boards`} className="btn btn-info">목록</Link>
                    </div>
                    <div>
                        {!this.state.toggleEditBoard && (
                            <>
                                
                                <h2>{this.state.board.name}{" "}</h2>
                                <div className="float-right">
                                    <p>댓글 <Badge variant="primary">{this.state.commentList.length}</Badge></p>
                                </div>
                                
                                <p>작성자: <b>{this.state.board.user_name}</b></p>
                             
                                
                                <hr /> 

                                <div dangerouslySetInnerHTML={ {__html: this.state.board.description} }>
                                 </div>
                            

                                <hr />
                                <h5><b>댓글</b></h5>

                                <CommentEdit commentList={this.state.commentList} user={this.state.user} isDetailsView={true} onCompleteCommentEdit={this.onCompleteCommentEdit} onEdit={this.onEdit}/>

                                {
                                    this.state.isLoggedIn && (
                                        <>
                                            {
                                                !this.state.toggleCreate && (
                                                    <>
                                                        <CommentCreate board_id={this.props.match.params.id} user={this.state.user} onCompleteCommentCreate={this.onCompleteCommentCreate}/>
                                                    </>
                                                )
                                            }
                                            
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
