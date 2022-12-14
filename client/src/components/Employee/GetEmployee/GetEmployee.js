import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import './GetEmployee.css'

function GetEmployee() {


  

    const [employees, setEmployees] = useState([])
    const [deletedEmp, setDeletedEmp] = useState(false)

    useEffect(() => {
        const getEmp= async()=>{
                const res = await axios.get('http://localhost:7070/users');
                console.log(res.data.data)
                 setEmployees(res.data.data);            
        }
        getEmp();
    }, [deletedEmp])  
    

    const deleteEmployee = async(userId)=>{
      const res = await axios.delete(`http://localhost:7070/users/${userId}`);
      console.log(res);
      setDeletedEmp(p=>!p)
    }
  return (
    <div>
      <Link to={`/create`}><button type="submit" id='sub-btn2'>Click me to create a new user</button></Link>
        {employees.map((emp) => (
            <div key={emp._id}><b><p>{emp.name}</p></b>
                <Link to={`/update/${emp._id}`}><button type="submit" id='sub-btn1'>Click me to update</button></Link>
                <button type="submit" id='sub-btn1' style={{backgroundColor : 'red'}} onClick={()=>deleteEmployee(emp._id)}>Click me to delete</button>
                <Link to={`/getemp/${emp._id}`}><button type="submit" id='sub-btn1'>Click me to get more info</button></Link>
            </div>            
        ))}
    </div>
  )
}

export default GetEmployee