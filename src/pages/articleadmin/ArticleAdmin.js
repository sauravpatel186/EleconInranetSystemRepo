import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory, useRouteMatch, Route, Redirect } from "react-router-dom";
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

import "./Article.css";
import { Announcement, Edit } from "@mui/icons-material";
import { Delete, ModeEdit,Close,Done} from "@mui/icons-material";
import { Link as LinkRoute } from "react-router-dom";
import Createadminarticle from "./Createadminarticle/Createadminarticle";
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
const ArticleAdmin = () => {
  const navigate = useHistory();
  const [userdata, setuserdata] = useState([]);
  let { path, url } = useRouteMatch();
  const [articledata, setarticledata] = useState([]);
  const [counts, setcounts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const getLocalItem =() => {
    let udata =  JSON.parse(localStorage.getItem("nj"));
    if (udata) {
      setuserdata(udata);
      console.log(udata)
    }
  };
  const getArticleData = async () => {
    let data =JSON.parse(localStorage.getItem("article"));
    if (data) {
      let adata =data.filter(ad => ad.isDeleted == false)
      setarticledata(adata);
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
    getArticleData();
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
    return [day, mnth, date.getFullYear()].join("-");
  }
  const handleDelete = (e) => {
    console.log(e);
    const index = articledata.indexOf(articledata.find((a => a.id == e)));
    console.log(index)
    articledata[index].isDeleted = true
    setarticledata(articledata);
    console.log(articledata)
    navigate.push("/employeedashboard/article")
    localStorage.setItem("article", JSON.stringify(articledata))
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear()].join("-");
  }
  const handleApprove = (e, status) => {
    const index = articledata.indexOf(articledata.find((a => a.id == e)));
    console.log(index);
    if (status === "disapprove") {
      articledata[index].isApproved = false
      setarticledata(articledata);
      navigate.push("/admindashboard/article")
      localStorage.setItem("article", JSON.stringify(articledata))
    }
    if (status === "approve") {
      articledata[index].isApproved = true
      setarticledata(articledata);
      navigate.push("/admindashboard/article")
      localStorage.setItem("article", JSON.stringify(articledata))
    }
  }
  // const countitems =announcementdata.filter(e => e.isDeleted ==='false').length;
  // console.log("Not deleted: " + countitems);
  return (
    <div className="page-information-container">
      <div className="page-header">
        <label>Article</label>
      </div>
      <div className='page-breadscrumb'>
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/employeedashboard" exact to="/employeedashboard/">
            Home
          </Link>
          <Link
            underline="hover" color="inherit" href="/admindashboard/employeearticle" exact to="/admindashboard/employeearticle">
            Article
          </Link>
        </Breadcrumbs>
        <br />
      </div>
      <div className="upcomingevent-container">
        <div className="upcomingevent-container-button">
          {/* <Route exact path="/employeedashboard/employeesalespurchase/createemployeesalespurchase">
            <Createsalespurchase />
          </Route> */}
          <NavLink to="/admindashboard/article/createarticle">
            <Button variant="contained" color="success" size="small">
              Create Article
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
                      sx={{ color: "white" }}></Checkbox>
                  </StyledTableCell>
                  <StyledTableCell>Article Title</StyledTableCell>
                  <StyledTableCell>Article Link</StyledTableCell>
                  <StyledTableCell sx={{width:"max-content"}}>Article Description</StyledTableCell>
                  <StyledTableCell>Employee Name</StyledTableCell>
                  <StyledTableCell>Employee Organization</StyledTableCell>
                  <StyledTableCell>Employee Department</StyledTableCell>
                  <StyledTableCell>Employee Mobile No.</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Approve</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              {articledata.length > 0 &&
                <TableBody>
                  {articledata
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((e) => {
                      if (e.isDeleted == false)
                        return (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={e.id}>
                            <StyledTableCell>
                              <Checkbox size="small" />
                            </StyledTableCell>
                            <StyledTableCell>{e.articleTitle}</StyledTableCell>
                            <StyledTableCell><a href={e.articleLink} target="_blank">{e.articleLink}</a></StyledTableCell>
                            <StyledTableCell>{e.articleDescription}</StyledTableCell>
                            <StyledTableCell>{userdata.filter(m => m.id == e.empid)[0].njFirstName}{" "}{userdata.filter(m => m.id == e.empid)[0].njMiddleName}{" "}{userdata.filter(m => m.id == e.empid)[0].njLastName}</StyledTableCell>
                            <StyledTableCell>{userdata.filter(m => m.id == e.empid)[0].njCompany}</StyledTableCell>
                            <StyledTableCell>{userdata.filter(m => m.id == e.empid)[0].njDepartment}</StyledTableCell>
                            <StyledTableCell>{userdata.filter(m => m.id == e.empid)[0].njMobileNo}</StyledTableCell>
                            
                            <StyledTableCell>{convert(e.articleStartDate)}</StyledTableCell>
                            <StyledTableCell>{convert(e.articleEndDate)}</StyledTableCell>
                            <StyledTableCell>{e.isApproved ? "Approved" : "Not Approved"}</StyledTableCell>
                          <StyledTableCell sx={{ textAlign: "center" }}>{e.isApproved ? <Close sx={{ color: "red" }} onClick={() => { handleApprove(e.id, "disapprove") }} /> : <Done sx={{ color: "green" }} onClick={() => { handleApprove(e.id, "approve") }} />}</StyledTableCell>
                          
                            <StyledTableCell>
                              <LinkRoute
                                to={{
                                  pathname:
                                    "/admindashboard/article/updateemployeearticle/:id",
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
            count={articledata.length}
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

export default ArticleAdmin;
