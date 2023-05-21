import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory, useRouteMatch, Route,Redirect } from "react-router-dom";
import { styled } from "@mui/material/styles";
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
import CreateAnnouncement from "./createannouncement/CreateAnnouncement";
import "./Announcement.css";
import { Announcement, Edit } from "@mui/icons-material";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Announcements = () => {
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
  const [announcementdata, setannouncementdata] = useState([]);
  const [counts, setcounts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = async() => {
    let data = await JSON.parse(localStorage.getItem("announcement"));
    
    if (data) {
      let adata=data.filter(announcement=>announcement.isDeleted==false)
      setannouncementdata( adata);
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
    const index = announcementdata.indexOf(announcementdata.find((a => a.id == e )));
    console.log(index)
    announcementdata[index].isDeleted = true
    setannouncementdata(announcementdata);
    console.log(announcementdata)
    navigate.push("/admindashboard/announcement")
    localStorage.setItem("announcement",JSON.stringify(announcementdata))
  }
  console.log(announcementdata);
  // const countitems =announcementdata.filter(e => e.isDeleted ==='false').length;
  // console.log("Not deleted: " + countitems);
  return (
    <div className="page-information-container">
      <div className="page-header">
        <label>Announcement</label>
      </div>
      <div className='page-breadscrumb'>
            <br/>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/admindashboard" exact to="/admindashboard/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/admindashboard/announcement" exact to="/admindashboard/announcement">
                  Announcement
                </Link>
              </Breadcrumbs>
              <br/>
            </div>
      <div className="upcomingevent-container">
        <div className="upcomingevent-container-button">
          <Route exact path="/admindashboard/announcement/createannouncement">
            <CreateAnnouncement />
          </Route>
          <NavLink to="/admindashboard/announcement/createannouncement">
            <Button variant="contained" color="success" size="small">
              Create Announcement
            </Button>
          </NavLink>
          <Route exact path="/admindashboard/announcement/createannouncement">
            <CreateAnnouncement />
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
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              { announcementdata.length > 0 &&
              <TableBody>
                {announcementdata
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e) => {if(e.isDeleted == false)
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={e.id}>
                        <StyledTableCell>
                          <Checkbox size="small" />
                        </StyledTableCell>
                        <StyledTableCell>{e.announcementTitle}</StyledTableCell>
                        <StyledTableCell>{e.announcementDepartment}</StyledTableCell>
                        <StyledTableCell>{e.announcementDescription}</StyledTableCell>
                        <StyledTableCell>{convert(e.announcementStartDate)}</StyledTableCell>
                        <StyledTableCell>{convert(e.announcementEndDate)}</StyledTableCell>
                        <StyledTableCell>
                          <LinkRoute
                            to={{
                              pathname:
                                "/admindashboard/announcement/updateannouncement/:id",
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
            count={announcementdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Announcements;
