// @flow
import React, { Component } from "react";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
            rowsPerPage: 5,
            openRow: false,
            notifications : []
        };
    }
    componentDidMount(){
        this.setState({notifications: this.props.notifications});
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
    openRow = (id) => {
        console.log(id);
        let notifications = [...this.state.notifications];
        let index = notifications.findIndex(ntfy => ntfy.id === id);
        notifications[index].open = !notifications[index].open;
        this.setState({notifications: notifications});
    }


    render(){
    
        let notifications = this.state.notifications;
        let transactions = this.props.transactions;
        let { page, rowsPerPage, openRow } = this.state;
        let columnHeaders = new Notification();
        
    
        return(

            <div className="transactions" align="center">
                <Typography
                        className="title"
                        variant="h5"
                    >
                    Notifications
                </Typography>
                {notifications.length > 0
                ?
                 
                <Paper className = "notifyPaper" align="center">
                    <TableContainer className="notifyTable" >
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead className="notifyTableHeader">
                                <TableRow>
                                    {Object.keys(columnHeaders).map((keyName, i) => (
                                        keyName !== "id" && keyName !== "open"
                                        ?
                                        <TableCell 
                                            key={i}
                                            className="notifyHeaderRow"
                                        >
                                        {keyName.replace(/^\w/, c => c.toUpperCase())}
                                        </TableCell>
                                        : null
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notification, i) => {
                                    return (
                                        <>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i} onClick={() => this.openRow(notification.id)}>
                                            {Object.keys(columnHeaders).map((key, j) => {
                                                const value = notification[key];
                                                return (
                                                    key !== "id" && key !== "open"
                                                    ?
                                                        <TableCell key={j}>
                                                        {value}
                                                        </TableCell>
                                                    : null
                                                )
                                                
                                            })}
                                        </TableRow>
                                        <Collapse in={notification.open} timeout="auto" unmountOnExit>
                                            <Table >
                                            <TableRow>
                                            <TableCell>
                                                <Typography className="notification-text" align="center" variant="subtitle2">
                                                {transactions.find(trans => trans.id === notification.transaction).type === "CR"
                                                ? "Credit " : "Debit "}
                                                on {transactions.find(trans => trans.id === notification.transaction).date + " "} 
                                                :
                                                {" "  + transactions.find(trans => trans.id === notification.transaction).amount + " " }
                                                for {transactions.find(trans => trans.id === notification.transaction).description}
                                                </Typography>
                                                </TableCell>
                                                </TableRow>
                                            </Table>
                                        </Collapse>
                                        </>
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
                : null }
            </div>
        );
    }
}
export default NotificationTable;
NotificationTable.propTypes = {
    notifications: PropTypes.array,
    transactions: PropTypes.array
}