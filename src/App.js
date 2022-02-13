import './App.css';
import NavBar from './Components/Navbar';
import { BrowserRouter as Router,Switch , Route } from 'react-router-dom';
import Home from './Components/Home'
import AdminSignup from './Components/AdminSignup';
import AdminLogin from './Components/AdminLogin';
import Navbar from './Components/Navbar';
import DoctorLogin from './Components/DoctorLogin.js'
import AddDoc from './Components/AddDoc'
import AddPatient from './Components/AddPatient';
import AdminDashboard from './Components/AdminDashboard';
import NewNav from './Components/NewNav'
import PrivateRoute from './Components/PrivateRoute';
import Docdashboard from './Components/docdashboard';
import PatientShow from './Components/PatientShow';
import DoctorRoute from './Components/DoctorRoute'
import Refer from './Components/Refer'
import About from './Components/Aboutus'
import Contact from './Components/Contact'
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
              <NavBar />
              <Home />
          </Route>

          <Route exact path="/Admin_up">
              <Navbar />
              <AdminSignup />
          </Route>
          <Route exact path="/Doc_in">
              <NavBar />
              {/* <DoctorLogin /> */}
              <DoctorRoute exact path="/Doc_in" component={DoctorLogin} />
          </Route>
          <Route exact path="/Admin_in">
              <NavBar />
              {/* <AdminLogin /> */}
              <PrivateRoute exact path="/Admin_in" component={AdminLogin} />
          </Route>
          <Route exact path="/Contact">
              <NavBar />
              <Contact />
          </Route>
          <Route exact path="/AddDoc">
              <NewNav/>
              <AddDoc />
          </Route>
          <Route exact path="/AddPat">
              <NewNav />
              <AddPatient />
          </Route>
          <Route exact path="/AdminDashboard">
              <NewNav />
              <AdminDashboard />
          </Route>

          <Route exact path="/Docdashboard">
              <NewNav />
              <Docdashboard />
          </Route>

          <Route exact path="/PatientShow">
              <NewNav />
              <PatientShow />
          </Route>
          <Route exact path="/About">
              <NavBar />
              <About />
          </Route>
          <Route exact path="/Refer">
              <NewNav />
              <Refer />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
