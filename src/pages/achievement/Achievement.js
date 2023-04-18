import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import "../achievement/Achievement.css"
import { NavLink, useHistory, useRouteMatch,Redirect } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material';
import { Link as LinkRoute } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#527ED4",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "Plus Jakarta Sans"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const Achievement = () => {
  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [achievementdata, setAchievementdata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [counter,setCounter] = useState(0);
  const getLocalItem = async() => {
    let data = await JSON.parse(localStorage.getItem("achievement"));
    if (data) {
      
      let adata = data.filter(achievement => achievement.isDeleted == false); 
      setAchievementdata(adata);
      setCounter(adata.length);
      // console.log(achievementdata)
    }
    else {
      return [];
    }
  }

  useEffect(() => {
    try {
      getLocalItem();
    }
    catch (error) {
      console.error(error);
    }
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleDelete = (e) => {
    console.log(e);
    let data = JSON.parse(localStorage.getItem("achievement"));
    setAchievementdata(data);
    const index = data.indexOf(data.find(a => a.id == e));
    console.log(index)
    achievementdata[index].isDeleted = true
    // achievements.isDeleted = true;
    // let objs = achievementdata
    setAchievementdata(achievementdata);
    localStorage.setItem("achievement",JSON.stringify(achievementdata));
    // <Redirect to="/admindashboard/achievement"></Redirect>
    navigate.push("/admindashboard/achievement");
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }
  return (
    <div className="page-information-container">
      <div className="page-header"><label>
        Achievement
      </label>
        <div className='page-breadscrumb'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" onClick={() => { navigate.push("/admindashboard") }}>
              Home
            </Link>
            <Link
              underline="hover" area-current="page" style={{ color: "black" }} onClick={() => { navigate.push("/admindashboard/achievement") }}>
              Achievement
            </Link>

          </Breadcrumbs>
        </div>
      </div>
      <div className="achievement-container">
        <div className="achievement-container-button">
          <NavLink to="/admindashboard/achievement/createachievement">
            <Button variant="contained" color="success" size='small' className='btn-create'>
              <Typography variant='caption' className='btn-success-font'>Create New Achievement</Typography>
            </Button>
          </NavLink>
          <Button variant="contained" color="error" size='small' className='btn-delete'>
            <Typography variant='caption' className='btn-delete-font'>Disable Selected</Typography>
          </Button>
        </div>
        <div className="achievementtable-container">
          <TableContainer sx={{ boxShadow: "box-shadow:  3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }}>
            <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }} size='small'>
              <TableHead>
                <TableRow>
                  <StyledTableCell><Checkbox size='small' name='achievementSelect' sx={{ color: "black" }}></Checkbox></StyledTableCell>
                  <StyledTableCell>Achievement Title</StyledTableCell>
                  <StyledTableCell>Achievement Type</StyledTableCell>
                  <StyledTableCell>Employee Id and Name</StyledTableCell>
                  <StyledTableCell>Achievement Area</StyledTableCell>
                  <StyledTableCell>Achievement Description</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              
              { achievementdata.length > 0 &&
                        
                          <TableBody>
                            {achievementdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((e) => {
                                {/* console.log(achievementdata.length); */}
                              if(e.isDeleted == false) return (
                                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={e.id}>
                                    <StyledTableCell><Checkbox size='small' /></StyledTableCell>
                                    <StyledTableCell>{e.achievementTitle}</StyledTableCell>
                                    <StyledTableCell>{e.achievementType}</StyledTableCell>
                                    <StyledTableCell>{e.employeeIdandName}</StyledTableCell>
                                    <StyledTableCell>{e.achievementArea}</StyledTableCell>
                                    <StyledTableCell>{e.achievementDescription}</StyledTableCell>
                                    <StyledTableCell><img className="achievement-image" src={e.achievementImage} width="40rem" height="40rem" /></StyledTableCell>
                                    <StyledTableCell>{convert(e.achievementStartDate)}</StyledTableCell>
                                    <StyledTableCell>{convert(e.achievementEndDate)}</StyledTableCell>
                                    <StyledTableCell>
                                      <LinkRoute to={{
                                        pathname: "/admindashboard/achievement/updateachievement/:id",
                                        state: { idParam: e.id}
                                      }} ><ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} /></LinkRoute>
                                      <Button size='small' id={e.id} key={e.id} onClick={(event) => handleDelete(e.id)} sx={{ verticalAlign: "bottom", minWidth: "auto" }}><Delete sx={{ color: "red" }} /></Button>
                                    </StyledTableCell>
                                  </StyledTableRow>

                                )
                              
                              }
                              )}
                          </TableBody>
      
          }
              
            </Table>
          </TableContainer>
          {<TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={counter}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
        
        </div>
      </div>
    </div>

  );
}
