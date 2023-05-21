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
import Createcanteenmenu from "./createcanteenmenu/Createcanteenmenu"
import "./Canteenmenu.css";
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
const Canteenmenu = () => {
  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [menudata, setmenudata] = useState([]);
  const [counts, setcounts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = async() => {
    let data = await JSON.parse(localStorage.getItem("canteenmenu"));
    
    if (data) {
      let adata=data.filter(menu => menu.isDeleted==false)
      setmenudata( adata);
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
    const index = menudata.indexOf(menudata.find((a => a.id == e )));
    console.log(index)
    menudata[index].isDeleted = true
    setmenudata(menudata);
    console.log(menudata)
    navigate.push("/admindashboard/canteenmenu")
    localStorage.setItem("canteenmenu",JSON.stringify(menudata))
  }
  console.log(menudata);
  // const countitems =announcementdata.filter(e => e.isDeleted ==='false').length;
  // console.log("Not deleted: " + countitems);
  return (
    <div className="page-information-container">
      <div className="page-header">
        <label>Canteen Menu</label>
      </div>
      <div className='page-breadscrumb'>
            <br/>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/admindashboard" exact to="/admindashboard/">
                  Home
                </Link>
                <Link
                  underline="hover" color="inherit" href="/admindashboard/canteenmenu" exact to="/admindashboard/canteenmenu">
                  Canteen Menu
                </Link>
              </Breadcrumbs>
              <br/>
            </div>
      <div className="upcomingevent-container">
        <div className="upcomingevent-container-button">
          <Route exact path="/admindashboard/canteenmenu/createcanteenmenu">
            <Createcanteenmenu />
          </Route>
          <NavLink to="/admindashboard/canteenmenu/createcanteenmenu">
            <Button variant="contained" color="success" size="small">
              Create Canteen Menu
            </Button>
          </NavLink>
          <Route exact path="/admindashboard/canteenmenu/createcanteenmenu">
            <Createcanteenmenu />
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
                  <StyledTableCell>Breakfast Food Items</StyledTableCell>
                  <StyledTableCell>Breakfast Beverages</StyledTableCell>
                  <StyledTableCell>Lunch Food Items</StyledTableCell>
                  <StyledTableCell>Lunch Beverages</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              { menudata.length > 0 &&
              <TableBody>
                {menudata
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
                        <StyledTableCell>{e.newmenuBreakfastFood}</StyledTableCell>
                        <StyledTableCell>{e.newmenuBreakfastBeverage}</StyledTableCell>
                        <StyledTableCell>{e.newmenuLunchFood}</StyledTableCell>
                        <StyledTableCell>{e.newmenuLunchBeverage}</StyledTableCell>
                        <StyledTableCell>
                          <LinkRoute
                            to={{
                              pathname:
                                "/admindashboard/canteenmenu/updatecanteenmenu/:id",
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
            count={menudata.length}
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

export default Canteenmenu;
