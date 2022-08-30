import React from "react";
import './AddEmployee.css'
import {useState} from 'react'
import { AddEmployeeApi } from "../../ApiCall/AddEmployeeApi";
import { useNavigate } from "react-router";

function AddEmployee(){

    const[name,setName]= useState('')
    const[emailval,setEmailval]= useState('');
    const[empid,setEmpid]= useState('');
    const[designation,setDesignation]= useState('');

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(name!=='' ||emailval!=='' ||empid!==''||designation!==''){
            if (/@tothenew.com\s*$/.test(emailval)) {                
                    AddEmployeeApi({"name":name,"email":emailval,"empid":empid,"designation":designation})
                    setName('');
                    setEmailval('');
                    setEmpid('');
                    setDesignation('');
                    alert('Employee has been created!!')  
                    navigate('/')             
             }
             else{
                 alert('Employee can only be creayed using To The New official email-ID. Kindly try again!!');
             } 
            
            }                        
        }

    return (
        <div className="register-main">
            <div className="form">                
                <div className="body">
                    <form onSubmit={handleSubmit}>
                        <label for='name'>Enter your Name :</label>
                        <input placeholder="Enter your name" 
                               type="text"
                               value={name}
                               onChange={(e)=>{setName(e.target.value)}} 
                        />
                        <label for='email'>Email :</label>

                            <input placeholder="TTN Email-ID" 
                                   type='email' 
                                   value={emailval} 
                                   onChange={(e)=>{setEmailval(e.target.value)}} 
                            />
                        
                        <label for='empid'>Employee ID :</label>
                            <input placeholder="Enter your Employee ID" 
                                   type="text" 
                                   value={empid} 
                                   onChange={(e)=>{setEmpid(e.target.value)}}
                            />
                        <label for='designation'>Designation :</label>
                            <input placeholder="Enter your designation" 
                                   type="text" 
                                   value={designation} 
                                   onChange={(e)=>{setDesignation(e.target.value)}}
                            />
                            <button type="submit" id='sub-btn' >Create Employee</button>
                        </form>
                </div>
               
            </div>            
        </div>
    )
}

export default AddEmployee;