import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory, useRouteMatch, Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./upcomingevent.css";
import {
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Checkbox,
  Paper,
  tableCellClasses,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from "@mui/material";
import Createupcomingevent from "./createupcomingevent/Createupcomingevent";
import "./upcomingevent.css";
import { Edit } from "@mui/icons-material";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Link as LinkRoute } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#527ED4",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans'",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));
const Upcomingevent = (props) => {
  // const { path, url } = useRouteMatch();
  // const [eventdata, seteventdata] = useState([]);
  // const getLocalItem = () => {
  //   let data = JSON.parse(localStorage.getItem("data"));
  //   console.log(data[0]["id"]);

  //   console.log(url);
  //   if (data) {
  //     seteventdata(JSON.parse(localStorage.getItem("data")));
  //   }
  //   else {
  //     return [];
  //   }
  // }

  // useEffect(() => {
  //   try {
  //     getLocalItem();
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }, [])
  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [eventdata, seteventdata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("event"));
    if (data) {
      seteventdata(JSON.parse(localStorage.getItem("event")));
    } else {
      return [];
    }
  };

  useEffect(() => {
    try {
      getLocalItem();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear()].join("-");
  }
  const handleDelete = (e) => {
    console.log(e);
    const index = eventdata.indexOf(eventdata.find(a => a.id == e));
    console.log(index)
    eventdata[index].isDeleted = true
    // achievements.isDeleted = true;
    // let objs = achievementdata
    seteventdata(eventdata);
    console.log(eventdata)
    navigate.push("/admindashboard/upcomingevent")
    localStorage.setItem("event",JSON.stringify(eventdata))
  }
  console.log(eventdata);
  return (
    <div className="page-information-container">
      <div className="page-header">
        <label>Upcoming Event</label>
      </div>
      <div className='page-breadscrumb'>
            <br/>
              <Breadcrumbs aria-label="breadcrumb">
                <NavLink underline="hover" color="inherit" href="/admindashboard" exact to="/admindashboard">
                  Home
                </NavLink>
                <NavLink
                  underline="hover" color="inherit" href="/admindashboard/upcomingevent" exact to="/admindashboard/upcomingevent">
                  Upcoming Event
                </NavLink>
              </Breadcrumbs>
              <br/>
            </div>
      <div className="upcomingevent-container">
        <div className="upcomingevent-container-button">
          <Route exact path="/admindashboard/upcomingevent/createupcomingevent">
            <Createupcomingevent />
          </Route>
          <NavLink to="/admindashboard/upcomingevent/createupcomingevent">
            <Button variant="contained" color="success" size="small">
              Create Upcoming Event
            </Button>
          </NavLink>
          <Route exact path="/admindashboard/upcomingevent/createupcomingevent">
            <Createupcomingevent />
          </Route>
         
        </div>
        <div className="table-container">
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ maxHeight: 440 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Checkbox
                      size="small"
                      name="upcomingeventSelect"
                      sx={{ color:"white" }}></Checkbox>
                  </StyledTableCell>
                  <StyledTableCell>Event Title</StyledTableCell>
                  <StyledTableCell>Organizer Name</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Venue</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>RSVP</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              { eventdata.length > 0 &&
              <TableBody>
                {eventdata
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e) => {
                    if(e.isDeleted == false)
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={e.id}>
                        <StyledTableCell>
                          <Checkbox size="small" />
                        </StyledTableCell>
                        <StyledTableCell>{e.eventTitle}</StyledTableCell>
                        <StyledTableCell>
                          {e.eventOrganizerName}
                        </StyledTableCell>
                        <StyledTableCell>{e.eventDepartment}</StyledTableCell>
                        <StyledTableCell>{e.eventVenue}</StyledTableCell>
                        <StyledTableCell>{e.eventDescription}</StyledTableCell>
                        <StyledTableCell>
                          <img src={e.eventImage} height="50rem" width="50rem" style={{}} />
                        </StyledTableCell>
                        <StyledTableCell>{convert(e.eventStartDate)}</StyledTableCell>
                        <StyledTableCell>{convert(e.eventEndDate)}</StyledTableCell>
                        <StyledTableCell>{e.eventRSVP}</StyledTableCell>
                        <StyledTableCell>
                          <LinkRoute
                            to={{
                              pathname:
                                "/admindashboard/upcomingevent/updateupcomingevent/:id",
                              state: { idParam: e.id },
                            }}>
                            <ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} />
                          </LinkRoute>

                          <Button size='small' id={e.id} key={e.id} onClick={(event) => handleDelete(e.id)} sx={{ verticalAlign: "bottom", minWidth: "auto" }}><Delete sx={{ color: "red" }} /></Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>}
            </Table>
          </TableContainer>
        </div>
        <div>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={eventdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* <table>
            <thead>
              <tr>
                <th><Checkbox size="small" /></th>
                <th>Title</th>
                <th>Organizer</th>
                <th>Description</th>
                <th>Department</th>
                <th>Venue</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {eventdata.map((e) => {
                return (
                  <tr key={e.id}>
                    <td><Checkbox size="small" /></td>
                    <td>{e.title}</td>
                    <td>{e.eventorganizer}</td>
                    <td>{e.description}</td>
                    <td>{e.department}</td>
                    <td>{e.venue}</td>
                    <td><Edit /></td>
                    <td><Delete /></td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default Upcomingevent;
