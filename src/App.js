import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { Route,BrowserRouter,Switch,Router} from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Ceomessage } from './pages/ceomessage/Ceomessage';
import Upcomingevent from "./pages/upcomingevent/Upcomingevent";
import Createupcomingevent from './pages/createupcomingevent/Createupcomingevent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Achievement } from './pages/achievement/Achievement';
import { CreateAchievement } from './pages/achievement/createachievement/CreateAchievement';
import Createopinionpoll from './pages/createopinionpoll/Createopinionpoll';
import Opinionpoll from './pages/opinionpoll/Opinionpoll';
import { UpdateAchievement } from './pages/achievement/updateachievement/UpdateAchievement';

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
                <Route exact path="/opinionpoll"><Opinionpoll/></Route>
                <Route exact path="/upcomingevent"><Upcomingevent/></Route>
                <Route index path="/upcomingevent/createupcomingevent"><Createupcomingevent/></Route>
                <Route exact path="/opinionpoll/createopinionpoll"><Createopinionpoll/></Route>
                <Route exact path="/achievement"><Achievement/></Route>
                <Route index path="/achievement/createachievement"><CreateAchievement
                /></Route>
                <Route index path="/achievement/updateachievement/:id"><UpdateAchievement/></Route>
              </Switch>
            
          </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
