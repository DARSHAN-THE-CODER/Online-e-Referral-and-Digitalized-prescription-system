import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
// import PatientShow from './PatientShow'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import pat from '../images/pat2.png'
import referr from '../images/refer2.png'
import Typography from '@mui/material/Typography';
import { Button , CardActionArea, CardActions } from '@mui/material';

function Docdashboard() {
  const history = useHistory();
  function addDesc(){
    history.push("/PatientShow")
  }

  function addRefernce(){
    history.push("/Refer")
  }

  let new1=JSON.parse(localStorage.getItem("doctInfo"))
  const [dii,setDii]=useState(new1.username)
  console.log("new1",new1.username)
  const[ple,setPle]=useState()
  const[rle,setRle]=useState()


    axios({
      method:"get",
      url:`http://localhost:3030/DocInfo/${new1.username}`
    })
    .then((res)=>{
      if(res.data.doct){
        console.log(res.data.doct)
        const y=res.data.doct;
        localStorage.setItem("doctInfo",JSON.stringify({docname:y.docname,hierarchy:y.hierarchy,hospcode:y.hospcode,hospname:y.hospname,patients:y.patients,place:y.place,qualification:y.qualification,referrals:y.referrals,username:y.username,specialisation:y.specialisation}))
        var new3=JSON.parse(localStorage.getItem("doctInfo"))
        setPle(new3.patients.length)
        setRle(new3.referrals.length)
        console.log(ple,rle)
      }
    })



  // const pa=new1.patients.length;
  // const reff=new1.refrrals.length;
  return (
    <div className='mainWrap'>

    <div className="row">

    <div className="col">
        <Card  sx={{ maxWidth: 345 }} onClick={addDesc}style={{borderRadius:"30px" , transition:"width 40s"}} >
        <CardActionArea className='cad'>
        <CardMedia
          component="img"
          height="370"
          image={pat}
          alt="doctor"
        />
        <CardContent className='sps' >
          <Typography  gutterBottom variant="h5" component="div">
            MY PATIENTS({ple})
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          ADD
        </Button>
      </CardActions> */}
    </Card>
    </div>

    <div className="col">
    <Card  sx={{ maxWidth: 345 }} onClick={addRefernce} style={{borderRadius:"30px" , transition:"width 40s"}} >
      <CardActionArea className='cad'>
        <CardMedia
          component="img"
          // height="260"
          height="370"
          image={referr}
          alt="patient"
        />
        <CardContent className='sps' >
          <Typography  gutterBottom variant="h5" component="div">
            REFERRALS({rle})
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          ADD
        </Button>
      </CardActions> */}
    </Card>
    </div>

    </div>

    </div>
  )
}

export default Docdashboard