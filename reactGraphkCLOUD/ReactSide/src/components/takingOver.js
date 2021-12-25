import React, { Component, useState, useRef } from 'react';
import { gql, useQuery } from "@apollo/client";
import { getQuery } from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';
import { useEffect } from 'react';
import { SubmitStepButton } from './submitStepButton';
import { StartEndDate } from './StartEndDate';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useStyles } from '../styling';
import { checkConform } from "./expectedType";
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';

function TakingOver(props) {
    const classes = useStyles();
    var [typeError, setTypeError] = useState("Ok");

    const callbackReceipt = (childData) => {
        setTransactionReceipt(childData);
    };

    function submitForm(e, { drum_id, time, acquisition, transferee, startTime, endTime, fileUrl }) {

        e.preventDefault();
        var time = Math.round(+new Date() / 1000);
        var schedule = startTime + "finish at: " + endTime;

        const ethereumHandler = new EthereumHandler();
        // drum_id, time, acquisition, transferee, transportation_schedule, hash_waste_acceptance, fileUrl, globalCallback

        var params = [drum_id, time, acquisition, transferee, schedule, fileUrl];
        var checkResult = checkConform("takingOver", params);
        console.log(transactionHash, typeError);
        if (checkResult == "Ok") {
            setTransactionHash("It was changed!");
            ethereumHandler._takingOver(drum_id, time, acquisition, transferee, schedule, fileUrl, callbackReceipt);
        }
        else {
            setTypeError(checkResult);
            console.log(typeError);
            return null;
        }

        return transactionHash;
    }
    const [drum_id, setDrumId] = useState(props.drumId);
    const [time, setTime] = useState(+new Date() / 1000);

    const [acquisition, setAcquisition] = useState();
    const [transferee, setTransferee] = useState();

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [transactionHash, setTransactionHash] = useState(null);
    const [transactionReceipt, setTransactionReceipt] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

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
        submitForm(e, { drum_id, time, acquisition, transferee, startTime, endTime, fileUrl })
    }
    useEffect(() => {
        if (transactionReceipt != null) {
            props.handleNext();
        }
    }, [transactionReceipt]); // Only re-run the effect if open changes
    useEffect(() => {
        console.log("Drum id in takingOver is " + drum_id);
    }, [drum_id]); // Only re-run the effect if open changes
    function startCallback(data) {
        var date = new Date(data).getTime() / 1000
        setStartTime(date);
    }
    function endCallback(data) {
        var date = new Date(data).getTime() / 1000
        setEndTime(date);
    }

    return (
        <div style={{ marginBottom: "40px" }}>

            <h2>Taking Over</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Acquistion"
                        fullWidth
                        autoComplete="given-name"
                        onChange={(data) => setAcquisition(data.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Transferee"
                        fullWidth
                        autoComplete="given-name"
                        onChange={(data) => setTransferee(data.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <StartEndDate label="Transportation Schedule" startCallback={startCallback} endCallback={endCallback} />
                </Grid>
                <Grid item xs={12}>
                    <SubmitPic parentCallback={handleCallback} />
                </Grid>


            </Grid>
            <SubmitStepButton CallbackForButton={CallbackForButton} ConditionForButton={ConditionForButton} />
            {typeError != "Ok" && transactionHash == null ? (
                <Box mt={5}>
                    <Typography className={classes.errorMessage}>{typeError}</Typography>
                </Box>
            ) : (<Typography></Typography>)}
        </div>
    );
};

export default TakingOver;