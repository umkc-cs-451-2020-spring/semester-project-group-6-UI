// @flow
import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import Notification from "../../entities/Notification.js";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";

import "./NotificationTable.scss";

class NotificationTable extends Component{
    constructor(props: any){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        };
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value,
            page : 0
        });

    }


    render(){
    
        let notifications = this.props.notifications;
        let { page, rowsPerPage } = this.state;
        let columnHeaders = new Notification();
    
        return(

            <div className="transactions" align="center">
                <Typography
                        className="title"
                        variant="h5"
                    >
                    Notifications
                </Typography>
                <Paper className = "notifyPaper" align="center">
                    <TableContainer className="notifyTable" >
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead className="notifyTableHeader">
                                <TableRow>
                                    {Object.keys(columnHeaders).map((keyName, i) => (
                                        keyName !== "id"
                                        ?
                                        <TableCell 
                                            key={i}
                                            className="notifyHeaderRow"
                                        >
                                        {keyName}
                                        </TableCell>
                                        : null
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notification, i) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            {Object.keys(columnHeaders).map((key, j) => {
                                                const value = notification[key];
                                                return (
                                                    key !== "id"
                                                    ?
                                                    <TableCell key={j}>
                                                        {value}
                                                    </TableCell>
                                                    : null
                                                )
                                                
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10,25,100]}
                        className="notifyPaginationRow"
                        component="div"
                        count={notifications.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ></TablePagination>
                </Paper>
            </div>
        );
    }
}
export default NotificationTable;
NotificationTable.propTypes = {
    notifications: PropTypes.array,
}