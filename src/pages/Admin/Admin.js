import React from 'react'
import "./Admin.css"

import { useEffect } from 'react';
import { Topbar } from '../../components/topbar/Topbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Route,BrowserRouter,Switch,Router} from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';
import { Ceomessage } from '../ceomessage/Ceomessage';
import Upcomingevent from "../upcomingevent/Upcomingevent";
import Createupcomingevent from '../upcomingevent/createupcomingevent/Createupcomingevent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Achievement } from '../achievement/Achievement';
import { CreateAchievement } from '../achievement/createachievement/CreateAchievement';
import Createopinionpoll from '../opinionpoll/createopinionpoll/Createopinionpoll';
import Opinionpoll from '../opinionpoll/Opinionpoll';
import { UpdateAchievement } from '../achievement/updateachievement/UpdateAchievement';
import { Updateupcomingevent } from '../upcomingevent/updateupcomingevent/Updateupcomingevent';
import { Updateopinionpoll } from '../opinionpoll/updateopinionpoll/Updateopinionpoll';
import { IntranetDashboard } from '../intranetdashboard/IntranetDashboard';
export const Admin = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="main-container">
                <Sidebar />
                <div className='container'>
                    <Topbar />
                    <div className='page-container'>

                        <Switch>
                            <Router exact path="/intranet"><IntranetDashboard /></Router>
                            <Route exact path="/dashboard"><Dashboard /></Route>
                            <Route exact path="/ceomessage"><Ceomessage /></Route>
                            <Route exact path="/opinionpoll"><Opinionpoll /></Route>
                            <Route exact path="/upcomingevent"><Upcomingevent /></Route>
                            <Route index path="/upcomingevent/createupcomingevent"><Createupcomingevent /></Route>
                            <Route exact path="/opinionpoll/createopinionpoll"><Createopinionpoll /></Route>
                            <Route index path="/intranet/admin/achievement"><Achievement /></Route>
                            <Route index path="/intranet/admin/achievement/createachievement"><CreateAchievement /></Route>
                            <Route index path="/achievement/updateachievement/:id"><UpdateAchievement /></Route>
                            <Route index path="/upcomingevent/updateupcomingevent/:id"><Updateupcomingevent /></Route>
                            <Route index path="/opinionpoll/updateopinionpoll/:id"><Updateopinionpoll /></Route>
                        </Switch>

                    </div>
                </div>
            </div>
        </LocalizationProvider>
    )
}
