// import React, { useState, useEffect, createContext } from 'react';
// import { Redirect } from 'react-router-dom';
// import { isAuthenticated } from '../service/authservice';
// import { Login } from '../pages/login/Login';
// import { IntranetDashboard } from '../pages/intranetdashboard/IntranetDashboard';
// import { NavLink,Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
// 	const history = useHistory();
// 	const [currentUser, setCurrentUser] = useState("");
// 	const [isIntranetDashboardOpen, setisIntranetDashboardOpen] = useState(false);
// 	useEffect(() => {
// 		const checkLoggedIn = async () => {
// 			let cuser = isAuthenticated();
// 			if (cuser === null) {
// 				localStorage.setItem('user', '');
// 				cuser = '';
// 			}

// 			setCurrentUser(cuser);
// 		};

// 		checkLoggedIn();
// 	}, []);
// 	useEffect(()=>{
// 		let adminDashboardChecker = localStorage.getItem("isAdminDashboard")
// 		if (adminDashboardChecker === "true") {
// 		  setisIntranetDashboardOpen(true)
// 		}
// 	})
// 	const AdminHandler = () => {
// 		setisIntranetDashboardOpen(true)
// 		localStorage.setItem("isAdminDashboard", "true")
// 	}


// 	const AdminCloseHandler = () => {
// 		setisIntranetDashboardOpen(false)
// 		localStorage.setItem("isAdminDashboard", "false")
// 	}
// 	console.log('usercontext', currentUser);

// 	return (
// 		<UserContext.Provider value={[currentUser, setCurrentUser]}>

// 			{currentUser.length ===0 && currentUser!= null ? <Route path="/"><IntranetDashboard open={AdminHandler}/></Route> : <Redirect to="/login"><Login/></Redirect>}
// 		</UserContext.Provider>
// 	);
// };


// export default UserContext;