import axios from "axios";
export const UpdateEmployeeApi = async(userId,data)=>{
    try{
        await axios.put(`http://localhost:7070/users/${userId}`,data,{
            headers: {
                "Access-Control-Allow-Origin": 'http://localhost:7070'
            },
          });
    }catch(error){
        console.log(error);
    }
}