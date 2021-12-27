import React, { Component, useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { getQuery } from "../queries/queries";
import EthereumHandler from '../ethereumSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { SubmitStepButton } from './submitStepButton';
import { Grid } from '@material-ui/core';
import { checkConform } from "./expectedType";
import { Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {useStyles} from '../styling';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
function TemporaryStorage(props) {
  var [typeError, setTypeError] = useState("Ok");
  function submitForm(e, { drum_id, storageUniqueNumber, Longitude, Latitude, startDate, endDate }) {
    e.preventDefault();
    //console.log(e);
    var time = Math.round(+new Date() / 1000);
    var startTime = (Math.floor(startDate / 1000));
    var endTime = (Math.floor(endDate / 1000));
    var storage_schedule = startTime + "finishat:" + endTime;
    var storage_id = storageUniqueNumber;
    const ethereumHandler = new EthereumHandler();

    var longitude = Longitude;
    var latitude = Latitude;
    // NOTE! Here is a signfiicant deviation from the order on the page
    var params = [drum_id, time, storage_id, longitude, latitude, storage_schedule];
    var checkResult = checkConform("temporaryStorage", params);
    if (checkResult == "Ok") {
      setTransactionHash("It was changed!");
      ethereumHandler._temporaryStorage(drum_id, time, longitude, latitude, storage_id, storage_schedule, callbackReceipt);
      return transactionHash;
    }
    else {
      setTypeError(checkResult);
      console.log(typeError);
      return null;
    }
  }

  const callbackReceipt = (childData) => {
    setTransactionReceipt(childData);
  };
  const [drum_id, setDrumId] = useState(props.drumId);
  const classes = useStyles();
  //const [sensor_id, setSensorId] = useState(""); 
  const [time, setTime] = useState(Math.round(+new Date() / 1000));

  const [storageUniqueNumber, setStorageUniqueNumber] = useState();
  const [Longitude, setLongitude] = useState();
  const [Latitude, setLatitude] = useState();
  const [startDate, setStartDate] = useState(+new Date());
  const [endDate, setEndDate] = useState(+new Date());
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionReceipt, setTransactionReceipt] = useState(null);

  function ConditionForButton() {
    if (transactionHash != null && transactionReceipt == null) {
      return true;
    } else {
      return false;
    }
  }
  function CallbackForButton(e) {
    submitForm(e, { drum_id, storageUniqueNumber, Longitude, Latitude, startDate, endDate })
  }
  useEffect(() => {
    if (transactionReceipt != null) {
      props.handleNext();
    }
  }, [transactionReceipt]); // Only re-run the effect if open changes
  return (
    <div style={{ marginBottom: "40px" }}>
      <React.Fragment>
        <Box mt={4}>
          <Typography variant="h5" fontWeight="fontWeightMedium" gutterBottom>
            Temporary Storage: {drum_id}
            <Grid container spacing={2}>
              <form id="package-drum">

                <Grid item xs={12}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Storage id"
                    fullWidth
                    autoComplete="given-name"
                    onChange={(data) => setStorageUniqueNumber(data.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Longitude"
                    fullWidth
                    autoComplete="family-name"
                    onChange={(data) => setLongitude(data.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Latitude"
                    fullWidth
                    autoComplete="family-name"
                    onChange={(data) => setLatitude(data.target.value)}
                  />
                </Grid>
                Transportation Schedule:
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <KeyboardDateTimePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy HH:mm"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start date: "
                        onChange={date => setStartDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />

                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <KeyboardDateTimePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy HH:mm"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start date: "
                        onChange={date => setEndDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />

                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                {/* <div className = "field">
                        <label>Storage schedule: </label>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>Start date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {(e) => setStartDate(new Date(e))} value = {startDate} />
                        </div>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>End date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {(e) => setEndDate(new Date(e))} value = {endDate} />
                        </div>
                    </div> */}

                <SubmitStepButton CallbackForButton={CallbackForButton} ConditionForButton={ConditionForButton} />
                {typeError != "Ok" && transactionHash == null ? (
                  <Box mt={5}>
                    <Typography className={classes.errorMessage}>{typeError}</Typography>
                  </Box>
                ) : (<Typography></Typography>)}
              </form>
            </Grid>
          </Typography>
        </Box>
      </React.Fragment>
    </div>
  );
};

export default TemporaryStorage;