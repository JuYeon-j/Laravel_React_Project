import Axios from "axios";

export const getBoardList = () =>{

}

export const storeNewBoard = async (data) => {
    data.user_id = 1;
    return await Axios.post("https://reactlaravel.test/api/boards",data)
        .then((res)=>{
            // console.log('res',res);
            return res.data;
    });
}
