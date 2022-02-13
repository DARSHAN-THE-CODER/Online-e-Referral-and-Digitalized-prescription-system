import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
// import PatientShow from './PatientShow'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import pat from '../images/pat2.png'
import referr from '../images/refer.png'
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


  return (
    <div className='mainWrap'>

    <div className="row">

    <div className="col">
        <Card  sx={{ maxWidth: 345 }} onClick={addDesc}style={{borderRadius:"30px" , transition:"width 40s"}} >
        <CardActionArea className='cad'>
        <CardMedia
          component="img"
          height="260"
          image={pat}
          alt="doctor"
        />
        <CardContent className='sps' >
          <Typography  gutterBottom variant="h5" component="div">
            ADD DESCRIPTION 
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
          height="260"
          image={referr}
          alt="patient"
        />
        <CardContent className='sps' >
          <Typography  gutterBottom variant="h5" component="div">
            REFERRALS
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