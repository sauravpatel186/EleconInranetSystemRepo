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
import Managementdesk from "./pages/managementdesk/Managementdesk";
import Createmanagementdesk from './pages/managementdesk/createmanagementdesk/Createmanagementdesk';
import { Updatemanagementdesk } from './pages/managementdesk/updatemanagementdesk/Updatemanagementdesk';

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
<<<<<<< HEAD
                <Route exact path="/managementdesk"><Managementdesk/></Route>
                <Route index path="/managementdesk/createmanagementdesk"><Createmanagementdesk/></Route>
                <Route index path="/managementdesk/updatemanagementdesk/:id"><Updatemanagementdesk/></Route>

=======
                <Route exact path="/thoughtoftheday"><Thoughtoftheday/></Route>
                <Route index path="/thoughtoftheday/createthought"><Createthought/></Route>
                <Route index path="/thoughtoftheday/updatethought/:id"><Updatethought/></Route>
                <Route exact path="/policies"><Policies/></Route>
                <Route index path="/policies/createpolicies"><CreatePolicies/></Route>
                <Route index path="/policies/updatepolicies/:id"><UpdatePolicies/></Route>
>>>>>>> be4fc9a1ee0c03b0b0223f5bb2a76f0b7e5d2cb9
              </Switch>
            
          </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
