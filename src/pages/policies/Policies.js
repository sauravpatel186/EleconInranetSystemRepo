import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import "../policies/Policies.css"
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material';
import { Link as LinkRoute } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffffff",
    // color: "white",
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

export const Policies = () => {
  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [policiesdata, setPoliciesdata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("policies"));
    if (data) {
      setPoliciesdata(JSON.parse(localStorage.getItem("policies")));
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

  const handleDelete = (e)=>{
    console.log(e);
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day,mnth,date.getFullYear()].join("-");
  }
  
  return (
    <div className="page-information-container">
      <div className="page-header"><label>
        Policies
      </label>
        <div className='page-breadscrumb'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" onClick={() => { navigate.push("/") }}>
              Home
            </Link>
            <Link
              underline="hover" area-current="page" style={{ color: "black" }} onClick={() => { navigate.push("/policies") }}>
              Policies
            </Link>

          </Breadcrumbs>
        </div>
      </div>
      <div className="policies-container">
        <div className="policies-container-button">
          <NavLink to="/admindashboard/policies/createpolicies">
            <Button variant="contained" color="success" size='small' className='btn-create'>
              <Typography variant='caption' className='btn-success-font'>Create New Policies</Typography>
            </Button>
          </NavLink>
          <Button variant="contained" color="error" size='small' className='btn-delete'>
          <Typography variant='caption' className='btn-delete-font'>Disable Selected</Typography>
          </Button>
        </div>
        <div className="policiestable-container">
            <TableContainer sx={{boxShadow:"box-shadow:  3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}>
              <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }} size='small'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell><Checkbox size='small' name='policiesSelect' sx={{ color: "black" }}></Checkbox></StyledTableCell>
                    <StyledTableCell>Policies Title</StyledTableCell>
                    {/* <StyledTableCell>Policies Type</StyledTableCell>
                    <StyledTableCell>Employee Id and Name</StyledTableCell> */}
                    <StyledTableCell>Policy/Manual</StyledTableCell>
                    <StyledTableCell>Policies Description</StyledTableCell>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Creation Date</StyledTableCell>
                    <StyledTableCell>Revised Date</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {policiesdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((e) => {
                      return (
                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={e.id}>
                          <StyledTableCell><Checkbox size='small' /></StyledTableCell>
                          <StyledTableCell>{e.policiesTitle}</StyledTableCell>
                          {/* <StyledTableCell>{e.policiesType}</StyledTableCell>
                          <StyledTableCell>{e.employeeIdandName}</StyledTableCell> */}
                          <StyledTableCell>{e.policiesArea}</StyledTableCell>
                          <StyledTableCell>{e.policiesDescription}</StyledTableCell>
                          <StyledTableCell><object data={e.policiesImage} /></StyledTableCell>
                          <StyledTableCell>{convert(e.policiesStartDate)}</StyledTableCell>
                          <StyledTableCell>{convert(e.policiesEndDate)}</StyledTableCell>
                          <StyledTableCell>


                            <LinkRoute to={{
                              pathname: "/policies/updatepolicies/:id",
                              state: { idParam: e.id }
                            }} ><ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} /></LinkRoute>
                              
                          <div key={e.id} onClick={handleDelete(e.id)}><Delete sx={{ color: "red" }}/></div>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={policiesdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* <table>
            <thead>
              <tr>
                <th><Checkbox size="small" /></th>
                <th>Achievement Title</th>
                <th>Achievement Type</th>
                <th>Employee Id and Name</th>
                <th>Achievement Area</th>
                <th>Achievement Start Date</th>
                <th>Achievement End Date</th>
                <th>Achievement Description</th>
                <th>Achievement Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {policiesdata.map((e) => {
                return (
                  <tr key={e.id}>
                    <td><Checkbox size="small" /></td>
                    <td>{e.achievementTitle}</td>
                    <td>{e.achievementType}</td>
                    <td>{e.employeeIdandName}</td>
                    <td>{e.achievementArea}</td>
                    <td>{e.achievementStartDate}</td>
                    <td>{e.achievementEndDate}</td>
                    <td>{e.achievementDescription}</td>
                    <td><img src={e.achievementImage}/></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>  */}
        </div>
      </div>
    </div>

  )
}
export default Policies