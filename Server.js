import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fetch, { Headers } from 'node-fetch';
import https from 'https'
var app=express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
app.use(cors())
var PROCESS=dotenv.config()

mongoose.connect(process.env.MONGO);
var db=mongoose.connection;


db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

const adminSchema=new mongoose.Schema({
    hospitalname:String,
    hospcode:String,
    place:String,
    hierarchy:String,
    username:String,
    password:String
})

const doctorSchema=new mongoose.Schema({
    docname:String,
    age:Number,
    gender:String,
    qualification:String,
    specialisation:String,
    department:String,
    hospitalname:String,
    hospcode:String,
    place:String,
    hierarchy:String,
    username:String,
    password:String,
    patients:[],
    referrals:[]
})

const patientSchema=new mongoose.Schema({
    pname:String,
    gender:String,
    phnumber:String,
    age:Number,
    place:String,
    deptname:String,
    pcode:String,
    prescription:[]
})

const admin=new mongoose.model("Admin",adminSchema)
const patient=new mongoose.model("Patient",patientSchema)
const doctor=new mongoose.model("Doctor",doctorSchema)

//--------------------NEW ADMIN (SPECIFICALLY NEW HOSPITAL) SIGNUP--------------------------------------------------
app.post("/AdminSignup",(req,res)=>{
    const {hospitalname,hospcode,place,hierarchy,username,password}=req.body;
    console.log(req.body);
    const admin1=new admin({hospitalname,hospcode,place,hierarchy,username,password})
    admin.findOne({hospcode:hospcode},(err,user)=>{
        if(user){
            res.send({error1:"USER ALREADY EXIST"})
        }
        else{
            admin1.save((erro)=>{
                if(erro)
                {
                    console.log(erro)
                    res.send({error2:"FAILED TO ADD ADMIN"})
                }
                else{
                    res.send({success:"ADMIN ADDED SUCCESSFULLY"})
                    console.log("ADMIN ADDED SUCCESSFULLY")
                }
            })
        }
    })
})

//---------------------------ADMIN LOGIN-------------------------------------------------------

app.get("/AdminLogin/:uname/:pword",(req,res)=>{
    const username=req.params.uname;
    const password=req.params.pword;
    admin.findOne({username:username},(err,user)=>{
        if(err){
            console.log(err)
            res.send({error1:"USER NOT FOUND"})
        }
        if(user){
            console.log(password)
            console.log(user.password)
            if(user.password==password){
                res.send({success:user})
            }
            else{
                console.log("INVALID CREDENTIALS")
                res.send({error2:"INVALID CREDENTIALS"})
            }
        }
        else{
            console.log("USER NOT EXIST")
            res.send({error1:"USER NOT FOUND"})
        }
    })
})

