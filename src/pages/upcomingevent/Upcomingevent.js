import React from "react";
import { useState,useEffect } from "react";
import {
  Link,NavLink,
  useRouteMatch,Route
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Createupcomingevent from "../createupcomingevent/Createupcomingevent";

 const Upcomingevent = (props) => {
//    let { path, url } = useRouteMatch();
//    useEffect(() => {
//     let data = localStorage.getItem("data");
//     if (data) {
//       setEvent(JSON.parse(data));
//     }
//   }, []);
const [eventdata,seteventdata]=useState([]);
    const getLocalItem = () =>{
    let data=JSON.parse(localStorage.getItem("data"));
    console.log(data);
    if(data){
      seteventdata(JSON.parse(localStorage.getItem("data")));
    }
    else {
      return [];
    }
  }
    
    useEffect(() => {
    //   let data = localStorage.getItem("data");
    //  if (data) {
    //   seteventdata(JSON.parse(localStorage.getItem("data")));
    //   console.log(eventdata);
     //}
     getLocalItem();
      }, [])
      const DivStyle={
        overflowX: 'auto',
      }
  return (
    
    <div className="upcomingevent-container">
      <Typography variant="h5" gutterBottom>
        Upcoming Event
      </Typography>
      <Route exact path="/upcomingevent/createupcomingevent"><Createupcomingevent/></Route>
      <NavLink to="/upcomingevent/createupcomingevent"> 
        <Button variant="contained" color="success">
          Create Upcoming Event
        </Button>
      </NavLink>
      <div className="table">
      <table>
      <div style={DivStyle}>
        <tr>
          <th>Event Title</th>
          <th>Organizer</th>
          <th>Venue</th>
          <th>Department</th>
          <th>Start Date</th>
          <th>End Date</th>   
        </tr>
        {eventdata.map((e)=>{
       return (
      <tr key={e.id}>
       <td>{e.title}</td>
       <td>{e.organizer}</td>
       <td>{e.venue}</td>
       <td>{e.department}</td>
       <td>{e.startdate}</td>
       <td>{e.enddate}</td>

       </tr>
     );})}
        {/* {eventdata.map((e) => {
              
                return (
                
                     (
                      <TodoCard
                        key={e.id}
                        title={e.title}
                        id={e.id}
                        description={e.description}
                        complete={completeHandler}
                        updateColor={UpdateColor}
                        isCompleted={e.isCompleted}
                        color={e.color}
                        delete={deleteHandler}
                      />
                    )
                )} */}
        {/* {eventdata.map((id,e)=>

          <td>{eventdata[e].title}</td>
          <td>{eventdata[e].department}</td>)} */}
          {/* <td>{eventdata[0].title}</td>
          <td>{eventdata[0].department}</td> */}
      </div>   
      </table>
    </div>
    </div>
    
  );
};

export default Upcomingevent;
