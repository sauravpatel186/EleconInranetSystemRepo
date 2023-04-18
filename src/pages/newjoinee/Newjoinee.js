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
import Createnewjoinee from "./createnewjoinee/Createnewjoinee";
import "./Newjoinee.css";
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
const Newjoinee = (props) => {
   
    const navigate = useHistory();
    let { path, url } = useRouteMatch();
    const [njdata, setnjdata] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const getLocalItem = () => {
      let data = JSON.parse(localStorage.getItem("nj"));
      if (data) {
        setnjdata(JSON.parse(localStorage.getItem("nj")));
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
  
    const handleChangePage = (nj, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (nj) => {
      setRowsPerPage(+nj.target.value);
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
      const index = njdata.indexOf(njdata.find((a => a.id == e )));
      console.log(index)
      njdata[index].isDeleted = true
      setnjdata(njdata);
      console.log(njdata)
      navigate.push("/admindashboard/newjoinee")
      localStorage.setItem("nj",JSON.stringify(njdata))
    }
    console.log(njdata);
    return (
      <div className="page-information-container">
        <div className="page-header">
          <label>New Joinee</label>
        </div>
        <div className='page-breadscrumb'>
              <br/>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/" exact to="/">
                    Home
                  </Link>
                  <Link
                    underline="hover" color="inherit" href="/newjoinee" exact to="/newjoinee">
                    New Joinee
                  </Link>
                </Breadcrumbs>
                <br/>
              </div>
        <div className="newjoinee-page-container">
          <div className="newjoinee-container-button">
            {/* <Route exact path="admindashboard/newjoinee/createnewjoinee">
              <Createnewjoinee />
            </Route> */}
            <NavLink to="/admindashboard/newjoinee/createnewjoinee">
              <Button variant="contained" color="success" size="small">
                Create New Joinee
              </Button>
            </NavLink>
            {/* <Route exact path="admindashboard/newjoinee/createnewjoinee">
              <Createnewjoinee />
            </Route> */}
            <NavLink to="/admindashboard/newjoinee/createnewjoinee">
              <Button variant="contained" color="error" size="small">
                Disable Selected
              </Button>
            </NavLink>
          </div>
          <div className="table-container">
            <TableContainer sx={{width:79+"vw"}}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ maxHeight: 440}}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <Checkbox
                        size="small"
                        name="newjoineeSelect"
                        sx={{ color:"white" }}></Checkbox>
                    </StyledTableCell>
                    <StyledTableCell>First Name</StyledTableCell>
                    <StyledTableCell>Middle Name</StyledTableCell>
                    <StyledTableCell>Last Name</StyledTableCell>
                    <StyledTableCell>DOB</StyledTableCell>
                    <StyledTableCell>DOJ</StyledTableCell>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Designation</StyledTableCell>
                    <StyledTableCell>Department</StyledTableCell>
                    <StyledTableCell>Company</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Email ID</StyledTableCell>
                    <StyledTableCell>Password</StyledTableCell>
                    <StyledTableCell>Mobile No.</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Role</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {njdata
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
                          <StyledTableCell>{e.njFirstName}</StyledTableCell>
                          <StyledTableCell>
                            {e.njMiddleName}
                          </StyledTableCell>
                          <StyledTableCell>{e.njLastName}</StyledTableCell>
                          <StyledTableCell>{convert(e.njDob)}</StyledTableCell>
                          <StyledTableCell>{convert(e.njDoj)}</StyledTableCell>
                          <StyledTableCell>
                            <img src={e.njImage} height="50rem" width="50rem" style={{border: '1px solid black'}} />
                          </StyledTableCell>
                          <StyledTableCell>{e.njDesignation}</StyledTableCell>
                          <StyledTableCell>{e.njDepartment}</StyledTableCell>
                          <StyledTableCell>{e.njCompany}</StyledTableCell>
                          <StyledTableCell>{e.njGender}</StyledTableCell>
                          <StyledTableCell>{e.njEmail}</StyledTableCell>
                          <StyledTableCell>{e.njPassword}</StyledTableCell>
                          <StyledTableCell>{e.njMobileNo}</StyledTableCell>
                          <StyledTableCell>{e.njAddress}</StyledTableCell>
                          <StyledTableCell>{e.njRole}</StyledTableCell>
                          
                          <StyledTableCell>
                                      <LinkRoute to={{
                                        pathname: "/admindashboard/newjoinee/updatenewjoinee/:id",
                                        state: { idParam: e.id}
                                      }} ><ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} /></LinkRoute>
                                      <Button size='small' id={e.id} key={e.id} onClick={(event) => handleDelete(e.id)} sx={{ verticalAlign: "bottom", minWidth: "auto" }}><Delete sx={{ color: "red" }} /></Button>
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
              count={njdata.length}
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
  
  export default Newjoinee;