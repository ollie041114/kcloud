import { React, Component } from "react";
import {useState, useRef, useEffect} from 'react';
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import {Box} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useStyles } from "../styling";


export function StartEndDate(props){
    const classes = useStyles();
// Create an instance of the client
    const [fileUrl, updateFileUrl] = useState("");

    return(
        <Box mb = {8}> 
        <Box mt = {1} mb = {3}>
        <Typography variant = "body1">
        {props.label}                          
        </Typography> 
    
    </Box> 
  <Grid container spacing = {4}>
    
    <Grid item xs={12}>
        <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            defaultValue="2021-09-12T10:30"
            className={classes.textField}
            onChange={data => props.startCallback(data.target.value)}
            InputLabelProps={{
            shrink: true,
            }}
        />
    </Grid>

    <Grid item xs={12}>
        <TextField
            id="datetime-local"
            label="End Date"
            type="datetime-local"
            defaultValue="2021-09-12T10:30"
            className={classes.textField}
            onChange={data => props.endCallback(data.target.value)}
            InputLabelProps={{
            shrink: true,
            }}
        />
    </Grid>

    </Grid>
    </Box>
            );
    }