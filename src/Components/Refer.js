import React ,{useState,useRef} from "react";
import axios from 'axios'
import  { Component } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import {Alert} from 'react-bootstrap'


function PatientShow() {

  const [text,setText]=useState("");
  const [error,setError]=useState("")
  const [mes,setMes]=useState("")
  const jj=useRef()
  
  const atValues = [
    { id: 1, value: "Fredrik Sundqvist" },
    { id: 2, value: "Patrik Sjölin" }
  ];
  
  const toolbarOptions = ["bold"];
  const arearef=useRef()
  var modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function(searchTerm, renderItem, mentionChar) {
        let values;
        if (mentionChar === "@" || mentionChar === "#") {
          values = atValues;
        }
        if (searchTerm.length === 0) {
          renderItem(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderItem(matches, searchTerm);
        }
      }
    }
  };

  var formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "mention"
  ];
  const handleProcedureContentChange = (content, delta, source, editor,e) => {
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
    console.log((content))
    arearef.current.focus();
  };

  const handleChange =()=>{
    console.log('in handle change ')
    console.log(document.querySelector(".ql-editor").innerHTML)
    const pres={pcode:patList[0], prescription:document.querySelector(".ql-editor").innerHTML}
    console.log(pres);

        axios({
            method:"POST",
            url:"http://localhost:3030/AddPrescription",
            data:pres
        })
        .then((res)=>{
            if(res.data.error1){
                console.log("UNABLE TO ADD PRESCRIPTION")
            }
            if(res.data.user){
                console.log(res.data.user)
                console.log("PRESCRIPTION ADDED")
            }
        })

  }
  // ---------------------------------------------------editor end -------------------------.

    const mys={
    fontFamily:'sans-serif',
    textAlign:'center'
    }

    var new1=JSON.parse(localStorage.getItem("doctInfo"))
    var patList = new1.referrals;
    
    function createName(str,index){
      var namie = str.slice(0,str.length-6)
      return(
        <button className="lxj" key={index} value={str}>{namie}</button>
      )

    }
    var dat;
    var patid = patList[0];
    console.log(patid)

    const [ppid,setppid] = useState(patid)

    function handleBClick(){
      patList.shift();
      // localStorage.setItem('patients', JSON.stringify(patList));
      localStorage.setItem("doctInfo",JSON.stringify({docname:new1.docname,hierarchy:new1.hierarchy,hospcode:new1.hospcode,hospname:new1.hospname,patients:patList,place:new1.place,qualification:new1.qualification,referrals:new1.referrals,username:new1.username,specialisation:new1.specialisation}))
      console.log("handle - "+patList);
      console.log("len"+patList.length)

      const se=Object({pcode:ppid,docusername:new1.username})
      axios({
        method:"post",
        url:"http://localhost:3030/RemRefPat",
        data:se
      })
      .then((res)=>{
        if(res.data.error1){
          setError("FAILED TO REMOVE PATIENT")

        }
        if(res.data.success){
          console.log("PATIENT REMOVED")
        }
    })

      window.location.reload();

    }

    

    function getPrevPres(){
        var pre = document.querySelector('.prevPres').innerHTML

        console.log(patList[0])
        const f=patList[0];
        axios({
            method:"get",
            url:`http://localhost:3030/FindPatient/${f}`,
        
        })
        .then((res)=>{
            if(res.data.error1){
                console.log("USER NOT EXIST")
            }
            if(res.data.user){
                console.log(res.data.user)
                        
                var obj =res.data.user.prescription;
                var list = obj.map((usei,index)=>{
                    return <p key={index}>{usei}</p>

                })
             
                console.log(res.data.user.prescription[0])
                for(let i=0;i<res.data.user.prescription.length;i++){
                  console.log()
                  document.querySelector('.prevPres').innerHTML+=res.data.user.prescription[i]
                }
                

            }
        })
    }


  return (
    <div style={mys}>
      <h1 className="hki">PATIENTS LIST</h1>
      {patList.map(createName)}
      <hr></hr>
      <h2 className="hki">PREVIOUS PRESPRIPTICTIONS </h2>
      <div>
        <p  className="prevPres"></p>
      </div>
      <hr></hr>
      <button className="fto1" onClick={getPrevPres} >SHOW PRESCRIPTION</button>
      <hr></hr>
      <br></br>
      <h2 className="hki">ADD DETAILED PRESPRIPTICTION </h2>
      <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        ref={arearef}
        value={text}
        onChange={handleProcedureContentChange}
      >
        <div className="my-editing-area" />
      </ReactQuill>
      </div>
      <div className="jox">
      <button className="fto1" onClick={handleChange}>SUBMIT</button>
      <button className="fto1" onClick={handleBClick}>NEXT PATIENT</button>
      </div>
      <br></br>
      <hr></hr>
      {mes && <Alert variant="success">{mes}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

export default PatientShow;
