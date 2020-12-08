import Axios from "axios";

export const getCommentList = () =>{

}

export const storeNewComment = async (data) => {
    data.board_id = parseInt(data.board_id);
    return await Axios.post("https://reactlaravel.test/api/comments",data)
        .then((res)=>{
            // console.log('res',res);
            return res.data;
    });
}

export const updateComment = async (id, data) => {

    return await Axios.put(`https://reactlaravel.test/api/comments/${id}`,
        data)
        .then((res)=>{
            console.log('res',res);
            return res.data;
        });
}

export const deleteComment = async (id) => {
    return await Axios.delete(`https://reactlaravel.test/api/comments/${id}`)
        .then((res)=>{
            console.log('res',res);
            return res.data;
        });
}
