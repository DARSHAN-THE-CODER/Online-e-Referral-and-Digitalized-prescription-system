import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button , CardActionArea, CardActions } from '@mui/material';
import doctor from '../images/doctor.png';
import patient from '../images/patient.png';
import '../css/AdminDashcss.css'

function AdminDashboard() {

    const history=useHistory();
    function addoctor(){
        history.push("/AddDoc")
    }

    function addpatient(){
        history.push("/AddPat")
    }

  return (
    <div className='mainWrap'>

    <div className="row1">

    <div className="col">
        <Card  sx={{ maxWidth: 345 }} onClick={addoctor} style={{borderRadius:"30px" , transition:"width 40s"}} >
        <CardActionArea className='cad'>
        <CardMedia
          component="img"
          height="260"
          image={doctor}
          alt="doctor"
        />
        <CardContent className='sps' >
          <Typography  gutterBottom variant="h5" component="div">
            ADD DOCTOR
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
    <Card  sx={{ maxWidth: 345 }} onClick={addpatient} style={{borderRadius:"30px" , transition:"width 40s"}} >
      <CardActionArea className='cad'>
        <CardMedia
          component="img"
          height="260"
          image={patient}
          alt="patient"
        />
        <CardContent className='sps' >
          <Typography  gutterBottom variant="h5" component="div">
            ADD PATIENT
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

export default AdminDashboard