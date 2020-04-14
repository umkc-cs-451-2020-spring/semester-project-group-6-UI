// @flow
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from 'react-avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CommerceLogo from "../../assets/commerceColor.png";

import "./Header.scss";

function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div>
            <IconButton onClick={handleClick}>
                <Avatar name="Debbie Kirchner" email="" color="#006747" size= "50" round={true} />
            </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Transactions</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      );
}

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
                        <SimpleMenu />
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Header;