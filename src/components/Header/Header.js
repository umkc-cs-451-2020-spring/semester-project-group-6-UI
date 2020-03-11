// @flow
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CommerceLogo from "../../assets/commerceColor.png";

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
                        {/* <Typography>Commerce Bank</Typography> */}
                        <a href="">
                            <img className="logo" src={CommerceLogo} alt="Commerce Logo" />
                        </a>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Header;