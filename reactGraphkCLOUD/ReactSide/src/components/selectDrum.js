import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../styling';
import { getBooksQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import {updateTime} from './updateTime.js'

let count = 0;
export default function SelectDrum(props) {
  
  
    const classes = useStyles();
    const [drum, setDrum] = useState(props.defaultDrum);
    console.log("Default drum is ", drum);
    const handleChange = (event) => {
      props.parentCallback(event.target.value);
      setDrum(event.target.value);
    };


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
    return(
      <Box>

    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">Drum #</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={drum}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data.drums.map(drum => {
        return(
            <MenuItem value={drum}>{drum.id}</MenuItem>
        );})
        }
      </Select>
    </FormControl>
    </Box>
    );
}


