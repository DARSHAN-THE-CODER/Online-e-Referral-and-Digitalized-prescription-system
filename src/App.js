import './App.css';
import NavBar from './Components/Navbar';
import { BrowserRouter as Router,Switch , Route } from 'react-router-dom';
// import Home from './Components/Home'
import AdminSignup from './Components/AdminSignup';
import AdminLogin from './Components/AdminLogin';
import Navbar from './Components/Navbar';
import DoctorLogin from './Components/DoctorLogin.js'
import AddDoc from './Components/AddDoc'
import AddPatient from './Components/AddPatient';
import AdminDashboard from './Components/AdminDashboard';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
              <NavBar />
          </Route>
          <Route exact path="/Admin_up">
              <Navbar />
              <AdminSignup />
          </Route>
          <Route exact path="/Doc_in">
              <NavBar />
              <DoctorLogin />
          </Route>
          <Route exact path="/Admin_in">
              <NavBar />
              <AdminLogin />
          </Route>
          <Route exact path="/AddDoc">
              <NavBar />
              <AddDoc />
          </Route>
          <Route exact path="/AddPat">
              <NavBar />
              <AddPatient />
          </Route>
          <Route exact path="/AdminDashboard">
              <NavBar />
              <AdminDashboard />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
