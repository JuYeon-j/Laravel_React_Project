import React from "react";
import {Card, Button, Badge, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {PUBLIC_URL} from "../../../constants";
import {getBoardList} from "../../../services/BoardService";
import Pagination from 'react-paginate'

class BoardList extends React.Component{
    

    state ={
        boardList: [],
        isLoading: false,
        perPage: 5,
        currentPage: 0,
        offset: 0,
        tableData: [],

    };

    componentDidMount() {
        this.getBoardLists();
     
       
        // console.log('this.props', this.props);
    }

    getBoardLists = async () => {
        this.setState({isLoading:true});
        const response = await getBoardList();

        const data = response.data;
				
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        

        if(response.success){
            this.setState({
                boardList:response.data,
                isLoading:false,

                pageCount: Math.ceil(data.length / this.state.perPage),
                tableData: slice


            });
        }else{
            this.setState({
                isLoading:false,
            });
        }
    }

    handlePageClick = (e) =>{
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    }

    loadMoreData() {
		const data = this.state.boardList;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData: slice
		})
	
    }


    render() {

        return (
            <>

                <div className="header-part">
                    <div className="float-left">
                        <h3>자유게시판
                            {/* <Badge variant="primary">{this.state.boardList.length}</Badge> */}
                        </h3>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}boards/create`} className="btn btn-info">글쓰기</Link>
                    </div>
                    <div className="clearfix">

                    </div>
                    <hr />
                    <div className="float-left">
                        <h5>&emsp; 제목</h5>
                    </div>
                    <div className="float-right">
                        <h5>작성자&emsp;</h5>
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


                {this.state.tableData.map((board,index)=>(
                    <Card key={index}>
                        <Card.Body>
                            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`${PUBLIC_URL}boards/view/${board.id}`} >
                                {board.name}</Link>
                            {" "}
                            <Badge variant="primary">{board.comments_count}</Badge>
                            <div className="float-right">{board.user_name}</div>
                       
                        </Card.Body>
                    </Card>
                ))}
                <br />

                <div className="d-flex justify-content-center">
                    <Pagination
                        previousLabel={"이전"}
                        nextLabel={"다음"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick.bind(this)}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>

            </>
        );
    }
}

export default BoardList;
