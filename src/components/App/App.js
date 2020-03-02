// @flow
import React, { Component } from 'react';
import { hot } from "react-hot-loader";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import TeamTable from "../TeamTable/TeamTable.js";
import TeamService from "../../services/TeamService.js";
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      team : []
    };
  }

  async componentDidMount(){
    this.getTeam();
    //console.log(team);
    //this.setState({team: team});
  }

  async getTeam(){
    let team = await new TeamService().getTeamMembers();
    //console.log(team);
    this.setState({team: team});
  }

  render(){
    let team = this.state.team;
    console.log(team);

    return (
      <div className="app">
        <Header />
        <div className="main">
          <TeamTable 
            team={team}
          />
        </div>
        <Footer />
      </div>
      
    );
  }

}

export default hot(module)(App);
