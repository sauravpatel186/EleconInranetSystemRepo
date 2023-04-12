import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory, useRouteMatch, Route } from "react-router-dom";
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
import Createmanagementdesk from "./createmanagementdesk/Createmanagementdesk";
import "./Managementdesk.css";
import { Edit } from "@mui/icons-material";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Link as LinkRoute } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
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

const Managementdesk = (props) => {
    
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
  console.log(eventdata);
  return (
    <div className="page-information-container">
        <div className="page-header">
            <label>Management Desk</label>
        </div>
      <div className='page-breadscrumb'>
            <br/>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" exact to="/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/managementdesk" exact to="/managementdesk">
                  Management Desk
                </Link>
              </Breadcrumbs>
            <br/>
            </div>
        <div className="md-container">
            <div className="md-container-button">
                <Route exact path="/managementdesk/createmanagementdesk">
                    <Createmanagementdesk />
                </Route>
                <NavLink to="/managementdesk/createmanagementdesk">
                    <Button variant="contained" color="success" size="small">
                    Create Management Desk
                    </Button>
                </NavLink>
                <Route exact path="/managementdesk/createmanagementdesk">
                    <Createmanagementdesk />
                </Route>
                <NavLink to="/managementdesk/createmanagementdesk">
                    <Button variant="contained" color="error" size="small">
                    Disable Selected
                    </Button>
                </NavLink>
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
                      name="achievementSelect"
                      sx={{ color: "black" }}></Checkbox>
                  </StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventdata
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e) => {
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
                        <StyledTableCell>{e.eventDescription}</StyledTableCell>
                        <StyledTableCell>{convert(e.eventStartDate)}</StyledTableCell>
                        <StyledTableCell>{convert(e.eventEndDate)}</StyledTableCell>
                        <StyledTableCell>
                          <LinkRoute
                            to={{
                              pathname:
                                "/managementdesk/createmanagementdesk:id",
                              state: { idParam: e.id },
                            }}>
                            <ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} />
                          </LinkRoute>

                          <Delete sx={{ color: "red" }} />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
          </div>
        </div>
     
    </div>
</div>
  );

};
export default Managementdesk;