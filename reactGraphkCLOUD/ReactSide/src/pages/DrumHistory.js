import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styling';
import Drawer from '../components/Drawer';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import BrandingWatermarkTwoToneIcon from '@material-ui/icons/BrandingWatermarkTwoTone';
import PanToolTwoToneIcon from '@material-ui/icons/PanToolTwoTone';
import TimelapseTwoToneIcon from '@material-ui/icons/TimelapseTwoTone';
import FeaturedVideoTwoToneIcon from '@material-ui/icons/FeaturedVideoTwoTone';
import { getExtendedDrumData } from '../queries/structuredQuery';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';


var itemsList = [];

function BasicInfo(props) {
    var drum = props.drum;
    return (
        <div style={{float: "right"}}>
            <Typography variant="h5" gutterBottom>
                Drum No. {drum.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Current Status: {drum.currentStatus}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                from: {drum.place_of_occurence}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Classification: {drum.classification}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Type: {drum.type}
            </Typography>
        </div>
    );
}

function DisplayInformation(props) {
    var obj = props.obj;
    console.log("object is");
    console.log(obj);
    if (typeof obj !== 'undefined' && obj) {
        var toReturn = [];
        for (const key in obj) {
            if (obj[key]) {
                if (obj[key].toString().includes('https')) {
                    toReturn.push(<Typography>{key} :</Typography>);
                    toReturn.push(<img src={obj[key]} width="200px" />);
                } else {
                    toReturn.push(<Typography>{key} : {obj[key]}</Typography>);
                }
            } else {
                toReturn.push(<Typography>{key}: missing</Typography>)
            }
        }
        console.log(toReturn);
        return (
            toReturn.map((item, index) => {
                return <div>{item}</div>;
            })
        );
    } else {
        return (
            <h1>Oops...</h1>
        )
    }
}

export function DrumHistoryMini(props) {
    var drumState = 0
    var isMini = false
    if (props.drum != null) {
        drumState = props.drum
    }
    const [drum, setDrum] = useState(drumState);

    var time;
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/GoogleMaps") {
            console.log(location);
            setDrum(location.state.drumsy);
            console.log(location.state.drumsy);
            console.log(location.pathname);
            console.log(location.search);
            console.log(typeof location.state.drumsy);

            if (typeof location.state.drumsy !== "undefined") {
                itemsList = getExtendedDrumData(location.state.drumsy).fullDrumHistory;
            }
        }
        else if (props.drum != null) {
            setDrum(props.drum);
            isMini = true;
            console.log("I am not null!")
            console.log(props.drum)
            setDrum(props.drum);
            if (typeof props.drum !== "undefined") {
                itemsList = getExtendedDrumData(props.drum).fullDrumHistory;
            }
        }
    }, [location]);


    var date;
    var time;
    itemsList.map((item, index) => {
        var { text, icon, color, data } = item;
    });
    console.log("dummy is" + drum);
    console.log('isMini is '+ props.isMini);
    return (
        <div className = {!props.isMini ? classes.drumHistoryWrapper : classes.MinidrumHistoryWrapper}>
            <div className = {!props.isMini ? classes.drumHistoryOne : classes.MinidrumHistoryOne}>
                {
                    props.showBasicInfo == true ?
                        (
                            <div className={classes.card} style={{ display: "inline-flex" }, { alignItems: "center" }, { maxWidth: "11px" }}>
                                <BasicInfo drum={drum} />
                            </div>
                        ) : (
                            <h1></h1>
                        )
                }
            </div >
            <div className = {!props.isMini ? classes.drumHistoryTwo : classes.MinidrumHistoryTwo}> 
            {/* {!isMini ? 'drumHistoryTwo' : 'null'} */}
                <Timeline>
                    {
                        itemsList.map((item, index) => {
                            var { text, icon, color, data } = item;

                            if (typeof data !== 'undefined') {
                                date = (new Date(data.date_unix * 1000)).toLocaleDateString("en-US");
                                time = (new Date(data.date_unix * 1000)).toLocaleTimeString("en-US");
                            }
                            if (drum.currentStatus == text) {
                                color = "primary"
                            }
                            return (
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography variant="body2" color="textSecondary">
                                            {date}
                                        </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>


                                        <TimelineDot color={color}>
                                            {icon}
                                        </TimelineDot>


                                        <TimelineConnector color={color} />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Paper elevation={3} className={classes.paper}>
                                            <Typography variant="h6" component="h1">
                                                {text}
                                            </Typography>
                                            <Typography variant="h12" component="h12" color="grey">
                                                {date} {time}
                                            </Typography>
                                            <br /><br />
                                            <DisplayInformation obj={data} />
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        })}
                </Timeline>
            </div>
        </div>
    );
}
export default function DrumHistory(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <DrumHistoryMini isMini = {false} showBasicInfo={true} />
            </div>
        </div>
    );
}