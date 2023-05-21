import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination, Dialog, DialogTitle } from '@mui/material'
import { NavLink, useHistory, useRouteMatch, Redirect } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material';
import { Link as LinkRoute } from "react-router-dom";
import "./EmployeeMaster.css"
import Papa from "papaparse";
import employeeData from '../../assets/data/employeerecognition';
import { parse } from 'date-fns';

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

const allowedExtensions = ["csv"];
export const EmployeeMaster = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useHistory();
    const [employee, setEmployee] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const [col, setCol] = useState([]);
    const [counter, setCounter] = useState(0);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleFileChange = (e) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            parsedData.forEach(element => {
                if (element.isDeleted == "" || element.id == "") {
                    element.isDeleted = false;
                    element.id = Math.random().toString();
                }
            });
            let data = JSON.parse(localStorage.getItem("employee"));
            console.log(data);
            setEmployee(data);
            if(employee.length == 0) {
                setEmployee([...parsedData]);
                console.log(employee.length);
                localStorage.setItem("employee", JSON.stringify(employee));
                handleClose();
                navigate.push("/admindashboard/employeemaster");
            }
            if(employee.length > 0){
                parsedData.forEach(element => {
                    employee.push(element);
                })
                setEmployee([...employee]);
                localStorage.setItem("employee", JSON.stringify(employee));
                handleClose();
                navigate.push("/admindashboard/employeemaster");
            }
            
        };
        reader.readAsText(file);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        try {
            let data = (JSON.parse(localStorage.getItem("employee"))).filter(e=> e.isDeleted == "false");
            if (data.length > 0) {
                setEmployee(data);
                setCounter(data.length);
            }

        }
        catch (e) {

        }

    }, [])

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    return (
        <>
            <div className="page-information-container">
                <div className="page-header"><label>
                    Employee Master
                </label>
                    <div className='page-breadscrumb'>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/" onClick={() => { navigate.push("/admindashboard") }}>
                                Home
                            </Link>
                            <Link
                                underline="hover" area-current="page" style={{ color: "black" }} onClick={() => { navigate.push("/admindashboard/employeemaster") }}>
                                Employee Master
                            </Link>

                        </Breadcrumbs>
                    </div>
                </div>
                <div className="employeemaster-container">
                    <div className="employeemaster-container-button">
                        <Button variant='contained' color="info" size='small' className='btn-upload' onClick={handleClickOpen}>
                            Bulk Upload
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Upload CSV File</DialogTitle>
                            <input type="file" name="csvfile" onChange={handleFileChange} />
                            <Button onClick={handleParse}>Upload</Button>
                            <Button onClick={handleClose}>Close</Button>
                        </Dialog>

                    </div>
                    <div className="employeemastertable-container">
                        <TableContainer sx={{ boxShadow: "box-shadow:  3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }}>
                            <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }} size='small'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Sr.no </StyledTableCell>
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

                                {employee.length > 0 &&

                                    <TableBody>
                                        {employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((e,key) => {

                                                return (
                                                    <StyledTableRow hover  tabIndex={-1} key={e.id}>
                                                        <StyledTableCell>{key + 1}</StyledTableCell>
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
                                                        <StyledTableCell>{e.njPassword}</StyledTableCell>
                                                        <StyledTableCell>{e.njMobileNo}</StyledTableCell>
                                                        <StyledTableCell>{e.njAddress}</StyledTableCell>
                                                        <StyledTableCell>{e.njRole}</StyledTableCell>

                                                        <StyledTableCell>
                                                            <LinkRoute
                                                                to={{
                                                                    pathname:
                                                                        "/admindashboard/updateemployeemaster/:id",
                                                                    state: { idParam: e.id },
                                                                }}>
                                                                <ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} />
                                                            </LinkRoute>

                                                            {/* <Button size='small' id={e.id} key={e.id} onClick={handleDelete} sx={{ verticalAlign: "bottom", minWidth: "auto" }}><Delete sx={{ color: "red" }} /></Button> */}
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

        </>
    )
}
