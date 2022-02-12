import React ,{useEffect,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRef } from "react";
import { Alert } from "react-bootstrap";
import { Link, useHistory,Redirect } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {Stepper,Step,StepLabel,Typography,Button} from '@material-ui/core';
import axios from 'axios'
import '../css/AddDocCss.css'

const useStyles=makeStyles({
    root:{
        width:"100%",
        borderColor:"none",
        backgroundSize:"100vh",
        paddingBottom:"100px",
        borderBottom:"1px solid powderblue",  //BORDER BELOW FORM
        "& .MuiStepIcon-root.MuiStepIcon-active":{            
            color:"#B32C7D",   //background color of numbers area
            fontWeight:"bold",
            fontSize:"50px"
        },
        "& .MuiStepper-horizontal.MuiPaper-elevation0":{
            borderRadius:"20px",
            backgroundColor: "blue",  //DARK-PINK
        },
        "& .MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-completed":{
            color:"#B70F90",
        },
        "& .MuiStepIcon-text":{
            fontSize:"15px",
            fontWeight:"bold",
        }    
    }
})

const AddPatient =()=>{
    
    //hooks
    const [activeStep,setActiveStep]=useState(0);
    const steps=getSteps();
    const history=useHistory();
    const[mes,setMes]=useState();
    const[errr,setErrr]=useState();


    var [pat,setPat]=useState({
        name:"",
        age:"",
        num:"",
        place:"",
        depname:""
      })

    function getSteps(){
        return ["1","2","3"];
    }
    
    const handleNext=(e)=>{
        e.preventDefault();        
        setActiveStep( prevActiveStep=> prevActiveStep+1)
    }

    const handleBack=(e)=>{
        e.preventDefault();
        setActiveStep(prevActiveStep=> prevActiveStep-1)
    }

    function handleGender(e){
        if (e.target.checked) {
            setGender(e.target.value);
          }
    }

    function handleName(e){
        setPat((prev=>{
          return{
            ...prev,
            name:e.target.value
          }
        }))
      }
    
      function handleAge(e){
        setPat((prev=>{
          return{
            ...prev,
            age:e.target.value
          }
        }))
      }

      function handleNum(e){
        setPat((prev=>{
          return{
            ...prev,
            num:e.target.value
          }
        }))
      }


      function handlePlace(e){
        setPat((prev=>{
          return{
            ...prev,
            place:e.target.value
          }
        }))
      }

      function handleDep(e){
        setPat((prev=>{
          return{
            ...prev,
            depname:e.target.value
          }
        }))
      }


    // console.log(cusnameRef.current.value)
    const [gender, setGender] = useState();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(()=>{
        if(activeStep===steps.length){

            // const doctor= Object({docname:doc.name,age:doc.age,gender:doc.gender,phnumber:doc.num,qualification:doc.qualification,specialisation:doc.specialisation,hospitalname:,hospcode:{},place:{},hierarchy:{},username:doc.username,password:doc.password});
            // axios({
            //     method:"post",
            //     url:"http://localhost:3030/DocAdd",
            //     data: doctor
            // })
            // .then((res)=>{
            //     if(res.data.error1){
            //         console.log("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
            //     }
            //     if(res.data.error2){
            //         console.log("FAILED TO ADD DOCTOR")
            //     }
            //     if(res.data.success){
            //         console.log("DOCTOR ADDED SUCCESSFULLY")
            //     }
            // })

        setTimeout(()=>{
            if(activeStep===steps.length){
                // history.push("/Choices")
            }
        },5000) 
        }     
    },[activeStep])

   
    function getStepsContent(stepIndex){
        switch(stepIndex){
            case 0:
                return (
                    <div className="f1">
                        <form className="fox" onSubmit={handleNext} >
                        <div className="oppN">
                        <label htmlFor="Na" className="lN">PATIENT NAME </label>
                        <input id="Na" type="text" className="oppinpN" placeholder="ENTER NAME" onChange={handleName} value={pat.name || ""} required></input>

                        <br></br>
                        <label htmlFor="Na" className="lN">PATIENT AGE </label>
                        <input type="number" className="oppinpN"  id="Ac" onChange={handleAge} placeholder="AGE IN NUMBERS" value={pat.age || ""} required></input>

                        <br></br>
                        <label htmlFor="Na" className="lN">GENDER </label>
                            <input  type="radio" value="MALE" name='gender' required='required' checked={gender == 'MALE'} onChange={handleGender} />
                            <span style={{marginRight:"20px"}}>MALE</span>

                            <input type="radio" value="FEMALE" name='gender' required='required' checked={gender == 'FEMALE'} onChange={handleGender} />
                            <span >FEMALE</span>
                        </div>
                        <div className="divsubN">
                            <button className="nexbut" type="submit">NEXT</button>
                        </div>
                        </form>
                    </div>
                )

                case 1:
                    return (
                        <div className="f1">
                            <form className="fox" onSubmit={handleNext}>
                            <div className="oppN">
                            <label className="lN" htmlFor="Ac">MOBILE NUMBER</label>
                            <input type="number" className="oppinpN" pattern="[6789][0-9]{9}" id="Ac" onChange={handleNum} placeholder="10 DIGIT MOBILE NUMBER" value={pat.num || ""} required></input>
                            
                            <br></br>
                            <label htmlFor="Na" className="lN">PATIENT PLACE </label>
                            <input id="Na" type="text" className="oppinpN" placeholder="ENTER PLACE" onChange={handlePlace} value={pat.place || ""} required></input>

                            </div>
                            <div className="divsubN">
                                <button className="nexbut2" type="submit">NEXT</button>
                                <button className="nexbut2" onClick={handleBack}>BACK</button>
                            </div>
                            </form>
                        </div>
                    )

            case 2:
                return (
                    <div className="f1">
                        <form className="fox" onSubmit={handleNext}>
                        <div className="oppN">
                            <label className="lN">DEPARTMENT NAME</label>
                            <input className="oppinpN" type="text" onChange={handleDep}  value={pat.depname || ""} required></input>
                       </div> 
                       <div className="divsubN">
                            <button className="nexbut2" type="submit">SUBMIT</button>
                            <button className="nexbut2" onClick={handleBack}>BACK</button>
                        </div>
                        </form>
                    </div>
                    )
            
            case 7:
                return (
                    <div>
                    <form className="fox" onSubmit={handleNext}>
                        <h2>I CONFIRM THAT ALL THE DETAILS PROVIDED ARE CORRECT</h2>
                        <div className="divsubN" style={{marginTop:"20px"}}>
                        <button className="nexbut2" type="submit">YES</button>
                        <button className="nexbut2" onClick={handleBack}>NO</button>
                        </div>
                    </form>
                    </div>
                )
            default:
                return ("OOPS!!")
        }
    }
    const cla=useStyles()

    return(
        <div className="wr">
        <div   className="lan">ADD DOCTOR</div>
        <div style={{fontColor:"black"}} className={cla.root}>
            <Stepper  activeStep={activeStep}>
                {steps.map((labelx)=>(
                    <Step key={labelx}>
                        <StepLabel>
                        </StepLabel>
                    </Step> 
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <div style={{marginTop:"20px"}}>
                <h2 id="cq">"HELLO !! <br></br><Alert variant="success">PATIENT ADDED SUCCESSFULLY</Alert> </h2>
                {
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <CircularProgress />
                    </div>
                    
                }
                </div>) : 
            (  
            <>
                {getStepsContent(activeStep)}         
            </>
            )}
        </div>
        </div>
    )
}
export default AddPatient
