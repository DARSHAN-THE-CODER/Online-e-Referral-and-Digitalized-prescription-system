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

mongoose.connect("mongodb+srv://DARSHAN:HACKATHON@health.ql4pt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

app.listen(3030,() =>{
    console.log('server file is running')
});



