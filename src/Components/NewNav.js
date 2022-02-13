import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavCss.css"
import { useHistory } from "react-router-dom";
import inf from '../images/infi.png';
function NewNav() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const history=useHistory()
  
  function handleLogout(){
    setClick(!click);
    localStorage.removeItem("adminInfo")
    localStorage.removeItem("doctInfo")
    history.push("/")
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src={inf} alt="infi" style={{height:"60px"}}></img>
          </NavLink>
      
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                BACK
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleLogout}
              >
                LOGOUT
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick} style={{margin:"none"}}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NewNav;
