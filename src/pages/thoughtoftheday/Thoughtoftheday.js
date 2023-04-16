import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import "../thoughtoftheday/Thoughtoftheday.css"
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material';
import { Link as LinkRoute } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFFFFF",
    color: "black",
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

export const Thoughtoftheday = () => {
  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [thoughtdata, setThoughtdata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("thought"));
    if (data) {
      setThoughtdata(JSON.parse(localStorage.getItem("thought")));
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
        Thought Of The Day
      </label>
        <div className='page-breadscrumb'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" onClick={() => { navigate.push("/") }}>
              Home
            </Link>
            <Link
              underline="hover" area-current="page" style={{ color: "black" }} onClick={() => { navigate.push("/admindashboard/thoughtoftheday") }}>
              Thought Of The Day
            </Link>

          </Breadcrumbs>
        </div>
      </div>
      <div className="thoughtoftheday-container">
        <div className="thoughtoftheday-container-button">
          <NavLink to="/admindashboard/thoughtoftheday/createthought">
            <Button variant="contained" color="success" size='small' className='btn-create'>
              <Typography variant='caption' className='btn-success-font'>Create New Thought</Typography>
            </Button>
          </NavLink>
          <Button variant="contained" color="error" size='small' className='btn-delete'>
          <Typography variant='caption' className='btn-delete-font'>Disable Selected</Typography>
          </Button>
        </div>
        <div className="thoughtofthedaytable-container">
            <TableContainer sx={{boxShadow:"box-shadow:  3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}>
              <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }} size='small'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell><Checkbox size='small' name='thoughtSelect' sx={{ color: "black" }}></Checkbox></StyledTableCell>
                    <StyledTableCell>Thought Title</StyledTableCell>
                    <StyledTableCell>Author Name</StyledTableCell>
                    <StyledTableCell>Thought Type</StyledTableCell>
                    <StyledTableCell>Add Thought</StyledTableCell>
                    <StyledTableCell>Thought Description</StyledTableCell>
                    <StyledTableCell>Start Date</StyledTableCell>
                    <StyledTableCell>End Date</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {thoughtdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((e) => {
                    return (
                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={e.id}>
                        <StyledTableCell><Checkbox size='small' /></StyledTableCell>
                        <StyledTableCell>{e.thoughtTitle}</StyledTableCell>
                        <StyledTableCell>{e.authorName}</StyledTableCell>
                        <StyledTableCell>{e.thoughtType}</StyledTableCell>
                        <StyledTableCell>{e.addThought}</StyledTableCell>
                        <StyledTableCell>{e.thoughtDescription}</StyledTableCell>
                        <StyledTableCell>{convert(e.thoughtStartDate)}</StyledTableCell>
                        <StyledTableCell>{convert(e.thoughtEndDate)}</StyledTableCell>
                        <StyledTableCell>


                            <LinkRoute to={{
                            pathname: "/thoughtoftheday/updatethought/:id",
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
            count={thoughtdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </div>
      </div>
    </div>

  )
}

export default Thoughtoftheday
