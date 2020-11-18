import Axios from "axios";

export const getTaskList = () =>{

}

export const storeNewTask = async (data) => {
    data.board_id = parseInt(data.board_id);
    return await Axios.post("https://reactlaravel.test/api/tasks",data)
        .then((res)=>{
            // console.log('res',res);
            return res.data;
    });
}
