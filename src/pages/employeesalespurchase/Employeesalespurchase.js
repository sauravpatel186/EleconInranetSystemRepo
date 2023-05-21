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
import Createsalespurchase from "./createemployeesalespurchase/Createemployeesalespurchase";
import "./Employeesalespurchase.css";
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
const Employeesalespurchase = () => {
  const navigate = useHistory();
  const [userdata,setuserdata] = useState([]);
  let { path, url } = useRouteMatch();
  const [salespurchasedata, setsalespurchasedata] = useState([]);
  const [counts, setcounts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = async() => {
    let udata=localStorage.getItem("user");
    if (udata) {
      setuserdata(JSON.parse(udata));
    }
  };
  const getSalespurchasedata = async() =>{
    let data = await JSON.parse(localStorage.getItem("salespurchase"));
    if (data) {
      let adata=data.filter(ad=>ad.isDeleted==false && ad.empid==userdata[0].id)
      setsalespurchasedata( adata);
    } else {
      return [];
    }
  }
  useEffect(() => {
    try {
      getLocalItem();
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(()=>{
    getSalespurchasedata();
  },[userdata])
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
    const index = salespurchasedata.indexOf(salespurchasedata.find((a => a.id == e )));
    console.log(index)
    salespurchasedata[index].isDeleted = true
    setsalespurchasedata(salespurchasedata);
    console.log(salespurchasedata)
    navigate.push("/employeedashboard/employeesalespurchase")
    localStorage.setItem("salespurchase",JSON.stringify(salespurchasedata))
  }
  console.log(salespurchasedata);
  // const countitems =announcementdata.filter(e => e.isDeleted ==='false').length;
  // console.log("Not deleted: " + countitems);
  return (
    <div className="page-information-container">
      <div className="page-header">
        <label>Sales/Purchase</label>
      </div>
      <div className='page-breadscrumb'>
            <br/>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/employeedashboard" exact to="/employeedashboard/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/employeedashboard/employeesalespurchase" exact to="/employeedashboard/employeesalespurchase">
                  Sale/Purchase
                </Link>
              </Breadcrumbs>
              <br/>
            </div>
      <div className="upcomingevent-container">
        <div className="upcomingevent-container-button">
          {/* <Route exact path="/employeedashboard/employeesalespurchase/createemployeesalespurchase">
            <Createsalespurchase />
          </Route> */}
          <NavLink to="/employeedashboard/employeesalespurchase/createemployeesalespurchase">
            <Button variant="contained" color="success" size="small">
              Create Ad
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
                      name="upcomingeventSelect"
                      sx={{ color:"white" }}></Checkbox>
                  </StyledTableCell>
                  <StyledTableCell>Ad Title</StyledTableCell>
                  <StyledTableCell>Ad Type</StyledTableCell>
                  <StyledTableCell>Ad Description</StyledTableCell>
                  <StyledTableCell>Mobile Number</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              { salespurchasedata.length > 0 &&
              <TableBody>
                {salespurchasedata
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
                        <StyledTableCell>{e.salespurchaseTitle}</StyledTableCell>
                        <StyledTableCell>{e.salespurchaseType}</StyledTableCell>
                        <StyledTableCell>{e.salespurchaseDescription}</StyledTableCell>
                        <StyledTableCell>{e.salespurchaseMNumber}</StyledTableCell>
                        <StyledTableCell><img src={e.salespurchaseImage} height="50rem" width="50rem" style={{}} /></StyledTableCell>
                        <StyledTableCell>{e.isApproved==false?"Not Approved":"Approved"}</StyledTableCell>
                        <StyledTableCell>
                          <LinkRoute
                            to={{
                              pathname:
                                "/employeedashboard/employeesalespurchase/updateemployeesalespurchase/:id",
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
            count={salespurchasedata.length}
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

export default Employeesalespurchase;
