import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory, useRouteMatch, Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "./opinionpoll.css";
import Createopinionpoll from "./createopinionpoll/Createopinionpoll";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Opinionpoll = () => {

  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [opiniondata, setopiniondata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("opinionpoll"));
    if (data) {
      setopiniondata(JSON.parse(localStorage.getItem("opinionpoll")));
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
  console.log(opiniondata);
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear()].join("-");
  }

  return (
    <div>
      <div className="page-information-container">
        <div className="page-header">
          <label>Opinionpoll</label>
        </div>
        <div className='page-breadscrumb'>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" exact to="/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/opinionpoll" exact to="/opinionpoll">
                  Opinion Poll
                </Link>
              </Breadcrumbs>
            </div>
        <div className="upcomingevent-container">
          <div className="upcomingevent-container-button">
            <Route exact path="/admindashboard/upcomingevent/createupcomingevent">
              <Createopinionpoll />
            </Route>
            <NavLink to="/admindashboard/opinionpoll/createopinionpoll">
              <Button variant="contained" color="success">
                Create Opinionpoll
              </Button>
            </NavLink>
            <Route exact path="/admindashboard/opinionpoll/createopinionpoll">
              <Createopinionpoll />
            </Route>
            <NavLink to="/admindashboard/opinionpoll/createopinionpoll">
              <Button variant="contained" color="error">
                Disable Selected
              </Button>
            </NavLink>
          </div>
          <div className="table-container">
            {/* <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox size="small" />
                  </th>
                  <th>Opinion Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody> */}
                {/* {eventdata.map((e) => {
              return (
                <tr key={e.id}>
                  <td><Checkbox size="small"/></td>
                  <td>{e.title}</td>
                  <td>{e.eventorganizer}</td>
                  <td>{e.description}</td>
                  <td>{e.department}</td>
                  <td>{e.venue}</td>
                  <td><Edit/></td>
                  <td><Delete/></td>
                </tr>
              );
            })} 
                 <td>
                  <Checkbox size="small" />
                </td>
                <td>Demo</td>
                <td>Demo</td>
                <td>Demo</td>
                <td>Demo</td>
                <td>
                  <Edit />
                </td>
                <td>
                  <Delete />
                </td>
              </tbody>
            </table> */}
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
                      name="opinionpollSelect"
                      sx={{ color: "white" }}></Checkbox>
                  </StyledTableCell>
                  <StyledTableCell>Opinion Poll Title</StyledTableCell>
                  <StyledTableCell>Opinion Poll Type</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {opiniondata
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
                        <StyledTableCell>{e.opinionTitle}</StyledTableCell>
                        <StyledTableCell>
                          {e.opinionType}
                        </StyledTableCell>
                        <StyledTableCell>{e.opinionDescription}</StyledTableCell>
                        <StyledTableCell>{convert(e.opinionStartDate)}</StyledTableCell>
                        <StyledTableCell>{convert(e.opinionEndDate)}</StyledTableCell>
                        <StyledTableCell>
                          <LinkRoute
                            to={{
                              pathname:
                                "/admindashboard/opinionpoll/updateopinionpoll/:id",
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
          </div>
          <div>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={opiniondata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /></div>
        </div>
      </div>
    </div>
  );
};

export default Opinionpoll;
