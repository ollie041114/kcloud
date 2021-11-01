import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '../components/Drawer';
import { useStyles } from '../styling';
import { Charts } from '../components/Chart';
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import SelectDrum from '../components/selectDrum';
import { useEffect } from 'react';
import { getExtendedDrumData } from '../queries/structuredQuery';
import { D3 } from '../components/D3';


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
    name: "Humidity",
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


function Body(props) {
  const [drum, setDrum] = React.useState(null);
  const [extendedDrum, setExtendedDrum] = React.useState(null);
  const [sensorData, setSensorData] = React.useState(null);
  const [update, setUpdate] = React.useState(false);

  const parentCallback = (childData) => {
    setDrum(childData);
  };

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

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <SelectDrum parentCallback={parentCallback} style={{ float: "left", display: "inline", width: "20px" }} />
      {(drum != null) ? (
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }} //, height: 500 
        >

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
                <D3 extendedDrum={extendedDrum} rhtData={extendedDrum.sensorData.humidity} key = {extendedDrum.basicInfo.id} />

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


        </Box>
      ) : (
        <h1>Nothing!</h1>
      )}
    </div>
  );
}


export default function SensorData() {


  const classes = useStyles();
  const { loading, error, data } = useQuery(getBooksQuery);
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