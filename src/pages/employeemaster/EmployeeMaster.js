import { styled } from '@mui/material/styles';
import { Typography, Button, Breadcrumbs, Link, Checkbox, Paper, tableCellClasses, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import { NavLink, useHistory, useRouteMatch, Redirect } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material';
import { Link as LinkRoute } from "react-router-dom";
import "./EmployeeMaster.css"

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


export const EmployeeMaster = () => {
    const navigate = useHistory();
    const [csvFile, setcsvFile] = useState(null);
    const [fileError, setfileError] = useState(null);

    console.log(csvFile);
const readData = (e) => {
    const fileType = ["text/csv"];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
        console.log(selectedFile);
        if (selectedFile && fileType.includes(selectedFile.type)) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (e) => {
                setcsvFile(e.target.result);
                console.log(e.target.result);
                setfileError(null);
            }
        }
        else {
            setfileError("PLease select only csv file type");
            setcsvFile(null);
        }
    }
    else {
        console.log("No File Selected");
    }

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
                        <Button variant="contained" color="success" size='small' className='btn-create' onChange={readData}>
                            <input type="file" name="employeeData" placeholder='Bulk Upload' ></input>
                        </Button>
                        <Button variant="contained" color="error" size='small' className='btn-delete'>
                            <Typography variant='caption' className='btn-delete-font'>Disable Selected</Typography>
                        </Button>
                    </div>
                    <div className="employeemastertable-container">
                        <TableContainer sx={{ boxShadow: "box-shadow:  3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)" }}>
                            <Table stickyHeader aria-label='sticky table' sx={{ maxHeight: 440 }} size='small'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell><Checkbox size='small' name='employeemasterSelect' sx={{ color: "black" }}></Checkbox></StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Company</StyledTableCell>
                                        <StyledTableCell>Department</StyledTableCell>
                                        <StyledTableCell>D.O.B</StyledTableCell>
                                        <StyledTableCell>Mobile No.</StyledTableCell>
                                        <StyledTableCell>Image</StyledTableCell>
                                        <StyledTableCell>D.O.J</StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>

                                        <StyledTableCell>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>

                                {/* {achievementdata.length > 0 &&

                                    <TableBody>
                                        {achievementdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((e) => {
                                                
                                                if (e.isDeleted == false) return (
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
                                                                state: { idParam: e.id }
                                                            }} ><ModeEdit sx={{ color: "rgba(0, 127, 255, 1)" }} /></LinkRoute>
                                                            <Button size='small' id={e.id} key={e.id} onClick={(event) => handleDelete(e.id)} sx={{ verticalAlign: "bottom", minWidth: "auto" }}><Delete sx={{ color: "red" }} /></Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>

                                                )

                                            }
                                            )}
                                    </TableBody>

                                } */}

                            </Table>
                        </TableContainer>
                        {/* {<TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={counter}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />} */}

                    </div>
                </div>
            </div>

        </>
    )
}
