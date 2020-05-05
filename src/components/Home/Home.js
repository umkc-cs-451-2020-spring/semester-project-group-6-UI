/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CommerceHeader from "../../assets/CommerceHeader.png";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import Footer from "../Footer/Footer.js";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Header from "../Header/Header.js";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { Notification } from "../../entities/Notification.js";
import {NotificationRules} from "../../enums/NotificationRules.js";
import NotificationService from "../../services/NotificationService.js";
import NotificationTable from "../NotificationTable/NotificationTable.js";
import { Transaction } from "../../entities/Transaction.js";
import TransactionTable from "../TransactionTable/TransactionTable.js";
import TeamService from "../../services/TeamService.js";
import TextField from "@material-ui/core/TextField";
import TransactionService from "../../services/TransactionService.js";
import Typography from "@material-ui/core/Typography";

import './Home.scss';

//import Transactions from "../../SampleData/Transactions.json";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions : [],
      notifications: [],
      notificationDialog: false,
      addDialog: false,
      typeSelect: "",
      newTransaction : {},
      newTriggers : [],
      newNotifications: false
    };
  }

  componentDidMount(){
    this.getTransactions();
    this.getNotifications();
    this.setTriggers();
  }

  getTransactions(){
    let transactions = new TransactionService().getTransactions();
    this.setState({transactions: transactions});
  }
  getNotifications(){
    let notifications = new NotificationService().getNotifications();
    this.setState({notifications: notifications});
  }
  setTriggers(){
   
    let trigArray = [];

    Object.keys(NotificationRules).map((rule, i) => {
      let trigger = {};
      trigger["rule"]= rule;
      trigger["description"] = NotificationRules[rule];
      trigger["checked"] = false;
      trigArray.push(trigger);
     
    });
    console.log(trigArray);
    this.setState({newTriggers: trigArray});
  }
  openNotification=()=>{
    this.setState({
      notificationDialog: true,
      newNotifications : false});
  }
  handleDialogClose = () => {
    this.setState({
      notificationDialog: false,
      addDialog: false
      });
  }
  openAddDialog = () => {
    this.setState({addDialog: true});
  }
  handleTransField = (event) => {
    let newTransaction = this.state.newTransaction;
    newTransaction[event.target.id] = event.target.value;
    this.setState({newTransaction: newTransaction});
  }
  handleTypeSelect = (event) => {
    let newTransaction = this.state.newTransaction;
    newTransaction["type"] = event.target.value;
    this.setState({
      newTransaction: newTransaction,
      typeSelect: event.target.value
    });

  }
  addTransaction = () => {
    let newTransaction = this.state.newTransaction;
    let transactions = [...this.state.transactions];
    let notifications = [...this.state.notifications];
    let newTriggers = this.state.newTriggers;
    let triggers = [];
    
    let newTrans = new Transaction();
    newTrans.id = transactions.length + 1;
    newTrans.account = newTransaction.account;
    //get today's date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    newTrans.date = today;
    newTrans.type = newTransaction.type;
    newTrans.amount = newTransaction.amount;
    newTrans.description = newTransaction.description;
    //add transaction to new state object
    transactions.push(newTrans);

    //iterate triggers to check for notifications
    [...newTriggers].forEach(function (trigger) {
      if (trigger.checked){
        triggers.push(trigger);
      }
    });
    //add notifications
    if (triggers.length > 0){
      [...triggers].forEach(function (trig) {
        let notification = new Notification();
        notification.id = notifications.length + 1;
        notification.transactionId = newTrans.id;
        notification.rule= NotificationRules[trig.rule];
        notifications.push(notification);
      });
    }
    newTransaction = {};
    this.setState({
      newTransaction: newTransaction,
      transactions : transactions,
      notifications: notifications,
      addDialog : false,
      newNotifications : true
    });
  }

  handleCheckBox = (event) => {
    let newTriggers = [...this.state.newTriggers];
   // console.log(event.target.id);
    let trigIndex = newTriggers.findIndex(trig => trig.rule === event.target.id);
   // console.log(trigger);
    newTriggers[trigIndex].checked = event.target.checked;
    this.setState({newTriggers: newTriggers});

  }

  render(){
    const {notificationDialog, addDialog, transactions, notifications, typeSelect, newTriggers, newNotifications} = this.state;
   
    return (
      <div className="app">
        <Header
          openDialog={this.openNotification} 
          notifications={notifications}
          newNotifications = {newNotifications}
          user={this.props.user}
        />
        <div className="main">
          <a href="">
            <img className="commerce-bubbles" src={CommerceHeader} alt="bubbles"/>
          </a>
          <Dialog 
            open={notificationDialog || addDialog}
            className="notification-dialog"
            onClose={this.handleDialogClose}
          >
            <DialogTitle id="alert-dialog-title">
              <IconButton className="close-icon" onClick = {this.handleDialogClose}>
              <CloseIcon />
            </IconButton>
            </DialogTitle>
            <DialogContent>
              {notificationDialog ?
              //Notifications
              <NotificationTable 
                notifications={notifications}
                transactions = {transactions}
              />
              :
              //Add Transaction Form -> Account num, date, Type, amount, description
              <div className="trans-fields">
              <Typography variant="h5">New Transaction</Typography>
              <div>
                <TextField 
                  autoFocus
                  variant="outlined"
                  className="field"
                  id="account"
                  label="Account Number"
                  type="text"
                  onChange={event => this.handleTransField(event)}
                />
                <FormControl 
                  variant="outlined"
                  className="select"
                  id="type"
                >
                  <TextField 
                    select
                    id="Type"
                    className="field"
                    type="text"
                    value={typeSelect}
                    variant="outlined"
                    onChange={event => this.handleTypeSelect(event)}
                  >
                    <MenuItem value="CR">Deposit</MenuItem>
                    <MenuItem value="DR">Withdrawal </MenuItem> 
                  </TextField>
                </FormControl>
                </div>
                <div>
                <TextField 
                  autoFocus
                  variant="outlined"
                  className="field"
                  id="amount"
                  label="Transaction Amount"
                  type="number"
                  onChange={event => this.handleTransField(event)}
                />
                <TextField 
                  autoFocus
                  variant="outlined"
                  className="field"
                  id="description"
                  label="Transaction Description"
                  type="text"
                  onChange={event => this.handleTransField(event)}
                />
                </div>
                <div className="notification-rules">
                  <Typography variant="h6">Add Notification Triggers</Typography>
                  <div className="notify-block">
                    {newTriggers.map((trigger, i) => (
                      <div className="notify-checks" key={i}>
                        <Checkbox
                          className="check-input"
                          id={trigger.rule}
                          checked={trigger.checked}
                          onChange={this.handleCheckBox}
                        />
                      <Typography variant="subtitle2">{trigger.description}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="submit-div">
                  <Button 
                    className="submit-btn"
                    onClick={this.addTransaction}
                  >
                  Submit
                  </Button>
                </div>
              </div>
        
              }
            </DialogContent>
          </Dialog>
          {transactions.length > 0 ?
          <>
            <TransactionTable 
              transactions={transactions}
            />
            <div>
              <Button
                className="add-btn"
                onClick={this.openAddDialog}
              >
              <AddIcon size="large"/>
              </Button>
            </div>
            </>
            :
          null}
        </div>
        <Footer />
      </div>
      
    );
  }

}

export default Home;
Home.propTypes={
    user: PropTypes.func
};
