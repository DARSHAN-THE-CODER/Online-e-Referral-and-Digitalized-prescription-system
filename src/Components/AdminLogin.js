import React, { useRef, useState } from 'react';
import {Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminLogincss.css'
import hi from '../images/hello.png'
function AdminLogin() {

    const ph=useRef()
    const pw=useRef()
    const [error,setError]=useState();

    function handleSubmit(e){
        e.preventDefault()
        console.log(ph.current.value)
        console.log(pw.current.value)

        axios({
            method:"get",
            url:`http://localhost:3030/AdminLogin/${ph.current.value}/${pw.current.value}`
        })
        .then((res)=>{
            if(res.data.error1){
                console.log("USER NOT FOUND")
            } 
            if(res.data.error2){
                console.log("PASSWORD IS INCORRECT")
            }
        
            if(res.data.success){
                console.log("USER LOGIN SUCCESS")
            }    
        })
    }
  return (    
    <div   className='mainwrapper0'>
       
       <div className='ko'>
                <label htmlFor='xd' >LOGIN</label> <br></br>
        </div>
        <div  className='upform0p'>

        <form  className='upform20k' onSubmit={handleSubmit}>

            <div className='lx0'>
            <img src={hi} alt="hi"></img>
            <hr className='lsl'></hr>
            </div>
            
            <div className='opp0p'>
            <label className='labep' htmlFor='pl' >USER NAME </label>
            <input id='pl' className="oppinp0p" required placeholder='User Name ' ref={ph} type="text"></input>                            
            </div>
            
            <div className='opp0p'>
            <label className='labep' htmlFor='prd'> PASSWORD</label>
            <input id='prd' required className="oppinp0p" placeholder='PASSWORD' ref={pw} type="password"></input>
            </div>
            
            <hr className='lsl'></hr>
            <br></br>
            <div className='divsub20'>
                <input className='su10' value="SUBMIT" type="submit"></input><br></br>
                <input className='su10' value="RESET" type="reset"></input>
            </div>
            
            {error && <Alert variant='danger'>{error}</Alert>}
        </form>
        </div>
    </div>
    )
}

export default AdminLogin;