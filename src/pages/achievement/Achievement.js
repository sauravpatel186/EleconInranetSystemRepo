import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import "../achievement/Achievement.css"
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material';
import { Link as LinkRoute } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans'"
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

  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("achievement"));
    if (data) {
      setAchievementdata(JSON.parse(localStorage.getItem("achievement")));
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
  return (
    <div className="page-information-container">
      <div className="page-header"><label>
        Achievement
      </label>
        <div className='page-breadscrumb'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" onClick={() => { navigate.push("/") }}>
              Home
            </Link>
            <Link
              underline="hover" area-current="page" style={{ color: "black" }} onClick={() => { navigate.push("/achievement") }}>
              Achievement
            </Link>

          </Breadcrumbs>
        </div>
      </div>
      <div className="achievement-container">
        <div className="achievement-container-button">
          <NavLink to="/achievement/createachievement">
            <Button variant="contained" color="success">
              Create New Achievement
            </Button>
          </NavLink>
          <Button variant="contained" color="error">
            Disable Selected
          </Button>
        </div>
        <div className="achievementtable-container">
       

            <TableContainer>
              <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell><Checkbox size='small' name='achievementSelect' sx={{ color: "white" }}></Checkbox></StyledTableCell>
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
                <TableBody>
                  {achievementdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((e) => {
                      return (
                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={e.id}>
                          <StyledTableCell><Checkbox size='small' /></StyledTableCell>
                          <StyledTableCell>{e.achievementTitle}</StyledTableCell>
                          <StyledTableCell>{e.achievementType}</StyledTableCell>
                          <StyledTableCell>{e.employeeIdandName}</StyledTableCell>
                          <StyledTableCell>{e.achievementArea}</StyledTableCell>
                          <StyledTableCell>{e.achievementDescription}</StyledTableCell>
                          <StyledTableCell><img src={e.achievementImage} /></StyledTableCell>
                          <StyledTableCell>{e.achievementStartDate}</StyledTableCell>
                          <StyledTableCell>{e.achievementEndDate}</StyledTableCell>
                          <StyledTableCell>


                            <LinkRoute to={{
                              pathname: "/achievement/updateachievement/:id",
                              state: { idParam: e.id }
                            }} ><ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} /></LinkRoute>

                            <Delete sx={{ color: "red" }} />
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
            count={achievementdata.length}
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
              {achievementdata.map((e) => {
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
          </table> */}
        </div>
      </div>
    </div>

  )
}