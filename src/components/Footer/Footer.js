// @flow
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import "./Footer.scss";

class Footer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AppBar className="footer" position="fixed">
                <Typography align="center" variant="overline">
                © {new Date().getFullYear()} UMKC CS451-r Team 6
                </Typography>
            </AppBar>
        );
    }
}
export default Footer;