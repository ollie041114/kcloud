import React, { Component, useEffect } from 'react';
import App from "../App";
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import { useStyles } from '../styling';
import Drawer from '../components/Drawer';
import { useHistory } from 'react-router';
import { DrumCard } from '../components/_DrumCards';
import { ExploreAggregator } from '../components/exploreAggregator';
import Box from '@mui/material/Box';
import { ExploreAggregatorText } from '../components/exploreCards.js'
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {updateTime} from '../components/updateTime.js';

function VerticalToggleButtons(props) {
    var view = props.view;
    var handleChange = props.handleChange;
    return (
        <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="False" aria-label="list">
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="True" aria-label="module">
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

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


function OnClickForAlarm(event, history, drum) {
    event.preventDefault();
    history.push({
        pathname: '/SensorData',
        search: drum.id.toString(),
        state: { drumsy: drum }
    });
}

function Oncl(event, history, drum) {
    event.preventDefault();
    history.push({
        pathname: '/Explorer/DrumHistory',
        search: drum.id.toString(),
        state: { drumsy: drum }
    });
}

function ExchangeRates(drums, filtered) {
    return drums.map(drum => {
        return (
            <DrumCard drum={drum} onClick={Oncl} forAlarm={OnClickForAlarm} filtered = {filtered}></DrumCard>
        )
    });
}

function Aggregator(data) {
    var population = [];
    var statusArray = [];
    data.drums.map(drum => {
        var found = false;
        var foundIndex = "Nothing";
        let obj = statusArray.find((o, i) => {
            if (o.drumStatus === drum.currentStatus) {
                found = true;
                foundIndex = i;
                return true; // stop searching
            }
        });
        if (found == true) {
            statusArray[foundIndex].number += 1;
        } else {
            var appendix = {
                drumStatus: drum.currentStatus,
                number: 1,
            };
            statusArray.push(appendix);
        }
    });
    for (var i = 0; i < statusArray.length; i++) {
        population.push({
            name: statusArray[i].drumStatus,
            value: statusArray[i].number,
        }
        );
        //Do something
    }
    return population;
}
function filter(data, view) {
    var filteredDataDrums = [];
    if (view == "All drums") {
        return data.drums;
    }
    if (view == "Filtered") {
        var counter = 0;
        data.drums.map((drum) => {
            for (var i = 0; i < drum.sensorData.length; i++) {
                var item = drum.sensorData[0];
                if (item.rAlarm.message == "Danger" || item.tAlarm.message == "Danger" || item.aAlarm.message == "Danger") {
                    filteredDataDrums.push(drum);
                    break;
                }
            }
        });
    return filteredDataDrums;
}
}

function Explorer() {
    const [view, setView] = useState('False');
    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    const classes = useStyles();
     // Refetching every second
     const { loading, error, data, refetch } = useQuery(getBooksQuery);      
     const now = new Date().toLocaleTimeString();
 
     let [time, setTime] = useState(now);
 
     useEffect(() => {
       console.log(`initializing interval`);
       const interval = setInterval(() => {
         updateTime(refetch, setTime);
       }, 10000);
     
       return () => {
         console.log(`clearing interval`);
         clearInterval(interval);
       };
     }, []); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    var population = Aggregator(data);
    //var drums = filter(data, view);
    // data = 
    return (
        <div className={classes.root}>
            <Drawer></Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Box sx={{ flexGrow: 10 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ExploreAggregator population={population} />
                        </Grid>
                        <Grid item xs={6}>
                            <ExploreAggregatorText data={population} />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: 'inline' }}>
                    <VerticalToggleButtons handleChange={handleChange} view={view} />
                    <Box>
                        {ExchangeRates(data.drums, view)}
                    </Box>
                </Box>
            </div>
        </div>
    );
}

//Bind together the query with the component
export default withRouter(Explorer);