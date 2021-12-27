import React, { Component } from 'react';
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

function ExchangeRates(data) {
    return data.drums.map(drum => {
        return (
            <DrumCard drum={drum} onClick={Oncl} forAlarm={OnClickForAlarm}></DrumCard>
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

function Explorer() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    var population = Aggregator(data);
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
                {ExchangeRates(data)}
            </div>
        </div>
    );
}

//Bind together the query with the component
export default withRouter(Explorer);