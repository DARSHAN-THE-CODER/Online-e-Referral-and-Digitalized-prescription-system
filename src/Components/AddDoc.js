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

const AddDoc =()=>{
    
    //hooks
    const [activeStep,setActiveStep]=useState(0);
    const steps=getSteps();
    const history=useHistory();  
    const[mes,setMes]=useState();
    const[errr,setErrr]=useState();


    var [doc,setDoc]=useState({
        name:"",
        age:"",
        num:"",
        qualification:"",
        specialisation:"",
        gender:"",
        hierarchy:"",
        username:"",
        password:""
      })

    function getSteps(){
        return ["1","2","3","4"];
    }
    
    const handleNext=(e)=>{
        e.preventDefault();        
        setActiveStep( prevActiveStep=> prevActiveStep+1)
    }

    const handleBack=(e)=>{
        e.preventDefault();
        setActiveStep(prevActiveStep=> prevActiveStep-1)
    }

    function handleName(e){
        setDoc((prev=>{
          return{
            ...prev,
            name:e.target.value
          }
        }))
      }
    
      function handleAge(e){
        setDoc((prev=>{
          return{
            ...prev,
            age:e.target.value
          }
        }))
      }

      function handleNum(e){
        setDoc((prev=>{
          return{
            ...prev,
            num:e.target.value
          }
        }))
      }

      function handleQualification(e){
        setDoc((prev=>{
          return{
            ...prev,
            qualification:e.target.value
          }
        }))
      }
      function handleSpecialisation(e){
        setDoc((prev=>{
          return{
            ...prev,
            specialisation:e.target.value
          }
        }))
      }
      function handleGender(e){
        setDoc((prev=>{
          return{
            ...prev,
            gender:e.target.value
          }
        }))
      }

      function handleUsername(e){
        setDoc((prev=>{
          return{
            ...prev,
            username:e.target.value
          }
        }))
      }

      function handlePassword(e){
        setDoc((prev=>{
          return{
            ...prev,
            password:e.target.value
          }
        }))
      }

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(()=>{
        if(activeStep===steps.length){

            console.log(doc)
            const p=(JSON.parse(localStorage.getItem("adminInfo")))

            const doctor= Object({docname:doc.name,age:doc.age,gender:doc.gender,phnumber:doc.num,qualification:doc.qualification,specialisation:doc.specialisation,hospitalname:p.hospitalname,hospcode:p.hospcode,place:p.place,hierarchy:p.hierarchy,username:doc.username,password:doc.password});
            axios({
                method:"post",
                url:"http://localhost:3030/DocAdd",
                data: doctor
            })
            .then((res)=>{
                if(res.data.error1){
                    console.log("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
                    setErrr("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
                    setTimeout(()=>{
                        setErrr("")
                        history.push("/AdminDashboard")
                    },3000)
                }
                if(res.data.error2){
                    console.log("FAILED TO ADD DOCTOR")
                    setErrr("FAILED TO ADD DOCTOR")
                    setTimeout(()=>{
                      setErrr("")
                      history.push("/AdminDashboard")
                  },3000)
                }
                if(res.data.success){
                    console.log("DOCTOR ADDED SUCCESSFULLY")
                    setMes("DOCTOR ADDED SUCCESSFULLY")
                    setTimeout(()=>{
                      setMes("")
                      history.push("/AdminDashboard")
                  },3000)
                }
            })

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
                        <label htmlFor="Na" className="lN">DOCTOR NAME </label>
                        <input id="Na" type="text" className="oppinpN" placeholder="ENTER NAME" onChange={handleName} value={doc.name || ""} required></input>
                        </div>
                       

                        <div className="oppN">
                        <label className="lN" htmlFor="Ac">DOCTOR AGE </label>
                        <input type="number" className="oppinpN"  id="Ac" onChange={handleAge} placeholder="AGE IN NUMBERS" value={doc.age || ""} required></input>
                        </div>

                        <div className="oppN">
                        <label className="lN" htmlFor="Ac">MOBILE NUMBER</label>
                        <input type="text" className="oppinpN" pattern="[6789][0-9]{9}" id="Ac" onChange={handleNum} placeholder="10 DIGIT MOBILE NUMBER" value={doc.num || ""} required></input>
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
                        {/* <div className="oppN">
                        <label className="lN" htmlFor="Ac">AGE</label>
                        <input type="number" className="oppinpN"  id="Ac" onChange={handleAge} placeholder="AGE IN NUMBERS" value={doc.age || ""} required></input>
                        </div> */}

                        <div className="oppN">
                            <label className="lN">QUALIFICATION</label>
                            <input className="oppinpN" type="text" onChange={handleQualification}  value={doc.qualification || ""} required></input>
                       </div>

                        {/* <div className="divsubN">
                            <button className="nexbut2" type="submit">NEXT</button>
                            <button className="nexbut2" onClick={handleBack}>BACK</button>
                        </div>
 */}
                        <div className="oppN">
                            <label className="lN">SPECIALISATION</label>
                            <input className="oppinpN" onChange={handleSpecialisation}  value={doc.specialisation || ""} required></input>
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
                        <h4 className="lN">USERNAME</h4>
                        <input className="oppinpN" type="text"  onChange={handleUsername}  value={doc.username || ""} required></input>
                    <br></br>
                        <h4 className="lN">PASSWORD</h4>
                        <input className="oppinpN" type="password"  onChange={handlePassword}  value={doc.password || ""} required></input>

                        <div className="divsubN" style={{marginTop:"20px"}}>
                            <button className="nexbut2" type="submit">SUBMIT</button>
                            <button className="nexbut2" onClick={handleBack}>BACK</button>
                        </div>
                    </div>
                    </form>
                    </div>
                    )
            case 3:
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
                <h2 id="cq">"HELLO !! </h2><br></br>
                {errr && <Alert variant="danger">{errr}</Alert> }
                {mes && <Alert variant="success">{mes}</Alert>}
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
export default AddDoc





































// ----------------------------------------------------------------------------------------------------------------
// import React ,{useEffect,useState} from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { useRef } from "react";
// import { Alert } from "react-bootstrap";
// import { Link, useHistory,Redirect } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';
// import {Stepper,Step,StepLabel,Typography,Button} from '@material-ui/core';
// import axios from 'axios'
// import '../css/AddDocCss.css'

// const useStyles=makeStyles({
//     root:{
//         width:"100%",
//         borderColor:"none",
//         backgroundSize:"100vh",
//         paddingBottom:"100px",
//         borderBottom:"1px solid powderblue",  //BORDER BELOW FORM
//         "& .MuiStepIcon-root.MuiStepIcon-active":{            
//             color:"#B32C7D",   //background color of numbers area
//             fontWeight:"bold",
//             fontSize:"50px"
//         },
//         "& .MuiStepper-horizontal.MuiPaper-elevation0":{
//             borderRadius:"20px",
//             backgroundColor: "blue",  //DARK-PINK
//         },
//         "& .MuiSvgIcon-root.MuiStepIcon-root.MuiStepIcon-completed":{
//             color:"#B70F90",
//         },
//         "& .MuiStepIcon-text":{
//             fontSize:"15px",
//             fontWeight:"bold",
//         }    
//     }
// })

// const AddDoc =()=>{
    
//     //hooks
//     const [activeStep,setActiveStep]=useState(0);
//     const steps=getSteps();
//     const history=useHistory();
//     const[mes,setMes]=useState();
//     const[errr,setErrr]=useState();


//     var [doc,setDoc]=useState({
//         name:"",
//         age:"",
//         num:"",
//         qualification:"",
//         specialisation:"",
//         gender:"",
//         hierarchy:"",
//         username:"",
//         password:""
//       })

//     function getSteps(){
//         return ["1","2","3","4","5","6","7"];
//     }
    
//     const handleNext=(e)=>{
//         e.preventDefault();        
//         setActiveStep( prevActiveStep=> prevActiveStep+1)
//     }

//     const handleBack=(e)=>{
//         e.preventDefault();
//         setActiveStep(prevActiveStep=> prevActiveStep-1)
//     }

//     function handleName(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             name:e.target.value
//           }
//         }))
//       }
    
//       function handleAge(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             age:e.target.value
//           }
//         }))
//       }

//       function handleNum(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             num:e.target.value
//           }
//         }))
//       }

//       function handleQualification(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             qualification:e.target.value
//           }
//         }))
//       }
//       function handleSpecialisation(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             specialisation:e.target.value
//           }
//         }))
//       }
//       function handleGender(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             gender:e.target.value
//           }
//         }))
//       }

//       function handleUsername(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             username:e.target.value
//           }
//         }))
//       }

//       function handlePassword(e){
//         setDoc((prev=>{
//           return{
//             ...prev,
//             password:e.target.value
//           }
//         }))
//       }
//     // console.log(cusnameRef.current.value)

//     const [open, setOpen] = useState(false);
//     const closeModal = () => setOpen(false);

//     useEffect(()=>{
//         if(activeStep===steps.length){

//             // const doctor= Object({docname:doc.name,age:doc.age,gender:doc.gender,phnumber:doc.num,qualification:doc.qualification,specialisation:doc.specialisation,hospitalname:,hospcode:{},place:{},hierarchy:{},username:doc.username,password:doc.password});
//             // axios({
//             //     method:"post",
//             //     url:"http://localhost:3030/DocAdd",
//             //     data: doctor
//             // })
//             // .then((res)=>{
//             //     if(res.data.error1){
//             //         console.log("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
//             //     }
//             //     if(res.data.error2){
//             //         console.log("FAILED TO ADD DOCTOR")
//             //     }
//             //     if(res.data.success){
//             //         console.log("DOCTOR ADDED SUCCESSFULLY")
//             //     }
//             // })

//         setTimeout(()=>{
//             if(activeStep===steps.length){
//                 // history.push("/Choices")
//             }
//         },5000) 
//         }     
//     },[activeStep])

   
//     function getStepsContent(stepIndex){
//         switch(stepIndex){
//             case 0:
//                 return (
//                     <div className="f1">
//                         <form className="fox" onSubmit={handleNext} >
//                         <div className="oppN">
//                         <label htmlFor="Na" className="lN">DOCTOR NAME </label><br></br><br></br>
//                         <input id="Na" type="text" className="oppinpN" placeholder="ENTER NAME" onChange={handleName} value={doc.name || ""} required></input>
//                         </div>
                       
//                         <div className="divsubN">
//                             <button className="nexbut" type="submit">NEXT</button>
//                         </div>
//                         </form>
//                     </div>
//                 )
//             case 1:
//                 return (
//                     <div className="f1">
//                         <form className="fox" onSubmit={handleNext}>
//                         <div className="oppN">
//                         <label className="lN" htmlFor="Ac">AGE</label>
//                         <input type="number" className="oppinpN"  id="Ac" onChange={handleAge} placeholder="AGE IN NUMBERS" value={doc.age || ""} required></input>
//                         </div>
//                         <div className="divsubN">
//                             <button className="nexbut2" type="submit">NEXT</button>
//                             <button className="nexbut2" onClick={handleBack}>BACK</button>
//                         </div>
//                         </form>
//                     </div>
//                 )
//                 case 2:
//                     return (
//                         <div className="f1">
//                             <form className="fox" onSubmit={handleNext}>
//                             <div className="oppN">
//                             <label className="lN" htmlFor="Ac">MOBILE NUMBER</label>
//                             <input type="number" className="oppinpN" pattern="[6789][0-9]{9}" id="Ac" onChange={handleNum} placeholder="10 DIGIT MOBILE NUMBER" value={doc.num || ""} required></input>
//                             </div>
//                             <div className="divsubN">
//                                 <button className="nexbut2" type="submit">NEXT</button>
//                                 <button className="nexbut2" onClick={handleBack}>BACK</button>
//                             </div>
//                             </form>
//                         </div>
//                     )
//             case 3:
//                     return (
//                         <div className="f1">
//                         <form className="fox" onSubmit={handleNext}>
//                         <div className="oppN">
//                             <label className="lN">GENDER</label>
//                             <input className="oppinpN"  onChange={handleGender}  value={doc.gender || ""} required></input>
//                             <div className="divsubN" style={{marginTop:"20px"}}>
//                             <button className="nexbut2" type="submit">SUBMIT</button>
//                             <button className="nexbut2" onClick={handleBack}>BACK</button>
//                             </div>
//                         </div>
//                         </form>
//                         </div>
//                     )

//             case 4:
//                 return (
//                     <div className="f1">
//                         <form className="fox" onSubmit={handleNext}>
//                         <div className="oppN">
//                             <label className="lN">QUALIFICATION</label>
//                             <input className="oppinpN" type="text" onChange={handleQualification}  value={doc.qualification || ""} required></input>
//                        </div> 
//                        <div className="divsubN">
//                             <button className="nexbut2" type="submit">SUBMIT</button>
//                             <button className="nexbut2" onClick={handleBack}>BACK</button>
//                         </div>
//                         </form>
//                     </div>
//                     )
            
//             case 5:
//                 return (
//                     <div className="f1">
//                         <form className="fox" onSubmit={handleNext}>
//                         <div className="oppN">
//                             <label className="lN">SPECIALISATION</label>
//                             <input className="oppinpN" onChange={handleSpecialisation}  value={doc.specialisation || ""} required></input>
//                         </div>
//                         <div className="divsubN">
//                             <button className="nexbut2" type="submit">SUBMIT</button>
//                             <button className="nexbut2" onClick={handleBack}>BACK</button>
//                         </div>
//                         </form>
//                     </div>
//                     )

            
//             case 6:
//                 return (
//                     <div className="f1">
//                     <form className="fox" onSubmit={handleNext}>
//                     <div className="oppN">
//                         <h4 className="lN">USERNAME</h4>
//                         <input className="oppinpN" type="text"  onChange={handleUsername}  value={doc.username || ""} required></input>
//                     <br></br>
//                         <h4 className="lN">PASSWORD</h4>
//                         <input className="oppinpN" type="password"  onChange={handlePassword}  value={doc.password || ""} required></input>

//                         <div className="divsubN" style={{marginTop:"20px"}}>
//                             <button className="nexbut2" type="submit">SUBMIT</button>
//                             <button className="nexbut2" onClick={handleBack}>BACK</button>
//                         </div>
//                     </div>
//                     </form>
//                     </div>
//                     )
//             case 7:
//                 return (
//                     <div>
//                     <form className="fox" onSubmit={handleNext}>
//                         <h2>I CONFIRM THAT ALL THE DETAILS PROVIDED ARE CORRECT</h2>
//                         <div className="divsubN" style={{marginTop:"20px"}}>
//                         <button className="nexbut2" type="submit">YES</button>
//                         <button className="nexbut2" onClick={handleBack}>NO</button>
//                         </div>
//                     </form>
//                     </div>
//                 )
//             default:
//                 return ("OOPS!!")
//         }
//     }
//     const cla=useStyles()

//     return(
//         <div className="wr">
//         <div   className="lan">ADD DOCTOR</div>
//         <div style={{fontColor:"black"}} className={cla.root}>
//             <Stepper  activeStep={activeStep}>
//                 {steps.map((labelx)=>(
//                     <Step key={labelx}>
//                         <StepLabel>
//                         </StepLabel>
//                     </Step> 
//                 ))}
//             </Stepper>

//             {activeStep === steps.length ? (
//                 <div style={{marginTop:"20px"}}>
//                 <h2 id="cq">"HELLO !! {doc.name}<br></br><Alert variant="success">DOCTOR ADDED SUCCESSFULLY</Alert> </h2>
//                 {
//                     <div style={{display:"flex",justifyContent:"center"}}>
//                         <CircularProgress />
//                     </div>
                    
//                 }
//                 </div>) : 
//             (  
//             <>
//                 {getStepsContent(activeStep)}         
//             </>
//             )}
//         </div>
//         </div>
//     )
// }
// export default AddDoc
