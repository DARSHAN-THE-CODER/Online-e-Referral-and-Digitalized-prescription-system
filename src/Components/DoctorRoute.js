import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function DoctorRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={props => {
        return ( localStorage.getItem("doctInfo")  ? <Redirect to="/Docdashboard" />  : <Component {...props} />)
      }}
    ></Route>
  )
}
