import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/NavCss.css"
import inf from '../images/infi.png';
function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);


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
                to="/Admin_up"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                SIGNUP
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink
                exact
                to="/Admin_in"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                LOGIN
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/Doc_in"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Dr.LOGIN
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                exact
                to="/About"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                ABOUT US
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                CONTACT US
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

export default NavBar;
