import React, { useRef, useState } from 'react';
import {Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminLogincss.css'
import hi from '../images/hello.png'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {useHistory} from 'react-router-dom';

function DoctorLogin() {

    const ph=useRef()
    const pw=useRef()
    const [error1,setError1]=useState();
    const [mes,setMes]=useState();
    const [loading, setLoading] = useState(false)
    const history=useHistory()
    function handleSubmit(e){
        e.preventDefault()
        console.log(ph.current.value)
        console.log(pw.current.value)

        axios({
            method:"get",
            url:`http://localhost:3030/DoctorLogin/${ph.current.value}/${pw.current.value}`
        })
        .then((res)=>{
            if(res.data.error1){
                console.log("USER NOT FOUND")
                setError1("USER NOT FOUND")
            } 
            else if(res.data.incorrect){
                console.log("PASSWORD IS INCORRECT")
                setError1("PASSWORD IS INCORRECT")
            }
        
            else if(res.data.success){
                console.log(res.data.success)
                const y=res.data.success;
                localStorage.setItem("doctInfo",JSON.stringify({docname:y.docname,hierarchy:y.hierarchy,hospcode:y.hospcode,hospname:y.hospname,patients:y.patients,place:y.place,qualification:y.qualification,referrals:y.referrals,username:y.username,specialisation:y.specialisation}))
                console.log("DOCTOR LOGGED IN")
                setMes("DOCTOR LOGGED IN")
                history.push("/Docdashboard")
            } 
            else{
                setError1("FAILED TO LOGIN")
            }
        })
        // setLoading(false)
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
            
            {/* <hr className='lsl'></hr> */}
            <br></br>
            <div className='divsub20'>
                <input className='su10'  value="SUBMIT" type="submit"></input>
                <input className='su10' value="RESET" type="reset"></input>
            </div>
            <div className="xop">
            {error1 && <Alert style={{textAlign:"center",marginTop:"none"}} variant='danger'>{error1}</Alert>}
            </div>
        </form>

        </div>

    </div>
    )
}

export default DoctorLogin;
