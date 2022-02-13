import React, { useRef, useState } from 'react';
import {Alert} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import "../css/AdminSignupcss.css"
import welcome from "../images/welcome.png"


function AdminSignup(){

    const history = useHistory()
    const [info,setInfo] = useState({
        hospName:"",
        hospCode:"",
        uname:"",
        pass:"",
        place:""
    })
    const [mes,setMes]=useState();
    const [err,setErr]=useState();

    const [typ,setType]=useState("");

    function handleRad(e){
        if(e.target.value=="TALUK"){
            setType("Taluk");
        }else{
            setType("District");
        }

    }
    
    
    function handleChange(e){
        var name = e.target.name
        var val = e.target.value

        setInfo((prev)=>{
            return({
                ...prev,[name]:val
            })
        })
        
    }

    function handleSubmit(e){

        e.preventDefault();

        console.log(info.hospCode)
        const admin= Object({hospitalname:info.hospName,hospcode:info.hospCode,place:info.place,hierarchy:typ,username:info.uname,password:info.pass});
        console.log(admin)
        axios({
            method:"POST",
            url:"http://localhost:3030/AdminSignup",
            data:admin
        })
        .then((res)=>{
            console.log(res)
            if(res.data.error1){
                window.scrollBy("",window.screen.height)
                console.log("USER ALREADY EXIST")
                setErr("USER ALREADY EXIST")
            }
            if(res.data.error2){
                console.log("FAILED TO ADD")
                setErr("FAILED TO ADD")
            }
            if(res.data.success){
                console.log("ADMIN ADDEDD SUCCESSFULLY")
                setMes("ADMIN ADDEDD SUCCESSFULLY")
            }
        })
    }


    return(
        <div className="mainwrapper0">
            <div className='ko'>
                <label >SIGN-UP </label> 
            </div>
            <div className='upform0'>

            <form className='upform20' onSubmit={handleSubmit}>
                    <div className='lx0'>
                        <img src={welcome} alt="img"></img>
                    </div>

                    <div className='opp0'>
                        <label className='labe' htmlFor="hospName">HOSPITAL NAME</label>
                        <input className="oppinp0" onChange={handleChange} type="text" name="hospName" id="hospName" placeholder="Name" required></input>
                    </div>

                    <div className='opp0'>
                    <label className="labe" htmlFor="hospCode">HOSPITAL CODE</label>
                    <input className="oppinp0" onChange={handleChange} type="text" name="hospCode" id="hospCode" placeholder="Code" required></input>
                    </div>
                               
                    <div className='opp0'>
                    <label style={{display:"block"}} className="labe" htmlFor="pl">PLACE </label>
                    <input className="oppinp0" onChange={handleChange} name="place" type="text" id="pl" placeholder="Place" required></input>
                    </div>
                    <div className='opp0z'>
                    <label className="labez" htmlFor="sel">HOSPITAL TYPE</label>              
                    <input className='rad0z' type="radio" id="lq" onClick={handleRad} required='required' name="sel" value="TALUK"></input><span htmlFor="lq" style={{cursor:"context-menu"}}>TALUK</span> 
                    <input className='rad0z' type="radio" id="ld" onClick={handleRad} required='required' name="sel" value="DISTRICT"></input><span htmlFor="ld" style={{cursor:"context-menu"}}>DISTRICT</span>
                    </div>

                    <div className='opp0'>
                    <label className="labe" htmlFor="uname">SET USER NAME </label>
                    <input className="oppinp0" onChange={handleChange} type="text" name="uname" id="uname" placeholder="User Name" required></input>
                    </div>
                    
                    <div className='opp0'>
                    <label className="labe" htmlFor="pass">PASSWORD</label>
                    <input className="oppinp0" onChange={handleChange} name="pass" type="password" id="pass" placeholder="password" required></input>
                    </div>

                    <hr className='hni'></hr>
                    <br></br>

                    <div className="divsub20">
                <input className='su10'  value="SUBMIT" type="submit"></input>
                <input className='su10' value="RESET" type="reset"></input>
                    </div>
            <hr className='hni'></hr>
                <div className="dilink0">
            <label >Have an account? <Link className='dc0' to="/Admin_in">LOGIN</Link></label>
                </div>
                {mes && <Alert variant='success'>{mes}</Alert>}
                {err && <Alert variant='danger'>{err}</Alert>}
            </form>
            </div>

    </div>
    )
}



export default AdminSignup