//----------------------------NEW DOCTOR ADDING (DONE ONLY BY ADMIN OF HOSPITAL)--------------------------------
app.post("/DocAdd",(req,res)=>{
    const {docname,age,gender,phnumber,qualification,specialisation,hospitalname,hospcode,place,hierarchy,username,password}=req.body;
    const Doctor=new doctor({docname,age,gender,phnumber,qualification,specialisation,hospitalname,hospcode,place,hierarchy,username,password});

    doctor.findOne({username:username},(err,user)=>{
        if(user){
            console.log(user)
            console.log("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
            res.send({error1:"DOCTOR ALREADY EXIST WITH  THAT USERNAME"})
        }
        else{
            Doctor.save((err)=>{
                if(err){
                    res.send({error2:"FAILED TO ADD DOCTOR"})
                    console.log("FAILED TO ADD DOCTOR")
                }
                else{
                    console.log("DOCTOR ADDED SUCCESSFULLY")
                    res.send({success:"DOCTOR ADDEDD SUCCESSFULLY"})
                }
            })
        }
    })
    // Doctor.save((err)=>{
    //     if(err){
    //         console.log("FAILED TO ADD DOCTOR")
    //     }
    //     else{
    //         console.log("DOCTOR ADDED SUCCESSFULLY")
    //         res.send({success:"DOCTOR ADDEDD SUCCESSFULLY"})
    //     }
    // })
})

//-----------------------------DOCTOR LOGIN----------------------------------------------------------------
app.get("/DoctorLogin/:uname/:pword",(req,res)=>{
    const username=req.params.uname;
    const password=req.params.pword;
    doctor.findOne({username:username},(err,doctor)=>{
        if(err){
            console.log(err)
            console.log("USER NOT FOUND")
            res.send({error1:"USER NOT FOUND"})
        }
        if(doctor){
            console.log(doctor)
            if(doctor.password==password){
                res.send({success:doctor})
                console.log("DOCTOR LOGGED IN")
            }
            else{
                console.log("PASSWORD IS INCORRECT")
                res.send({incorrect:"PASSWORD IS INCORRECT"})
            }
        }
    })
})

//--------------------ADDING NEW PATIENT BY ADMINS ONLY ----------------------------------------------------
app.post("/PatientAdd",(req,res)=>{
    var pcode=Math.random().toString(36).substr(2,5);
    console.log(pcode)
    
    const {pname,gender,phnumber,age,place,deptname}=req.body;
    pcode=pname+"_"+pcode;
    const patient1=new patient({pname,gender,phnumber,age,place,deptname,pcode})
    // patient1.save((err)=>{
    //     if(err){
    //         console.log(err)   
    //         console.log("FAILED TO ADD PATIENT")  
    //         res.send({error1:"FAILED TO ADD PATIENT"})      
    //     }
    //     else{
    //         console.log("PATIENT ADDED")
    //         console.log(pcode)
    //         // doctor.findOneAndUpdate({username:deptname},{$push:{patients:pcode}})
    //         // .then(
    //         //     res.send({success:"PATIENT ADDED"})
    //         // )
    //         doctor.findOne({username:deptname},(err,doctor)=>{
    //             if(err){
    //                 res.send({error2:"FAILED"})
    //             }
    //             if(doctor){
    //                 doctor.findOneAndUpdate({username:deptname},{$push:{patients:pcode}})
    //                 .then(
    //                     res.send({success:"PATIENT ADDED"})
    //                     )
    //             }
    //             else{
    //                 res.send({error3:"NO DOCTOR WITH THE GIVEN ID"})
    //                 console.log("NO DOCTOR WITH THE GIVEN ID")
    //             }
    //         })
    //     }
    // })
    
    doctor.findOne({username:deptname},(err,doc)=>{
        if(err){
            res.send({error2:"FAILED"})
        }
        if(doc){
            doctor.findOneAndUpdate({username:deptname},{$push:{patients:pcode}})
            .then(
                patient1.save((err)=>{
                        if(err){
                                console.log(err)   
                                console.log("FAILED TO ADD PATIENT")  
                                res.send({error1:"FAILED TO ADD PATIENT"})      
                        }else{            
                            res.send({success:"PATIENT ADDED"})
                        }
                    })
                    )
                }
        else{
            res.send({error3:"NO DOCTOR WITH THE GIVEN ID"})
            console.log("NO DOCTOR WITH THE GIVEN ID")
        }
    })
})

// app.get("")

//--------------DOCTORS ADDING PRESCRIPTION OF PATIENT -----------------------------------------------------
app.post("/AddPrescription",(req,res)=>{
    const {pcode , prescription}=req.body;
    console.log(pcode)
    console.log(prescription)
    patient.findOneAndUpdate({pcode:pcode},{$push:{prescription:prescription}})
    .then(
        patient.findOne({pcode:pcode},(err,user)=>{
            if(user){
                res.send({user:user})
                console.log(user)
            }
            if(err){
                console.log(err)
                res.send({error1:"UNABLE TO ADD PRESCRIPTION"})
                console.log("UNABLE TO ADD PRESCRIPTION")
            }
        })
    )
})

//----------RETURNS PATIENT DETAILS IF PATIENT-CODE IS GIVEN------------------------------------------------
app.get("/FindPatient/:id",(req,res)=>{
        const pcode=req.params.id;
        console.log(pcode)
        patient.findOne({pcode:pcode},(err,user)=>{
            if(user){
                console.log(user)
                res.send({user:user})
            }
            if(err){
                console.log(err)
                console.log("USER NOT EXIST")
                res.send({error1:"USER NOT EXIST"});
            }
        })
})

 //------------IF ONE DOCTOR-REFERS ANOTHER DOCTOR -------------------------------------------------------
app.post("/AddReferrals",(req,res)=>{
    const {pcode,docusername}=req.body;
    console.log(docusername)
    console.log(pcode)
    doctor.findOne({username:docusername},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc){
            doctor.findOneAndUpdate({username:docusername},{$push:{referrals:pcode}})
            .then(
                res.send({success:"PRESCRIPTION ADDED"})     
            )   
            .catch(()=>{
                console.log("FAILED TO ADD")
                res.send({error1:"FAILED TO ADD"})
            }
            )   
            console.log(doc)
        }
        else{
            console.log("NOT FOUND")
            res.send({error2:"DOCTOR ID NOT FOUND"})
        }
    })
   
})

app.post("/RemPat",(req,res)=>{
    const {pcode,docusername}=req.body;
    doctor.findOneAndUpdate({username:docusername},{$pull:{patients:pcode}})
    .then(()=>{
        res.send({success:"PATIENT REMOVED FROM LIST"})
        console.log("PATIENT REMOVED")
    }
    )
    .catch((e)=>{
        console.log(e)
        res.send({error1:"FAILED TO DELETE"})
    })
})

app.post("/RemRefPat",(req,res)=>{
    const {pcode,docusername}=req.body;
    doctor.findOneAndUpdate({username:docusername},{pull:{referrals:pcode}})
    .then(()=>{
        res.send({success:"PATIENT REMOVED FROM LIST"})
        console.log("PATIENT REMOVED")
    }
    )
    .catch((e)=>{
        console.log(e)
        res.send({error1:"FAILED TO DELETE"})
    })
})
//------------------GETTING LIST OF ALL DOCTORS -------------------------------------------------------

app.get("/GetDocList",(req,res)=>{
    doctor.find({},(err,users)=>{
        if(err){
            console.log(err)
            console.log("FAILED TO FETCH DOCTOR LIST")
            res.send("FAILED TO FETCH DOCTOR LIST")
        }
        if(users){
            console.log(users)
            res.send({doctors:users})
        }
    })
})


app.listen(3030,() =>{
    console.log('server file is running')
});



