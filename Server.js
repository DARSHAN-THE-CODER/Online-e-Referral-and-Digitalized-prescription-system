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
    referrals:[]
})

const patientSchema=new mongoose.Schema({
    name:String,
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
    const Admin=new Admin({hospitalname,hospcode,place,hierarchy,username,password})
    admin.findOne({hospcode:hospcode},(err,user)=>{
        if(user){
            res.send({error:"USER ALREADY EXIST"})
        }
        else{
            Admin.save((erro)=>{
                if(erro)
                {
                    console.log(erro)
                    res.send({error:"FAILED TO ADD ADMIN"})
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
            res.send({error:"USER NOT FOUND"})
        }
        else{
            if(user.password==password){
                res.send({success:"LOGIN SUCCESSFULL"})
            }
            else{
                console.log("INVALID CREDENTIALS")
                res.send({error:"INVALID CREDENTIALS"})
            }
        }
    })
})

//----------------------------NEW DOCTOR ADDING (DONE ONLY BY ADMIN OF HOSPITAL)--------------------------------
app.post("/DocAdd",(req,res)=>{
    const {docname,age,gender,phnumber,qualification,specialisation,hospitalname,hospcode,place,hierarchy,username,password}=req.body;
    const Doctor=new doctor({docname,age,gender,phnumber,qualification,specialisation,department,hospitalname,hospcode,place,hierarchy,username,password});

    doctor.findOne({username:username},(err,user)=>{
        if(user){
            console.log(user)
            console.log("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
        }
        else{
            Doctor.save((err)=>{
                if(err){
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
            res.send({error:"USER NOT FOUND"})
        }
        if(doctor){
            console.log(doctor)
            if(doctor.password==password){
                res.send({success:"USER LOGGED IN SUCCESSFULLY"})
                console.log("DOCTOR LOGGED IN")
            }
            else{
                res.send({incorrect:"PASSWORD IS INCORRECT"})
            }
        }
    })
})

//--------------------ADDING NEW PATIENT BY ADMINS ONLY ----------------------------------------------------
app.post("/PatientAdd",(req,res)=>{
    const pcode=Math.random().toString(36).substr(2,5);
    const {name,gender,phnumber,age,place,deptname}=req.body;
    const patient=new patient({name,gender,phnumber,age,place,deptname,pcode})
    patient.save((err)=>{
        if(err){
            console.log(err)     
            res.send({error:"FAILED TO ADD PATIENT"})      
        }
        else{
            console.log("PATIENT ADDED")
        }
    })
})

// app.get("")

//--------------DOCTORS ADDING PRESCRIPTION OF PATIENT -----------------------------------------------------
app.post("/AddPrescription",(req,res)=>{
    const {pcode , prescription}=req.body;
    patient.findOneAndUpdate({pcode:pcode},{$push:{prescription:prescription}})
    .then(
        patient.findOne({pcode:pcode},(err,user)=>{
            if(user){
                res.send({user:user})
                console.log(user)
            }
            if(err){
                console.log(err)
            }
        })
    )
})

//----------RETURNS PATIENT DETAILS IF PATIENT-CODE IS GIVEN------------------------------------------------
app.get("/FindPatient/:id",(req,res)=>{
        const {pcode}=req.params.id;
        patient.findOne({pcode:pcode},(err,user)=>{
            if(user){
                console.log(user)
                res.send({user:user})
            }
            if(err){
                console.log(err)
            }
        })
})

 //------------IF ONE DOCTOR-REFERS ANOTHER DOCTOR -------------------------------------------------------
app.post("/AddReferrals",(req,res)=>{
    const {pcode,docusername}=req.body;
    doctor.findOneAndUpdate({docusername:docusername},{$push:{referrals:pcode}})
    .then(
        doctor.findOne({docusername:docusername},(err,doc)=>{
            if(doc){
                console.log(doc)
            }
            else{
                console.log(err)
            }
        })
    )
})

//------------------GETTING LIST OF ALL DOCTORS -------------------------------------------------------

app.get("/GetDocList",(req,res)=>{
    doctor.find({},(err,users)=>{
        if(err){
            console.log(err)
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



