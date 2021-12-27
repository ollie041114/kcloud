import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '../components/Drawer';
import { useStyles } from '../styling';
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import SelectDrum from '../components/selectDrum';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { getExtendedDrumData } from '../queries/structuredQuery';
import { D3 } from '../components/D3';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import {updateTime} from '../components/updateTime.js';

function CollapsableAlarm(props){
  var drum = props.drum;
   const [open, setOpen] = React.useState(true);
  return <Box sx={{ width: '100%' }}>
  <Collapse in={open}>
    <Alert severity="error"
      action={
        <IconButton
          aria-label="delete"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {props.text}
    </Alert>
  </Collapse>
</Box>
}
function AlarmHandler(drum){
    console.log(drum);
    return drum.sensorData.map((datum)=>{
      console.log("Datum is");
      console.log(datum);
      var tDate = new Date(datum.tAlarm.sensorDatum.time_recorded*1000);
      var aDate = new Date(datum.aAlarm.sensorDatum.time_recorded*1000);
      var rDate = new Date(datum.rAlarm.sensorDatum.time_recorded*1000);
      var aDateStr = "Acceleration is in danger: " + aDate.toString();
      var rDateStr = "Radioactivity is in danger: " + rDate.toString();
      var tDateStr = "Temperature is in danger: " + tDate.toString();
      if (datum.tAlarm.message == "Danger"){
        console.log("DANGEROUS!");
        return (<CollapsableAlarm drum = {drum} text={tDateStr}/>);
      }
      if (datum.aAlarm.message == "Danger"){
        return (<CollapsableAlarm drum = {drum} text={aDateStr}/>);
      }
      if (datum.rAlarm.message == "Danger"){
        return (<CollapsableAlarm drum = {drum} text={rDateStr}/>);
      }
    })}
const mapping = [
  {
    name: "Temperature",
    value: 0
  },
  {
    name: "Radioactvitiy",
    value: 1
  },
  {
    name: "Acceleration",
    value: 2
  }
];


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function getData(extendedDrum) {
  var sensorData = extendedDrum.sensorData
  // Create random array of objects
  let mini_data = [];
  for (var i = 0; i < sensorData.radio.length; i++) {
    mini_data.push({
      label: sensorData.radio[i],
      value: sensorData.radio[i],
      time: new Date(sensorData.time_recorded[i] * 1000)
    });
  }

  let data = {
    title: 'Sensor ' + extendedDrum.basicInfo.id,
    data: mini_data
  };
  return data;
}

function IfNotNull(locationstate){
  if (typeof (locationstate)!="undefined"){
    return locationstate.drumsy;
  }else{
    return null;
  }
}
function Body(props) {
  const classes = useStyles();
  const location = useLocation();


  const [drum, setDrum] = React.useState(null);
  const [extendedDrum, setExtendedDrum] = React.useState(null);
  const [sensorData, setSensorData] = React.useState(null);

  const [update, setUpdate] = React.useState(false);
  useEffect(() => {
    if (location.pathname == "/SensorData") {
        console.log(location);
        if (typeof location.state!== "undefined")
{        setDrum(location.state.drumsy);
        console.log(location.state.drumsy);
        console.log(location.pathname);
        console.log(location.search);
        console.log(typeof location.state.drumsy);}

        // if (typeof location.state.drumsy !== "undefined") {
        //     itemsList = getExtendedDrumData(location.state.drumsy).fullDrumHistory;
        // }
    }
    else if (props.drum != null) {
        setDrum(props.drum);
        // isMini = true;
        console.log("I am not null!")
        console.log(props.drum)
        setDrum(props.drum);
        // if (typeof props.drum !== "undefined") {
        //     itemsList = getExtendedDrumData(props.drum).fullDrumHistory;
        // }
    }
}, [location]);

  const parentCallback = (childData) => {
    setDrum(childData);
  };
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
  useEffect(() => {
    var extendedDrum;
    if (drum != null) {
      extendedDrum = getExtendedDrumData(drum);
      setExtendedDrum(extendedDrum);
      setSensorData(getData(extendedDrum));
    }

  }, [drum]);

  useEffect(() => {
    setUpdate(true);
  }, [sensorData]);
  useEffect(() => {
    setUpdate(true);
  }, [drum]);

  const [value, setValue] = React.useState(0);

  // const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <SelectDrum defaultDrum = {IfNotNull(location.state)} parentCallback={parentCallback} style={{ float: "left", display: "inline", width: "20px" }} />
      {(drum != null) ? (
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }} //, height: 500 
        >

        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label={mapping[0].name} {...a11yProps(mapping[0].value)} />
            <Tab label={mapping[1].name} {...a11yProps(mapping[1].value)} />
            <Tab label={mapping[2].name} {...a11yProps(mapping[2].value)} />

          </Tabs>
          <TabPanel value={value} index={mapping[0].value}>
            {(sensorData != null) ?
              (
                <D3 extendedDrum={extendedDrum} rhtData={extendedDrum.sensorData.temp} key = {extendedDrum.basicInfo.id}/>
              ) : (
                <h1>Loading!</h1>
              )
            }
          </TabPanel>
          <TabPanel value={value} index={mapping[1].value}>
            {(sensorData != null) ?
              (
                <D3 extendedDrum={extendedDrum} rhtData={extendedDrum.sensorData.radio} key = {extendedDrum.basicInfo.id} />
              ) : (
                <h1>Loading!</h1>
              )
            }
          </TabPanel>
          <TabPanel value={value} index={mapping[2].value}>
            {(sensorData != null) ?
              (
                <D3 extendedDrum={extendedDrum} rhtData={extendedDrum.sensorData.acceleration} key = {extendedDrum.basicInfo.id} />

              ) : (
                <h1>Loading!</h1>
              )
            }
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>

          <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'inline' }} //, height: 500 
        >
          {AlarmHandler(drum)}
          </Box>
        </Box>
      ) : (
        <h1>Nothing!</h1>
      )}
    </div>
  );
}


export default function SensorData() {


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

  return (
    <div className={classes.root}>
      <Drawer></Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Body data={data} /> 
      </div>
    </div>
  );
}