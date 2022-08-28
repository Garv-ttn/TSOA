import axios from "axios";
export const AddEmployeeApi = async(EmployeeCredentials)=>{
    try{
        await axios.post('http://localhost:7070/users',EmployeeCredentials,{
            headers: {
                "Access-Control-Allow-Origin": 'http://localhost:7070'
            },
          });
    }catch(error){
        console.log(error);
    }
}