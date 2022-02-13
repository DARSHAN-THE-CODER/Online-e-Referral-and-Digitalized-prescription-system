import React from "react";
import {Card,Button} from 'react-bootstrap'
import "../css/Contact.css"

function Contact() {
    return (
        <div className="abts">
            <h1 className="hel">Healthy India</h1>
            <div className="tablecard">
            <div className="card">
            
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>DARSHAN V</Card.Title>
                    <Card.Text>
                        DARSHAN-THE-CODER 
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            
            <div className="card">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>S PHANEESH</Card.Title>
                    <Card.Text>
                        I AM IRON MAN ...
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
            </div>
        </div>
    )
}

export default Contact;