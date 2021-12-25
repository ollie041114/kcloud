import React, { Component, useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { getQuery } from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';
import { useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { SubmitStepButton } from './submitStepButton';
import { StartEndDate } from './StartEndDate';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { checkConform } from "./expectedType";
import { useStyles } from '../styling';
import { Box } from '@material-ui/core';


function Transit(props) {
    const classes = useStyles();
    var [typeError, setTypeError] = useState("Ok");
    const callbackReceipt = (childData) => {
        setTransactionReceipt(childData);
    };
    var unixInSeconds = Math.round(+new Date() / 1000);
    const [drum_id, setDrumId] = useState(props.drumId);
    //const [sensor_id, setSensorId] = useState(""); 
    const [carrier, setCarrier] = useState(null);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [transactionHash, setTransactionHash] = useState(null);
    const [transactionReceipt, setTransactionReceipt] = useState(null);

    function submitForm(e, { drum_id, carrier, startTime, endTime }) {
        //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
        e.preventDefault();
        var transportation_schedule = startTime + "finishes at: " + endTime;
        var time = Math.round(+new Date() / 1000);
        const ethereumHandler = new EthereumHandler();
        console.log(carrier);
        var params = [drum_id, time, carrier, transportation_schedule];
        var checkResult = checkConform("transit", params);
        console.log(transactionHash, typeError);
        if (checkResult == "Ok") {
            setTransactionHash("It was changed!");
            ethereumHandler._transit(drum_id, time, carrier, transportation_schedule, callbackReceipt); return transactionHash;
        }
        else {
            setTypeError(checkResult);
            console.log(typeError);
            return null;
        }

        return transactionHash;
    }



    function startCallback(data) {
        var date = new Date(data).getTime() / 1000
        setStartTime(date);
    }
    function endCallback(data) {
        var date = new Date(data).getTime() / 1000
        setEndTime(date);
    }
    function ConditionForButton() {
        if (transactionHash != null && transactionReceipt == null) {
            return true;
        } else {
            return false;
        }
    }
    function CallbackForButton(e) {
        (submitForm(e, { drum_id, carrier, startTime, endTime }))
    }
    useEffect(() => {
        if (transactionReceipt != null) {
            props.handleNext();
        }
    }, [transactionReceipt]); // Only re-run the effect if open changes
    useEffect(() => {
        console.log(startTime);
    }, [startTime]); // Only re-run the effect if open changes

    return (
        <div style={{ marginBottom: "40px" }}>
            <Typography variant="h5" fontWeight="fontWeightMedium" gutterBottom>
                Transit: {drum_id}
            </Typography>
            <form id="package-drum">

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Carrier"
                            fullWidth
                            autoComplete="given-name"
                            onChange={(data) => setCarrier(data.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StartEndDate startCallback={startCallback} endCallback={endCallback} label="Transportation Schedule" />
                    </Grid>
                </Grid>

                <SubmitStepButton CallbackForButton={CallbackForButton} ConditionForButton={ConditionForButton} />
                
                {typeError != "Ok" && transactionHash == null ? (
                    <Box mt={5}>
                        <Typography className={classes.errorMessage}>{typeError}</Typography>
                    </Box>
                ) : (<Typography></Typography>)}
            </form>
        </div>
    );
};

export default Transit;