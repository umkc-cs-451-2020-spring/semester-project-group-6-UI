// @flow
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import "./TeamTable.scss";

type State = {
    expanded : Boolean
}

class TeamTable extends Component<State>{
    constructor(props: any){
        super(props);
        this.state = {
            expanded : false
        };
    }


    toggleExpansion() {
        this.setState({ expanded: !this.state.expanded });
      }

    render(){
        const expanded = this.state.expanded;
        let team = this.props.team;
        let names;

        return(
        <>
         {team !== undefined && team.length > 0
         ? 
            (
                <ExpansionPanel
                    className="expansion-large"
                    expanded={expanded}
                >
                <ExpansionPanelSummary
                    expandIcon={
                        <ExpandMoreIcon onClick={this.toggleExpansion.bind(this)} />
                      }
                >
                    <Typography>
                        Team Members from /api/Values
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Card className="card-large">
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {team.map((fullName, index) => (
                                        names = fullName.split(" "),
                                        <TableRow key={index}>
                                            <TableCell>{names[0]}</TableCell>
                                            <TableCell>{names[1]}</TableCell>
                                        </TableRow>
                                    ))}
                                   {/*  <TableRow>
                                        <TableCell>John</TableCell>
                                        <TableCell>Doe</TableCell>
                                    </TableRow> */}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            )
         : null}
        </>
        );
    }
}
export default TeamTable;
TeamTable.propTypes = {
    team: PropTypes.array,
}