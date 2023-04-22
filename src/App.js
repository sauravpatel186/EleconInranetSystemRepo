// import logo from './logo.svg';
import "./App.css";
import React, { useContext } from "react";
import { useEffect } from "react";
import { Topbar } from "./components/topbar/Topbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import {
  Route,
  BrowserRouter,
  Switch,
  Router,
  useHistory,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Ceomessage } from "./pages/ceomessage/Ceomessage";
import Upcomingevent from "./pages/upcomingevent/Upcomingevent";
import Createupcomingevent from "./pages/upcomingevent/createupcomingevent/Createupcomingevent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Achievement } from './pages/achievement/Achievement';
import { CreateAchievement } from './pages/achievement/createachievement/CreateAchievement';
import Createopinionpoll from './pages/opinionpoll/createopinionpoll/Createopinionpoll';
import Opinionpoll from './pages/opinionpoll/Opinionpoll';
import { UpdateAchievement } from './pages/achievement/updateachievement/UpdateAchievement';
import { Updateupcomingevent } from './pages/upcomingevent/updateupcomingevent/Updateupcomingevent';
import { Updateopinionpoll } from './pages/opinionpoll/updateopinionpoll/Updateopinionpoll';
import { IntranetDashboard } from './pages/intranetdashboard/IntranetDashboard';

import { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Thoughtoftheday from './pages/thoughtoftheday/Thoughtoftheday';
import CreateAnnouncement from './pages/announcement/createannouncement/CreateAnnouncement'
import Announcements from './pages/announcement/Announcements'
import { Updateannouncement } from './pages/announcement/updateannouncement/Updateannouncement';
import Managementdesk from "./pages/managementdesk/Managementdesk";
import Createmanagementdesk from "./pages/managementdesk/createmanagementdesk/Createmanagementdesk";
import Updatemanagementdesk from "./pages/managementdesk/updatemanagementdesk/Updatemanagementdesk";
import CreateCeomessage from "./pages/ceomessage/createceomessage/CreateCeomessage";
import UpdateCeomessage from "./pages/ceomessage/updateceomessage/UpdateCeomessage";
import Createthought from "./pages/thoughtoftheday/createthought/Createthought";
import Updatethought from "./pages/thoughtoftheday/updatethought/Updatethought";
import Policies from "./pages/policies/Policies";
import CreatePolicies from "./pages/policies/createpolicies/CreatePolicies";
import UpdatePolicies from "./pages/policies/updatepolicies/UpdatePolicies";
import Canteenmenu from "./pages/canteenmenu/Canteenmenu";
import Createcanteenmenu from "./pages/canteenmenu/createcanteenmenu/Createcanteenmenu";
import Updatecanteenmenu from "./pages/canteenmenu/updatecanteenmenu/Updatecanteenmenu";
import Salespurchase from "./pages/salespurchase/Salespurchase";
import Createsalespurchase from "./pages/salespurchase/createsalespurchase/Createsalespurchase";
import Noticeboard from "./pages/noticeboard/Noticeboard";
import Createnotice from "./pages/noticeboard/createnotice/Createnotice";
import Updatenotice from "./pages/noticeboard/updatenotice/Updatenotice";
import Newjoinee from "./pages/newjoinee/Newjoinee";
import Createnewjoinee from "./pages/newjoinee/createnewjoinee/Createnewjoinee";
import updatenewjoinee, {
  Updatenewjoinee,
} from "./pages/newjoinee/updatenewjoinee/Updatenewjoinee";
import { Audio } from "react-loader-spinner";
import { EmployeeMaster } from "./pages/employeemaster/EmployeeMaster";
import { Login } from "./pages/login/Login";
import { Employeetopbar } from "./components/employeetopbar/Employeetopbar";
import { Employeesidebar } from "./components/employeesidebar/Employeesidebar";
import Employeesalespurchase from "./pages/employeesalespurchase/Employeesalespurchase";
import { Updatesalespurchase } from "./pages/salespurchase/updatesalespurchase/Updatesalespurchase";
import UserContext from './context/UserContext';
import { UserProvider } from './context/UserContext';
import EmployeeDirectory from "./pages/employeedirectory/EmployeeDirectory";

function App() {
  const USER_TYPES = {
    PUBILIC: "Public User",
    NORMAL_USER: "Normal User",
    ADMIN_USER: "Admin User"
  }
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isIntranetDashboardOpen, setisIntranetDashboardOpen] = useState(false);
  const history = useHistory();
  // console.log(history.goBack(-1));
  const [user, setUser] = useState([]);
  const [role,setRole] = useState("");
  const [loading, setLoding] = useState(false);
  const getUserData = async () => {
    let roledata = await JSON.parse(localStorage.getItem("role"));
    console.log(roledata);
    if (roledata != null || roledata != undefined) {
      setRole(roledata)
      console.log(roledata);
    }
    else {
      setRole("");
    }
    return true;
  }
  useEffect(() => {
    setLoding(true);
    let adminDashboardChecker = localStorage.getItem("isAdminDashboard")
    if (adminDashboardChecker === "true") {
      setisIntranetDashboardOpen(true);
    }
    let isLogin = localStorage.getItem("isLogin")
    console.log(isLogin)
    if (isLogin != null) {
      setisLoggedIn(JSON.parse(isLogin));
    } else {
      setisLoggedIn(false);
    }

    if (getUserData()) {
      setLoding(false);
    }
  }, []);

  const AdminHandler = () => {
    setisIntranetDashboardOpen(true);
    localStorage.setItem("isAdminDashboard", "true");
  };

  const AdminCloseHandler = () => {
    setisIntranetDashboardOpen(false);
    history.push("/")
    localStorage.setItem("isAdminDashboard", "false");
  };

  // const [currentUser,setcurrentUser] = useContext(UserContext);
  // console.log(currentUser);
  return (
    <>
      {loading && <div>
        <Audio height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass></Audio>
      </div>}
      {!loading && <div>
        {!isIntranetDashboardOpen &&
          <Switch>
            {/* { currentUser == null && <Route exact path="/login"><Login /></Route>} */}
            {!isLoggedIn ? <Route path="/"><Login setisLoggedIn={setisLoggedIn} /></Route> : <Route exact path="/"><IntranetDashboard setisLoggedIn={setisLoggedIn} open={AdminHandler} /></Route>}
            <Redirect to="/"></Redirect>
          </Switch>
        }

        {isIntranetDashboardOpen && role === 'Admin' &&
          <div className="main-container">
            <Sidebar />
            <div className='container'>
              <Topbar close={AdminCloseHandler} setisLoggedIn={setisLoggedIn} />
              <div className='page-container'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Switch>
                    <Route exact path="/admindashboard"><Dashboard /></Route>
                    <Route exact path="/admindashboard/ceomessage"><Ceomessage /></Route>
                    <Route exact path="/admindashboard/opinionpoll"><Opinionpoll /></Route>
                    <Route exact path="/admindashboard/upcomingevent"><Upcomingevent /></Route>
                    <Route index path="/admindashboard/upcomingevent/createupcomingevent"><Createupcomingevent /></Route>
                    <Route exact path="/admindashboard/opinionpoll/createopinionpoll"><Createopinionpoll /></Route>
                    <Route exact path="/admindashboard/achievement"><Achievement /></Route>
                    <Route index path="/admindashboard/achievement/createachievement"><CreateAchievement /></Route>
                    <Route index path="/admindashboard/achievement/updateachievement/:id"><UpdateAchievement /></Route>
                    <Route index path="/admindashboard/upcomingevent/updateupcomingevent/:id"><Updateupcomingevent /></Route>
                    <Route index path="/admindashboard/opinionpoll/updateopinionpoll/:id"><Updateopinionpoll /></Route>
                    <Route exact path="/admindashboard/thoughtoftheday"><Thoughtoftheday /></Route>
                    <Route index path="/admindashboard/thoughtoftheday/createthought"><Createthought /></Route>
                    <Route index path="/admindashboard/thoughtoftheday/updatethought/:id"><Updatethought /></Route>
                    <Route exact path="/admindashboard/policies"><Policies /></Route>
                    <Route index path="/admindashboard/policies/createpolicies"><CreatePolicies /></Route>
                    <Route index path="/admindashboard/policies/updatepolicies/:id"><UpdatePolicies /></Route>
                    <Route exact path="/admindashboard/managementdesk"><Managementdesk /></Route>
                    <Route index path="/admindashboard/managementdesk/createmanagementdesk"><Createmanagementdesk /></Route>
                    <Route index path="/admindashboard/managementdesk/updatemanagementdesk/:id"><Updatemanagementdesk /></Route>
                    <Route exact path="/admindashboard/canteenmenu"><Canteenmenu /></Route>                
                    <Route exact path="/admindashboard/canteenmenu/createcanteenmenu"><Createcanteenmenu /></Route>
                    <Route exact path="/admindashboard/announcement"><Announcements /></Route>
                    <Route exact path="/admindashboard/announcement/createannouncement"><CreateAnnouncement /></Route>
                    <Route exact path="/admindashboard/announcement/updateannouncement/:id"><Updateannouncement /></Route>
                    <Route exact path="/admindashboard/noticeboard"><Noticeboard /></Route>
                    <Route index path="/admindashboard/noticeboard/createnotice"><Createnotice /></Route>
                    <Route index path="/admindashboard/noticeboard/updatenotice/:id"><Updatenotice /></Route>
                    <Route exact path="/admindashboard/newjoinee"><Newjoinee /></Route>
                    <Route exact path="/admindashboard/newjoinee/createnewjoinee"><Createnewjoinee /></Route>
                    <Route exact path="/admindashboard/newjoinee/updatenewjoinee/:id"><Updatenewjoinee /></Route>
                    <Route exact path="/admindashboard/employeedirectory"><EmployeeDirectory /></Route>
                  </Switch>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        }
        {isIntranetDashboardOpen && role === 'Normal' &&
          <div className="main-container">
            <Employeesidebar />
            {console.log("Employee Sales")}
            <div className="container">
              <Employeetopbar close={AdminCloseHandler} setisLoggedIn={setisLoggedIn} />
              <div className="page-container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Switch>
                    <Route exact path="/employeedashboard/employeesalespurchase"><Employeesalespurchase /></Route>
                    {/* <Route exact path="/employeedashboard/createemployeesalespurchase"></></Route> */}
                  {/* <Route exact path="/employeedashboard/employeesalespurchase/updateemployeesalespurchase/:id"><Updatesalespurchase /></Route> */}
                  <Route exact path="/employeedashboard/employeedirectory"><EmployeeDirectory/></Route>
                  </Switch>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        }


      </div>}
    </>

  );
}
export default App;


//main


//Saurav

// Saurav demo 2