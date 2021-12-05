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
import { useStyles } from "../styling";
import { IconButton } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserTouer as Router,
    Switch, 
    Route,
    Link } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {RegistrationRoute, ExplorerRoute } from '../Routing';
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
        text: 'Maps',
        icon: <TrackChangesIcon />,
        onClick: () => history.push('/GoogleMaps')
    }, {
        text: 'Explore',
        icon: <RemoveRedEyeIcon />,
        onClick: () => history.push('/explorer')
    }, {
        text: 'Monitor Sensors',
        icon: <ArchiveIcon />,
        onClick: () => history.push('/SensorData')
    },
    {
      text: 'Monitor Paths',
      icon: <ArchiveIcon />,
      onClick: () => history.push('/PathMonitor')
  }
  ];

    return (
<div className>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            KCLOUD
          </Typography>
        </Toolbar>
      </AppBar>
      <MUIDrawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
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