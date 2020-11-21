import Axios from "axios";

export const getBoardList = async () =>{
    return await Axios.get("https://reactlaravel.test/api/boards").then(
        (res)=>{
            return res.data;
        }
    );
};

export const storeNewBoard = async (data) => {
    data.user_id = 1;
    return await Axios.post("https://reactlaravel.test/api/boards",data)
        .then((res)=>{
            // console.log('res',res);
            return res.data;
    });
}

export const updateBoard = async (id, data) => {
    data.user_id = 1;
    return await Axios.put(`https://reactlaravel.test/api/boards/${id}`,
        data)
        .then((res)=>{
            // console.log('res',res);
            return res.data;
        });
}

export const deleteBoard = async (id) => {
    return await Axios.delete(`https://reactlaravel.test/api/boards/${id}`)
        .then((res)=>{
            console.log('res',res);
            return res.data;
        });
}
