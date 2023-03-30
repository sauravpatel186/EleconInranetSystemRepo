import logo from './logo.svg';
import './App.css';
import { Topbar } from './components/topbar/Topbar';
import { Sidebar } from './components/sidebar/Sidebar';
import { Route,BrowserRouter,Switch,Router} from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Ceomessage } from './pages/ceomessage/Ceomessage';

function App() {
  return (
    <BrowserRouter>
    <div className="main-container">
      <Sidebar/>
      <div className='container'>
        <Topbar/>
        <Switch>
          <Route path="/" element={<Dashboard/>} />
          <Route path="ceomessage" element={<Ceomessage/>} />
          
        </Switch>
      </div>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
