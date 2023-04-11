import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { Route,BrowserRouter,Switch,Router} from 'react-router-dom';
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
import  Policies  from './pages/policies/Policies';
import  CreatePolicies  from './pages/policies/createpolicies/CreatePolicies';
import { UpdatePolicies } from './pages/policies/updatepolicies/UpdatePolicies';
import CreateCeomessage from './pages/ceomessage/createceomessage/CreateCeomessage';
import UpdateCeomessage from './pages/ceomessage/updateceomessage/UpdateCeomessage';
import {Thoughtoftheday} from './pages/thoughtoftheday/Thoughtoftheday';
import {Createthought} from './pages/thoughtoftheday/createthought/Createthought';
import {Updatethought} from './pages/thoughtoftheday/updatethought/Updatethought';

function App() {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="main-container">
      <Sidebar/>
      <div className='container'>
        <Topbar/>
        <div className='page-container'>
          
              <Switch>
                <Route exact path="/"><Dashboard/></Route>
                <Route exact path="/ceomessage"><Ceomessage/></Route>
                <Route index path="/ceomessage/createceomessage"><CreateCeomessage/></Route>
                <Route index path="/ceomessage/updateceomessage/:id"><UpdateCeomessage/></Route>
                <Route exact path="/opinionpoll"><Opinionpoll/></Route>
                <Route exact path="/upcomingevent"><Upcomingevent/></Route>
                <Route index path="/upcomingevent/createupcomingevent"><Createupcomingevent/></Route>
                <Route exact path="/opinionpoll/createopinionpoll"><Createopinionpoll/></Route>
                <Route exact path="/achievement"><Achievement/></Route>
                <Route index path="/achievement/createachievement"><CreateAchievement/></Route>
                <Route index path="/achievement/updateachievement/:id"><UpdateAchievement/></Route>
                <Route index path="/upcomingevent/updateupcomingevent/:id"><Updateupcomingevent/></Route>
                <Route index path="/opinionpoll/updateopinionpoll/:id"><Updateopinionpoll/></Route>
                <Route exact path="/thoughtoftheday"><Thoughtoftheday/></Route>
                <Route index path="/thoughtoftheday/createthought"><Createthought/></Route>
                <Route index path="/thoughtoftheday/updatethought/:id"><Updatethought/></Route>
                <Route exact path="/policies"><Policies/></Route>
                <Route index path="/policies/createpolicies"><CreatePolicies/></Route>
                <Route index path="/policies/updatepolicies/:id"><UpdatePolicies/></Route>
              </Switch>
            
          </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
