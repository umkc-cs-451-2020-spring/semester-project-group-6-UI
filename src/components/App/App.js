// @flow
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import TeamTable from "../TeamTable/TeamTable.js";
import TransactionTable from "../TransactionTable/TransactionTable.js";
import TeamService from "../../services/TeamService.js";
import TransactionService from "../../services/TransactionService.js";

import './App.scss';

import Transactions from "../../SampleData/Transactions.json";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      team : [],
      transactions : []
    };
  }

  async componentDidMount(){
    this.getTeam();
    this.getTransactions();
  }

  async getTeam(){
    let team = await new TeamService().getTeamMembers();
    //console.log(team);
    this.setState({team: team});
  }

  getTransactions(){
    let transactions = new TransactionService().getTransactions();
    this.setState({transactions: transactions});
  }

  render(){
    //let team = this.state.team;
    let transactions = this.state.transactions;
    console.log(transactions);

    return (
      <div className="app">
        <Header />
        <div className="main">
          {transactions.length > 0 ?
          
          <TransactionTable 
            transactions={transactions}
          />
          :
          null}
         {/*  <TeamTable 
            team={team}
          /> */}
        </div>
        <Footer />
      </div>
      
    );
  }

}

export default hot(module)(App);
