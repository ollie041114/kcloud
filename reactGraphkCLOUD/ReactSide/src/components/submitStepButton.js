import { Button } from '@material-ui/core';
import React, {Component, useState} from 'react';
import {useStyles} from '../styling.js';
import { LinearProgress } from '@material-ui/core';
import { Box } from '@material-ui/core';
export function SubmitStepButton(props){

    const classes = useStyles();
    
    return(
        <div>
        <Button
        className={classes.buttonPadding}
        variant="contained"
        color="primary"
        onClick={(e)=> props.CallbackForButton(e)
        }
      >
        {'Submit'}
      </Button>


        {props.ConditionForButton() ? (
        <div>
            <Box mt={2}>
                <LinearProgress />
            </Box>
        </div>
        ) : (
          <h1></h1>  
        ) }
        </div>
    )
}