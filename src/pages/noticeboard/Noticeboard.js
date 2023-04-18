import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import "../noticeboard/Noticeboard.css"
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

export const Noticeboard = () => {
  const navigate = useHistory();
  let { path, url } = useRouteMatch();
  const [noticedata, setNoticedata] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getLocalItem = () => {
    let data = JSON.parse(localStorage.getItem("notice"));
    if (data) {

      setNoticedata(data);
      console.log(noticedata)
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
    const notices = noticedata.find(a => a.id !== e.id);
    notices.isDeleted = true;
    setNoticedata(result => ({
      ...result,
      isDeleted: true
    }));
    console.log(noticedata)
    localStorage.setItem("notice",JSON.stringify(noticedata))
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
        Notice Board
      </label>
        <div className='page-breadscrumb'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" onClick={() => { navigate.push("/") }}>
              Home
            </Link>
            <Link
              underline="hover" area-current="page" style={{ color: "black" }} onClick={() => { navigate.push("/noticeboard") }}>
              Notice Board
            </Link>

          </Breadcrumbs>
        </div>
      </div>
      <div className="noticeboard-container">
        <div className="noticeboard-container-button">
          <NavLink to="/admindashboard/noticeboard/createnotice">
            <Button variant="contained" color="success" size='small' className='btn-create'>
              <Typography variant='caption' className='btn-success-font'>Create New Notice</Typography>
            </Button>
          </NavLink>
          <Button variant="contained" color="error" size='small' className='btn-delete'>
            <Typography variant='caption' className='btn-delete-font'>Disable Selected</Typography>
          </Button>
        </div>
        <div className="noticeboardtable-container">
          <TableContainer sx={{ boxShadow: "box-shadow:  3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }}>
            <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }} size='small'>
              <TableHead>
                <TableRow>
                  <StyledTableCell><Checkbox size='small' name='noticeSelect' sx={{ color: "black" }}></Checkbox></StyledTableCell>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Notice Title</StyledTableCell>
                  <StyledTableCell>View From</StyledTableCell>
                  <StyledTableCell>View Upto</StyledTableCell>
                  <StyledTableCell>Notice Description</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              
              { noticedata.length > 0 &&
                        (
                          <TableBody>
                            {noticedata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((e) => {
                                console.log(noticedata.length);
                                e.isDeleted === false && 
                                (
                                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={e.id}>
                                    <StyledTableCell><Checkbox size='small' /></StyledTableCell>
                                    <StyledTableCell>{e.noticeTitle}</StyledTableCell>
                                    <StyledTableCell>{e.noticeDescription}</StyledTableCell>
                                    <StyledTableCell>{convert(e.noticeStartDate)}</StyledTableCell>
                                    <StyledTableCell>{convert(e.noticeEndDate)}</StyledTableCell>
                                    <StyledTableCell>
                                      <LinkRoute to={{
                                        pathname: "/admindashboard/noticeboard/updatenotice/:id",
                                        state: { idParam: e.id }
                                      }} ><ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} /></LinkRoute>
                                      <Button size='small' id={e.id} key={e.id} onClick={(event) => handleDelete(e.id)} sx={{ verticalAlign: "bottom", minWidth: "auto" }}><Delete sx={{ color: "red" }} /></Button>
                                    </StyledTableCell>
                                  </StyledTableRow>

                                )
                              
                              }
                              )}
                          </TableBody>)
      
          }
              
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={noticedata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>

  );
}

export default Noticeboard