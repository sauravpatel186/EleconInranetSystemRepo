// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { Route, BrowserRouter, Switch, Router } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Ceomessage } from './pages/ceomessage/Ceomessage';
import Upcomingevent from "./pages/upcomingevent/Upcomingevent";
import Createupcomingevent from './pages/upcomingevent/createupcomingevent/Createupcomingevent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Achievement } from './pages/achievement/Achievement';
import { CreateAchievement } from './pages/achievement/createachievement/CreateAchievement';
import Createopinionpoll from './pages/opinionpoll/createopinionpoll/Createopinionpoll';
import Opinionpoll from './pages/opinionpoll/Opinionpoll';
import { UpdateAchievement } from './pages/achievement/updateachievement/UpdateAchievement';
import { Updateupcomingevent } from './pages/upcomingevent/updateupcomingevent/Updateupcomingevent';
import { Updateopinionpoll } from './pages/opinionpoll/updateopinionpoll/Updateopinionpoll';
import { IntranetDashboard } from './pages/intranetdashboard/IntranetDashboard';
import { Admin } from './pages/Admin/Admin';
import { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Thoughtoftheday from './pages/thoughtoftheday/Thoughtoftheday';
import CreateAnnouncement from './pages/announcement/createannouncement/CreateAnnouncement'
import Announcements from './pages/announcement/Announcements'
import { Updateannouncement } from './pages/announcement/updateannouncement/Updateannouncement';

//import { Announcements} from './pages/announcement/Announcements';
//import { CreateAnnouncement } from './pages/announcement/createannouncement/CreateAnnouncement'
import CreateAnnouncement from './pages/announcement/createannouncement/CreateAnnouncement'
import Announcements from './pages/announcement/Announcements'
import { Updateannouncement } from './pages/announcement/updateannouncement/Updateannouncement';

import Managementdesk from "./pages/managementdesk/Managementdesk";
import Createmanagementdesk from './pages/managementdesk/createmanagementdesk/Createmanagementdesk';
import { Updatemanagementdesk } from './pages/managementdesk/updatemanagementdesk/Updatemanagementdesk';
import CreateCeomessage from './pages/ceomessage/createceomessage/CreateCeomessage';
import UpdateCeomessage from './pages/ceomessage/updateceomessage/UpdateCeomessage';

import Createthought from './pages/thoughtoftheday/createthought/Createthought';
import Updatethought from './pages/thoughtoftheday/updatethought/Updatethought';
import Policies from './pages/policies/Policies';
import CreatePolicies from './pages/policies/createpolicies/CreatePolicies';
import UpdatePolicies from './pages/policies/updatepolicies/UpdatePolicies';
function App() {
  const USER_TYPES = {
    PUBILIC: "Public User",
    NORMAL_USER: "Normal User",
    ADMIN_USER: "Admin User"
  }
  const [isIntranetDashboardOpen,setisIntranetDashboardOpen]=useState(false);

  useEffect(()=>{
    let adminDashboardChecker = localStorage.getItem("isAdminDashboard")
    if(adminDashboardChecker === "true"){
      setisIntranetDashboardOpen(true)
    }
  })

  const AdminHandler =()=>{
    setisIntranetDashboardOpen(true)
    localStorage.setItem("isAdminDashboard", "true")
  }


  const AdminCloseHandler =()=>{
    setisIntranetDashboardOpen(false)
    localStorage.setItem("isAdminDashboard", "false")
  }

  return (

    <>
      {!isIntranetDashboardOpen &&<Switch>
        <Route exact path="/"><IntranetDashboard open={AdminHandler}/></Route>
        <Redirect to="/"></Redirect>
      </Switch> }
       { isIntranetDashboardOpen && <div className="main-container">
        <Sidebar />
        <div className='container'>
          <Topbar close={AdminCloseHandler}/>
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
              <Route exact path="/admindashboard/thoughtoftheday"><Thoughtoftheday/></Route>
                <Route index path="/admindashboard/thoughtoftheday/createthought"><Createthought/></Route>
                <Route index path="/admindashboard/thoughtoftheday/updatethought/:id"><Updatethought/></Route>
                <Route exact path="/admindashboard/policies"><Policies/></Route>
                <Route index path="/admindashboard/policies/createpolicies"><CreatePolicies/></Route>
                <Route index path="/admindashboard/policies/updatepolicies/:id"><UpdatePolicies/></Route>
                <Route exact path="/admindashboard/managementdesk"><Managementdesk/></Route>
                <Route index path="/admindashboard/managementdesk/createmanagementdesk"><Createmanagementdesk/></Route>
                <Route index path="/admindashboard/managementdesk/updatemanagementdesk/:id"><Updatemanagementdesk/></Route>

                <Route exact path="/admindashboard/announcement"><Announcements/></Route>
                <Route exact path="/admindashboard/announcement/createannouncement"><CreateAnnouncement/></Route>
                <Route exact path="/admindashboard/announcement/updateannouncement/:id"><Updateannouncement/></Route>

              </Switch>
            
          </div>
        </div>
      </div> 
      }
    </>
  );
}
export default App;
