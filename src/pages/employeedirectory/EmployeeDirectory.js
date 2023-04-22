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
    TextField,
    InputAdornment,
} from "@mui/material";


import { Announcement, Edit, Search } from "@mui/icons-material";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Link as LinkRoute } from "react-router-dom";
import "./EmployeeDirectory.css"
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
const EmployeeDirectory = () => {
    const [counter, setCounter] = useState(0);
    const navigate = useHistory();
    let { path, url } = useRouteMatch();
    const [njdata, setnjdata] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [query, setQuery] = React.useState("");
    const getLocalItem = () => {
        let data = JSON.parse(localStorage.getItem("nj"));
        if (data) {
            let finaldata = data.filter(e => e.isDeleted == false);
            setnjdata(finaldata);
            setCounter(finaldata.length);
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
        return [day, mnth, date.getFullYear()].join("-");
    }
    const search = () => {
        return njdata.filter((user) => user.njFirstName.toLowerCase().startsWith(query) || user.njLastName.toLowerCase().startsWith(query) || user.njCompany.toLowerCase().includes(query) || user.njDepartment.toLowerCase().includes(query) || user.njDesignation.toLowerCase().includes(query));
    }
    return (
        <div className="page-information-container">
            <div className="page-header">
                <label>Employee Directory</label>
            </div>
            <div className='page-breadscrumb'>
                <br />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/admindashboard" exact to="/admindashboard/">
                        Home
                    </Link>
                    <Link
                        underline="hover" color="inherit" href="/admindashboard/salespurchase" exact to="/admindashboard/salespurchase">
                        EmployeeDirectory
                    </Link>
                </Breadcrumbs>
                <br />
            </div>
            <div className="employeedirectory-container">
                <div className="table-container">

                    <TextField
                        variant="outlined"
                        className="searchbox"
                        id="text"
                        name="text"
                        placeholder="Search..."
                        inputProps={{ className: "small" }}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <TableContainer sx={{ width: 79 + "vw" }} >
                        <Table
                            stickyHeader
                            aria-label="sticky table"
                            sx={{ maxHeight: 440 }}>
                            <TableHead>
                                <TableRow>

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

                                    <StyledTableCell>Mobile No.</StyledTableCell>
                                    <StyledTableCell>Address</StyledTableCell>
                                    <StyledTableCell>Role</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {search()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((e) => {
                                        if (e.isDeleted == false)
                                            return (
                                                <StyledTableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={e.id}>

                                                    <StyledTableCell>{e.njFirstName}</StyledTableCell>
                                                    <StyledTableCell>
                                                        {e.njMiddleName}
                                                    </StyledTableCell>
                                                    <StyledTableCell>{e.njLastName}</StyledTableCell>
                                                    <StyledTableCell>{convert(e.njDob)}</StyledTableCell>
                                                    <StyledTableCell>{convert(e.njDoj)}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <img src={e.njImage} height="50rem" width="50rem" style={{ border: '1px solid black' }} />
                                                    </StyledTableCell>
                                                    <StyledTableCell>{e.njDesignation}</StyledTableCell>
                                                    <StyledTableCell>{e.njDepartment}</StyledTableCell>
                                                    <StyledTableCell>{e.njCompany}</StyledTableCell>
                                                    <StyledTableCell>{e.njGender}</StyledTableCell>
                                                    <StyledTableCell>{e.njEmail}</StyledTableCell>

                                                    <StyledTableCell>{e.njMobileNo}</StyledTableCell>
                                                    <StyledTableCell>{e.njAddress}</StyledTableCell>
                                                    <StyledTableCell>{e.njRole}</StyledTableCell>
                                                </StyledTableRow>
                                            );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {search() == null ? <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={counter}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> :
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={search().length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    }

                </div>
            </div>
        </div>
    );
};

export default EmployeeDirectory;
