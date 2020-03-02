// @flow
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "./Header.scss";

class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar className="header" position="fixed">
                    <Toolbar>
                        <Typography>Commerce Bank</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Header;