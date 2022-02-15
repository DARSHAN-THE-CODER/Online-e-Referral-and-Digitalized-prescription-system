import React from "react";
import {Card,Button} from 'react-bootstrap'
import "../css/Contact.css"
import {GiStethoscope} from 'react-icons/gi';

function Contact() {
    return (
        <div className="abts">
            <h1 className="hel">Healthy India <GiStethoscope/></h1>
            <div className="row">

            <div className="col" style={{marginLeft:"40px"}}>
            
            <Card style={{ width: '19rem' }}>
                <Card.Img height="330px" variant="top" src="https://i.ibb.co/tP7G0Mn/IMG-20210801-224654-753.webp" />
                <Card.Body>
                    <Card.Title>DARSHAN V</Card.Title>
                    <Card.Text>
                       GITHUB <a href="https://github.com/DARSHAN-THE-CODER">DARSHAN-THE-CODER</a> <br></br>
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            
            <div className="col" style={{marginLeft:"none"}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img height="330px" variant="top" src="https://i.ibb.co/VCP8CYq/phaneesh.jpg" />
                <Card.Body>
                    <Card.Title>S PHANEESH</Card.Title>
                    <Card.Text>
                       GITHUB <a href="https://github.com/phaneesh707">I AM IRON MAN ...</a>
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>

            <div className="col" style={{marginRight:"none"}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img height="300px" variant="top" src="https://i.ibb.co/hXSBJ2k/veeresh.jpg" />
                <Card.Body>
                    <Card.Title>VEERESH R</Card.Title>
                    <Card.Text>
                       GITHUB <a href="https://github.com/Veeresh-R-G"> VEERESH R G</a>
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            </div>
        </div>
    )
}

export default Contact;