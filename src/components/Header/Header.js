// @flow
import React, { Component } from "react";
import {auth} from "../../config/firebase";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "react-avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import CommerceLogo from "../../assets/commerceColor.png";

import "./Header.scss";

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            anchorEl : null,
            hasNotifications: true
        };
    }
    
    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    }
    handleClose = () => {
        this.setState({anchorEl: null});
    }
    logOutUser = () => {
        auth.signOut();
        this.setState({anchorEl: null});
    }
    openNotifications = () => {
        this.props.openDialog();
    }
    render() {
        const {anchorEl, hasNotifications } = this.state;
        return (
            <div>
                <AppBar className="header" position="fixed">
                    <Toolbar>
                        <a href="">
                            <img className="logo" src={CommerceLogo} alt="Commerce Logo" />
                        </a>
                        <Button className="notification-btn" aria-controls="simple-menu" aria-haspopup="true" onClick={this.openNotifications}>
                            <NotificationsIcon 
                                className="bell" 
                                color={this.props.newNotifications ? "secondary" : "disabled"} 
                                //color="secondary"
                                />
                            <Typography 
                                variant="subtitle1" 
                            >
                                Notifications</Typography>
                        </Button>
                        <div>
                            <IconButton onClick={this.handleClick}>
                                <Avatar name={this.props.user.displayName} email="" color="#006747" size= "50" round={true} />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.logOutUser}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Header;
Header.propTypes={
    openDialog: PropTypes.func,
    notifications: PropTypes.array,
    user: PropTypes.object
};