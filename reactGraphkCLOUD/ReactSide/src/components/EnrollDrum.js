import React, {Component, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import {useStyles} from '../styling.js'
import { Box } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";



function GetTemporaryStorages() {
    
    const {loading, error, data} = useQuery(getQuery);
    const classes = useStyles();
    if (loading) return (<option disabled>Loading temporary storages...</option>);
    if (error) return (<p>Error...</p>);
    console.log(data.temporaryStorageDatas[0])
    return data.temporaryStorageDatas.map(temporaryStorageData => {
        return(<option key={temporaryStorageData.id} value = {temporaryStorageData.id}>{temporaryStorageData.drum.drum.place_of_occurence}</option>)
    })
}

function EnrollDrum() {
    const classes = useStyles();
    const callbackReceipt = (childData) => {
        setTransactionReceipt(childData);
      };

    async function submitForm(e, {drum_id, sensor_id, time}){
        
        //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
        e.preventDefault();
        //console.log(e);
        var time = Math.round(+new Date()/1000);
        const ethereumHandler = new EthereumHandler();
        ethereumHandler._enrollment(drum_id.drum_id, time, sensor_id.sensor_id, callbackReceipt);
        return transactionHash;
    }
        var unixInSeconds = Math.round(+new Date()/1000);
        const [drum_id, setDrumId] = useState("");
        const [sensor_id, setSensorId] = useState(""); 
        const [time, setTime] = useState(Math.round(+new Date()/1000));
        const [transactionHash, setTransactionHash] = useState("Oh my goodness");
        const [transactionReceipt, setTransactionReceipt] = useState(null);

        return(
            <div style = {{marginBottom: "40px"}}>
           <Typography variant="h5" fontWeight="fontWeightMedium" gutterBottom>
             Enrollment
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Drum id"
            fullWidth
            autoComplete="given-name"
            onChange={(e)=>
                setDrumId({drum_id: e.target.value})
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Sensor id"
            fullWidth
            autoComplete="given-name"
            onChange={(e)=>
                setSensorId({sensor_id: e.target.value})
            }
          />
        </Grid>
            </Grid>

                {transactionHash != "Oh my goodness" && transactionReceipt == null ? (
                <div>
                    <Box mt = {3}>
                <CircularProgress color="secondary" />
                     </Box>
              </div>
                ) : (
                    <Box mt = {5}>
                    <Button
                    className={classes.buttonPadding}
                    variant="contained"
                    color="primary"
                    onClick={(e)=>
                        setTransactionHash(submitForm(e, {drum_id, sensor_id, time}))
                    }
                  >
                    {'Submit'}
                  </Button>
                  </Box>
                ) } 
            </div>
        );
};

export default EnrollDrum;