import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './GetEmp.css'

function GetEmp() {

    const[emp,setEmp]=useState({})
    const params = useParams()
    const navigate = useNavigate();




    useEffect(() => {
        const getEmp = async()=>{
            const res = await axios.get(`http://localhost:7070/users/${params.id}`,{
                headers: {
                    "Access-Control-Allow-Origin": 'http://localhost:7070'
                },
            })
            console.log(res.data.data);
            setEmp(res.data.data)
        }
        getEmp();
    }, [])


  return (
    <div className='hello'>
        <div className='hello1'>
        <h1>Name : {emp.name}</h1>
        <h2>Email ID : {emp.email}</h2>
        <h2>Employee ID : {emp.empid}</h2>
        <h2>Designation : {emp.designation}</h2>
        </div>
         
        <button type="submit" id='sub-btn9' onClick={()=>navigate('/')}>Click me to go to home page</button>  
             

    </div>
  )
}

export default GetEmp