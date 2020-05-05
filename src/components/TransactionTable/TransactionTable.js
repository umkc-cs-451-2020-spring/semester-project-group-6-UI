// @flow
import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import Transaction from "../../entities/Transaction.js";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";

import "./TransactionTable.scss";

class TransactionTable extends Component{
    constructor(props: any){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10
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
    
        let transactions = this.props.transactions;
        let { page, rowsPerPage } = this.state;
        let columnHeaders = new Transaction();
    
        return(

            <div className="transactions" align="center">
                <Typography
                        className="title"
                        variant="h5"
                    >
                    Transactions Summary
                </Typography>
                <Paper className = "transPaper" align="center">
                    <TableContainer className="transTable" >
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead className="tableHeader">
                                <TableRow>
                                    {Object.keys(columnHeaders).map((keyName, i) => (
                                        keyName !== "id" && keyName !== "type"
                                        ?
                                        <TableCell 
                                            key={i}
                                            className="headerRow"
                                        >
                                        {keyName}
                                        </TableCell>
                                        : null
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, i) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            {Object.keys(columnHeaders).map((key, j) => {
                                                const value = transaction[key];
                                                return (
                                                    key !== "id" && key !== "type"
                                                    ?
                                                    key === "amount"
                                                        ?
                                                            <TableCell
                                                            className={transaction.type === "CR" ? "credit-cell" : "debit-cell"} 
                                                            key={j}>
                                                            {transaction.type === "CR" ? "+" + value : "-" + value}
                                                            </TableCell>
                                                        :
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
                        className="paginationRow"
                        component="div"
                        count={transactions.length}
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
export default TransactionTable;
TransactionTable.propTypes = {
    transactions: PropTypes.array,
}