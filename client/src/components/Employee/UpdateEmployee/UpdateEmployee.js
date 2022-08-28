import React from "react";
import './UpdateEmployee.css'
import {Link} from 'react-router-dom';
import {useState} from 'react'
import { useParams } from "react-router-dom";
import { UpdateEmployeeApi } from "../../ApiCall/UpdateEmployeeApi";
import { useNavigate } from "react-router";

function UpdateEmployee(){

    const[name,setName]= useState('')
    const[emailval,setEmailval]= useState('');
    const[empid,setEmpid]= useState('');
    const[designation,setDesignation]= useState('');



    const params = useParams()

    const navigate = useNavigate();




    const handleSubmit=(e)=>{
        e.preventDefault();
        if(name!=='' ||emailval!=='' ||empid!==''||empid!==''||designation!==''){
            if (/@tothenew.com\s*$/.test(emailval)) {                
                    UpdateEmployeeApi(params.id,{"name":name,"email":emailval,"empid":empid,"designation":designation})
                    setName('');
                    setEmailval('');
                    setEmpid('');
                    setDesignation('');
                    alert('Updated Successful!!')       
                    navigate('/')        
             }
             else{
                 alert('User can only sign-up using To The New official email-ID. Kindly try again!!');
             } 
            
            }                        
        }

    return (
        <div className="register-main">
            <div className="top">
                    <h3>Go to Creating user Page
                    <Link id='link-signin' to='/create'> Click Here</Link>
                    </h3>
                </div>
            <div className="form">                
                <div className="body">
                    <form onSubmit={handleSubmit}>
                        <label for='username'>Update your Name :</label>
                        <input placeholder="Enter your name" 
                               type="text"
                               value={name}
                               onChange={(e)=>{setName(e.target.value)}} 
                        />
                        <label for='email'>Update your Email :</label>

                            <input placeholder="TTN Email-ID" 
                                   type='email' 
                                   value={emailval} 
                                   onChange={(e)=>{setEmailval(e.target.value)}} 
                            />
                        
                        <label for='empid'>Update your Employee ID :</label>
                            <input placeholder="Enter your Employee ID" 
                                   type='text'
                                   value={empid} 
                                   onChange={(e)=>{setEmpid(e.target.value)}}
                            />
                        <label for='designation'>Update your Designation :</label>
                            <input placeholder="Enter your designation" 
                                   type="text" 
                                   value={designation} 
                                   onChange={(e)=>{setDesignation(e.target.value)}}
                            />
                            <button type="submit" id='sub-btn' >Update User</button>
                        </form>
                </div>
               
            </div>            
        </div>
    )
}

export default UpdateEmployee;