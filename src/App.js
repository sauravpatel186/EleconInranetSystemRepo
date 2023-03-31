import logo from './logo.svg';
import './App.css';
import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { Route,BrowserRouter,Switch,Router} from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Ceomessage } from './pages/ceomessage/Ceomessage';
import Upcomingevent from "./pages/upcomingevent/Upcomingevent";
import Createupcomingevent from './pages/createupcomingevent/Createupcomingevent';
function App() {
  
  return (
    <div className="main-container">
      <Sidebar/>
      <div className='container'>
        <Topbar/>
        <div className='page-container'>
          
              <Switch>
                <Route exact path="/"><Dashboard/></Route>
                <Route exact path="/ceomessage"><Ceomessage/></Route>
                <Route exact path="/upcomingevent"><Upcomingevent/></Route>
                <Route exact path="/createupcomingevent"><Createupcomingevent/></Route>
              </Switch>
            
          </div>
      </div>
    </div>

  );
}

export default App;
