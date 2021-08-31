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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styling';
import { Drawer } from '@material-ui/core';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import BrandingWatermarkTwoToneIcon from '@material-ui/icons/BrandingWatermarkTwoTone';
import PanToolTwoToneIcon from '@material-ui/icons/PanToolTwoTone';
import TimelapseTwoToneIcon from '@material-ui/icons/TimelapseTwoTone';
import FeaturedVideoTwoToneIcon from '@material-ui/icons/FeaturedVideoTwoTone';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';


var itemsList = [{
            text: "Enrolled",
            icon: <BrandingWatermarkTwoToneIcon />,
            color: "grey"
        }, {
            text: "Packaged",
            icon: <FeaturedVideoTwoToneIcon />,
            color: "grey"},
        {
            text: 'In Transit',
            icon: <AirportShuttleIcon />,
            color: "grey"
        }, {
            text: 'Taken Over',
            icon: <PanToolTwoToneIcon />,
            color: "grey", 
            text: 'In Temporary Storage',
            icon: <TimelapseTwoToneIcon />,
            color: "grey"
        }];
export default function DrumHistory(props) {


    function getItemsList(drum) {

        var packagingData;
        var inTransitData; 
        var takingOverData;
        var temporaryStorageData;
        var history = drum.drumHistory[0];
        var missing_label = "not yet available";
        if (history.packagingData) {packagingData = history.packagingData} else {
            packagingData = {
                classification: missing_label, 
                date_unix: missing_label,
                place_of_occurence: missing_label,
                type: missing_label, 
                wasteAcceptanceRequest: missing_label
            }
        };
        if (history.inTransitData) {inTransitData = history.inTransitData} else {
            inTransitData = {carrier: missing_label, 
            transportation_schedule: missing_label,
            status: missing_label,
            type: missing_label
        }
        };
        if (history.takingOverData) {takingOverData = history.takingOverData} {
            takingOverData = {
                acquisition: missing_label, 
                transferee: missing_label,
                transportation_schedule: missing_label,
                wasteAcceptanceRequest: missing_label
            }
        };
        if (history.temporaryStorageData) {temporaryStorageData = history.temporaryStorageData} {
            temporaryStorageData = {
                storage_id: missing_label, 
                longitude: missing_label,
                latitude: missing_label,
                storage_schedule: missing_label
            };
        };
        
        var itemsList = [{
            text: "Enrolled",
            icon: <BrandingWatermarkTwoToneIcon />,
            color: "grey",
            data: {
                id: drum.id, 
                sensorId: 5
            }
        }, {
            text: "Packaged",
            icon: <FeaturedVideoTwoToneIcon />,
            color: "grey",
            data: {
                classification: packagingData.classification, 
                date_unix: packagingData.date_unix,
                place_of_occurence: packagingData.place_of_occurence,
                type: packagingData.type, 
                wasteAcceptanceRequest: packagingData.wasteAcceptanceRequest
            }
        }, {
            text: 'In Transit',
            icon: <AirportShuttleIcon />,
            color: "grey",
            data: {
                carrier: inTransitData.carrier, 
                transportation_schedule: inTransitData.transportation_schedule,
                status: inTransitData.status,
                type: inTransitData.type
            }
        }, {
            text: 'Taken Over',
            icon: <PanToolTwoToneIcon />,
            color: "grey",
            data: {
                acquisition: takingOverData.acquisition, 
                transferee: takingOverData.transferee,
                transportation_schedule: takingOverData.transportation_schedule,
                wasteAcceptanceRequest: takingOverData.wasteAcceptanceRequest
            }
        }, {
            text: 'In Temporary Storage',
            icon: <TimelapseTwoToneIcon />,
            color: "grey",
            data: {
                storage_id: temporaryStorageData.storage_id, 
                longitude: temporaryStorageData.longitude,
                latitude: temporaryStorageData.latitude,
                storage_schedule: temporaryStorageData.storage_schedule
            }
        }];
        return itemsList;
}





  const [drum, setDrum] = useState(0);
  const classes = useStyles();
  //const drum = props.state.drum;
  const location = useLocation();
  useEffect(() => {
    setDrum(location.state.drumsy);
    console.log(location.state.drumsy);
    // var list = getItemsList(location.state.drumsy);
    // console.log("list is"+ list);
    // console.log("Drum is"+ drum.id);
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(typeof location.state.drumsy);
    console.log(location.state.drumsy.drumHistory[0].packagingData.classification);
    if(typeof location.state.drumsy !== "undefined"){
        itemsList = getItemsList(location.state.drumsy);
    }
 }, [location]); 

 console.log("dummy is"+drum);
  return (

      <div className = {classes.root}>
          <Drawer>
          </Drawer>
          <div className = {classes.content}>
          <div className={classes.toolbar} />
          
            <Timeline align="left">   
            {
            itemsList.map((item, index) => {
                var out = '';
                for (var p in item.data) {
                    out += p + ': ' + item.data[p] + '\n';
                  }
                var {text, icon, color, data} = item;
                
                if (drum.currentStatus == text){
                    color = "primary"
                }
                return (

            <TimelineItem>
                <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                {drum.id}
                </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>


                <TimelineDot color = {color}>
                    {icon}
                </TimelineDot>


                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                    {text}
                    </Typography>
                    
                    <Typography>{out}</Typography>
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