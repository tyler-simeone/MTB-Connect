/*** 
 Copied this code for dropdown menu component from Material UI - https://material-ui.com/components/lists/
***/
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';

import "./CustomizedMenu.css";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:hover": {
      backgroundColor: "#2c77b8",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    },
    '& .MuiListItemIcon-root': {
      minWidth: '36px'
    }
  }
}))(MenuItem);

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function CustomizedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="burgerMenu">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        onClick={handleClick}
        className="menuIcon"
      >
        <MenuIcon fontSize="large" />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <FilterHdrIcon fontSize="normal" />
          </ListItemIcon>
          <ListItemLink href="/trails">
            <ListItemText primary="Trails" />
          </ListItemLink>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <GroupIcon fontSize="normal" />
          </ListItemIcon>
          <ListItemLink href="/friends">
            <ListItemText primary="Friends" />
          </ListItemLink>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <PersonAddIcon fontSize="normal" />
          </ListItemIcon>
          <ListItemLink href="/pending">
            <ListItemText primary="Pending" />
          </ListItemLink>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="normal" />
          </ListItemIcon>
          <ListItemLink href="/profile">
            <ListItemText primary="Update Profile" />
          </ListItemLink>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="normal" />
          </ListItemIcon>
          <ListItemLink onClick={props.clearUser} href="/">
            <ListItemText primary="Logout" />
          </ListItemLink>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
