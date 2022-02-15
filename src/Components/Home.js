import React from "react";
import '../css/HomeCss.css'
// import {Carousel} from 'react-bootstrap'
import quta from '../images/quta.jpeg'
import doc from '../images/doc.jpeg'
// import ref from '../images/ref.jfif'
// import refi from '../images/refi.png'
import re from '../images/re.jpeg'
import com from '../images/Untitled.jpeg'


export default function Home() {

    return (
        <div>
            <div className="home">
                <h1 className="headi">SWASTH</h1>
                
                <hr className="headhr"></hr>
                <div className="imgp">
                <img className="qut" src={quta} alt="img" ></img>
                <p className="tagl">A hospital is no place to be sick.</p>
                </div>
                <hr className="headhr"></hr>
                <h1>MAKING INDIA HEALTHY</h1>
                
                <div className="outf">
                    <div className="f1">
                    <h3 className="tit"><span>DIGITALISED PRESCRIPTION</span></h3>
                    <img className="f1" src={doc} alt="img"/>
                    </div>

                    <div className="f2
                    ">
                    <h3 className="tit">SEAMLESS E-REFERRAL SYSTEM</h3>
                    <img className="f1" src={re} alt="img"/>
                    </div>

                    <div className="f1">
                    <h3 className="tit">BUILDING DOCTORS VIRTUAL COMMUNITY</h3>
                    <img className="f1" src={com} alt="img"/>

                    </div>
                </div>
                
                    
                    

            </div>
        </div>
    )
}
