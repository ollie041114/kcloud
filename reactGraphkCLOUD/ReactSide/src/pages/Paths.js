import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import { DrumCard } from '../components/_DrumCards';
import Drawer from '../components/Drawer';
import { getExtendedDrumData } from '../queries/structuredQuery';
import { isCompositeType } from 'graphql';
import { useStyles } from '../styling';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SetTheRoute from '../components/setTheRoute';
import CheckTheRoute from '../components/checkTheRoute';
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


function Paths() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentMenu, setCurrentMenu] = React.useState("Checking the route");

    // AnchroE1
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    function onMenuClick(event, data) {
        handleClose(event);
        setCurrentMenu(data);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    // Regular GraphQL stuff
    var history = useHistory();

    const [selectedDrum, setSelectedDrum] = useState(null);
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (
        <div className={classes.pach}>
            <Drawer></Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Working mode:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            {currentMenu}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={(event) => onMenuClick(event, "Check the Route")}>Check the Route</MenuItem>
                            <MenuItem onClick={(event) => onMenuClick(event, "Set the Route")}>Set the Route</MenuItem>
                            <MenuItem onClick={(event) => onMenuClick(event, "Monitor")}>Monitor</MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item xs={12}>
                    {currentMenu=="Check the Route" ? (
                        <CheckTheRoute />
                    ): null}
                    {currentMenu=="Set the Route" ? (
                        <SetTheRoute />
                    ) : null}
                    {currentMenu=="Monitor" ? (
                        ""
                    )
                    : null}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default withRouter(Paths);