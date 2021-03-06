import React, { Component, useState, useRef } from 'react';

import EthereumHandler from '../ethereumSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import { useEffect } from 'react';
import { SubmitStepButton } from './submitStepButton';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { useStyles } from '../styling';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { checkConform } from "./expectedType";

//submitPic = new SubmitPic();
function Packaging(props) {
  const classes = useStyles();
  var [typeError, setTypeError] = useState("Ok");
  const callbackReceipt = (childData) => {
    setTransactionReceipt(childData);
  };

  function submitForm(e, { drum_id, classification, w_type,
    place_of_occurence, date_of_occurence, dose_rate, pollution_level, selectedDate, fileUrl }) {
    //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
    e.preventDefault();
    //console.log(e);
    console.log(classification);
    var date_of_occurence_in_unix = (Math.floor(date_of_occurence.getTime() / 1000));
    var time = Math.round(+new Date() / 1000);
    const ethereumHandler = new EthereumHandler();
    console.log(fileUrl);
    var params = [drum_id, time, classification, w_type, date_of_occurence_in_unix, place_of_occurence, dose_rate, fileUrl, callbackReceipt];
    var checkResult = checkConform("packaging", params);
    if (checkResult == "Ok") {
      setTransactionHash("It was changed!");
      ethereumHandler._packaging(drum_id, time, classification, w_type, date_of_occurence_in_unix, place_of_occurence, dose_rate, pollution_level, fileUrl, callbackReceipt);
      return transactionHash;
    }
    else {
      setTypeError(checkResult);
      console.log(typeError);
      return null;
    }
  }

  var unixInSeconds = Math.round(+new Date() / 1000);
  const [drum_id, setDrumId] = useState(props.drumId);
  const [classification, setClassification] = useState();
  const [w_type, setWType] = useState();
  const [place_of_occurence, setPlace] = useState();
  const [date_of_occurence, setDate] = useState(new Date());
  const [dose_rate, setDoseRate] = useState();
  const [pollution_level, setPollutionLevel] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [fileUrl, setFileUrl] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionReceipt, setTransactionReceipt] = useState(null);
  const pic = useRef();

  function handleCallback(childData) {
    setFileUrl(childData)
  }

  function ConditionForButton() {
    if (transactionHash != null && transactionReceipt == null) {
      return true;
    } else {
      return false;
    }
  }
  function CallbackForButton(e) {
    (submitForm(e, {
      drum_id, classification, w_type,
      place_of_occurence, date_of_occurence, dose_rate, pollution_level, selectedDate, fileUrl
    }))
  }
  useEffect(() => {
    if (transactionReceipt != null) {
      props.handleNext();
    }
  }, [transactionReceipt]); // Only re-run the effect if open changes
  useEffect(() => {
    console.log("In packaging, file Url is " + fileUrl);
  }, [fileUrl]); // Only re-run the effect if open changes

  return (
    <div style={{ marginBottom: "40px" }}>
      <React.Fragment>
        <Box mt={4}>
          {(drum_id !== undefined) ? (
            <Typography variant="h5" fontWeight="fontWeightMedium" gutterBottom>
              Packaging: {drum_id}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Classification</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={classification}
                      onChange={(data) => setClassification(data.target.value)}
                      label="Classification"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"General Dry Active Waste"}>General Dry Active Waste</MenuItem>
                      <MenuItem value={"Shielded Dry Active Waste"}>Shielded Dry Active Waste</MenuItem>
                      <MenuItem value={"Concentrate Waste"}>Concentrate Waste</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl variant="standard" sx={{ m: 0, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Sub-classification (Type)</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={classification}
                      onChange={(data) => setWType(data.target.value)}
                      label="Classification"
                    >
                      <MenuItem value={w_type}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Combustible"}>Combustible</MenuItem>
                      <MenuItem value={"Non-combustible"}>Non-combustible</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Place of Occurence"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={(data) => setPlace(data.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Radioactive Concentration (Bq/g)"
                    fullWidth
                    autoComplete="shipping address-level2"
                    onChange={(data) => setDoseRate(data.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Pollution level (CPM)"
                    fullWidth
                    autoComplete="shipping address-level2"
                    onChange={(data) => setPollutionLevel(data.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date of occurence"
                        onChange={date => setSelectedDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />

                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <SubmitPic parentCallback={handleCallback} />
              <SubmitStepButton CallbackForButton={CallbackForButton} ConditionForButton={ConditionForButton} />

            </Typography>) :
            (
              <Typography variant="h5" fontWeight="fontWeightMedium" gutterBottom>
                Please select a drum
              </Typography>
            )}
          {typeError != "Ok" && transactionHash == null ? (
            <Box mt={5}>
              <Typography className={classes.errorMessage}>{typeError}</Typography>
            </Box>
          ) : (<Typography></Typography>)}
        </Box>


      </React.Fragment>


      {/* <button onClick={(e)=>
                        (submitForm(e, {drum_id, classification, w_type, 
                        place_of_occurence, date_of_occurence, dose_rate, selectedDate, fileUrl}))
                    }>+</button> */}

    </div>
  );
};

export default Packaging;