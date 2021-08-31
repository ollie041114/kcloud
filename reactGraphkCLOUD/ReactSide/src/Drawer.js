import React from "react";

import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon, 
    ListItemText
} from "@material-ui/core";
import { useState } from "react";
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from "@material-ui/core";
import ArchiveIcon from '@material-ui/icons/Archive';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { useStyles } from "./styling";
import { IconButton } from "@material-ui/core";
import { BrowserTouer as Router,
    Switch, 
    Route,
    Link } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {RegistrationRoute, ExplorerRoute } from './Routing';
import { useHistory } from "react-router";


export const withRouter = (Component) => {
    const Wrapper = (props) => {
      const history = useHistory();
      
      return (
        <Component
          history={history}
          {...props}
          />
      );
    };
    
    return Wrapper;
  };

  
const Drawer = (props) => {
    const {history} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const itemsList = [{
        text: 'Register sensors',
        icon: <ExitToAppIcon />,
        onClick: () => history.push('/')
    }, {
        text: 'Tracking',
        icon: <TrackChangesIcon />,
        onClick: () => history.push('/tracking')
    }, {
        text: 'Explore',
        icon: <RemoveRedEyeIcon />,
        onClick: () => history.push('/explorer')
    }, {
        text: 'Archive',
        icon: <ArchiveIcon />,
        onClick: () => history.push('/tracking')
    }];

    return (
<div>
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
        <MUIDrawer variant = "permanent" className = {classes.drawer} 
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  })}
                  classes={{
                    paper: clsx({
                      [classes.drawerOpen]: open,
                      [classes.drawerClose]: !open,
                    }),
                }}
          >
          <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
            {itemsList.map((item, index) => {
                const {text, icon} = item;
                return (
                    <ListItem button key = {text} onClick = {item.onClick}>
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText primary = {text} />
                    </ListItem>
                );
            })}
        </List>
        </MUIDrawer>
        </div>
    );
};

export default withRouter(Drawer); 