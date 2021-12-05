import React, { Component, useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { getQuery } from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useStyles } from '../styling.js'
import { Box } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { checkConform } from "./expectedType";
import { getBooksQuery } from "../queries/queries";

function drumExists(data, myId) {
  console.log(data.drums);
  for (const item of data.drums) {
    if (item.id == myId) {
      console.log("Such drum exists!");
      return true;
    } 
  }
  return false;
}
function GetTemporaryStorages() {

  const { loading, error, data } = useQuery(getQuery);
  const classes = useStyles();
  if (loading) return (<option disabled>Loading temporary storages...</option>);
  if (error) return (<p>Error...</p>);
  console.log(data.temporaryStorageDatas[0])
  return data.temporaryStorageDatas.map(temporaryStorageData => {
    return (<option key={temporaryStorageData.id} value={temporaryStorageData.id}>{temporaryStorageData.drum.drum.place_of_occurence}</option>)
  })
}

function EnrollDrum() {
  // Load the GraphQL data


  var [typeError, setTypeError] = useState("Ok");

  const classes = useStyles();

  const callbackReceipt = (childData) => {
    setTransactionReceipt(childData);
  };

  async function submitForm(e, { drum_id, sensor_id, time }) {
    console.log(drumExists(data, drum_id));
    //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
    e.preventDefault();
    if (drum_id != null) {

      if (drumExists(data, drum_id) == true) {
        setTypeError("Drum with this id already exists!");
        console.log(typeError, transactionHash);
        return null;
      }
    }
    console.log(e);
    var time = Math.round(+new Date() / 1000);
    const ethereumHandler = new EthereumHandler();

    // Do the type checking
    var params = [drum_id, time, sensor_id];
    var checkResult = checkConform("enrollment", params);
    console.log(checkResult);
    if (checkResult == "Ok") {
      setTransactionHash("It changed!");

      ethereumHandler._enrollment(drum_id, time, sensor_id, callbackReceipt);
      return transactionHash;
    }
    else {
      setTypeError(checkResult);
      return null;
    }
  }
  var unixInSeconds = Math.round(+new Date() / 1000);
  const [drum_id, setDrumId] = useState(null);
  const [sensor_id, setSensorId] = useState(null);
  const [time, setTime] = useState(Math.round(+new Date() / 1000));
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionReceipt, setTransactionReceipt] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return (<option disabled>Loading...</option>);
  if (error) return (<p>Error...</p>);
  return (
    <div style={{ marginBottom: "40px" }}>
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
            onChange={(e) =>
              setDrumId(e.target.value)
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
            onChange={(e) =>
              setSensorId(e.target.value)
            }
          />
        </Grid>
      </Grid>

      {transactionHash != null && transactionReceipt == null ? (
        <div>
          <Box mt={3}>
            <CircularProgress color="secondary" />
          </Box>
        </div>
      ) : (
        <Box mt={5}>
          <Button
            className={classes.buttonPadding}
            variant="contained"
            color="primary"
            onClick={async (e) => {
              var result = await (submitForm(e, { drum_id, sensor_id, time }));
              if (result != null) {
                console.log("Result is" + result);
                setTransactionHash(result);
              };
              console.log(transactionHash);
              console.log(transactionReceipt);
            }
            }
          >
            {'Submit'}
          </Button>
        </Box>
      )}

      {typeError != "Ok" && transactionHash == null ? (
        <Box mt={5}>
          <Typography className={classes.errorMessage}>{typeError}</Typography>
        </Box>
      ) : (<Typography></Typography>)}
    </div>
  );
};

export default EnrollDrum;