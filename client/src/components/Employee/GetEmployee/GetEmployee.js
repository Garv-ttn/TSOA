import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

function GetEmployee() {


  

    const [employees, setEmployees] = useState([])
    const [deletedEmp, setDeletedEmp] = useState(false)

    useEffect(() => {
        const getEmp= async()=>{
                const res = await axios.get('http://localhost:7070/users',{
                    headers: {
                        "Access-Control-Allow-Origin": 'http://localhost:7070'
                    },
                  });
                console.log(res.data.data)
                 setEmployees(res.data.data);            
        }
        getEmp();
    }, [deletedEmp])  
    

    const deleteEmployee = async(userId)=>{
      const res = await axios.delete(`http://localhost:7070/users/${userId}`,{
        headers: {
            "Access-Control-Allow-Origin": 'http://localhost:7070'
        },
      
      });
      console.log(res);
      setDeletedEmp(p=>!p)
    }
  return (
    <div>
      <Link to={`/create`}><button>Click me to create a new user</button></Link>
        {employees.map((emp) => (
            <div key={emp._id}><p>{emp.name}</p>
                <Link to={`/update/${emp._id}`}><button>Click me to update</button></Link>
                <button onClick={()=>deleteEmployee(emp._id)}>Click me to delete</button>
            </div>            
        ))}
    </div>
  )
}

export default GetEmployee