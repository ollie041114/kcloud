import React, {Component} from 'react';

import '../App.css';
// components
import Packaging from '../components/packaging';
import Transit from '../components/transit';
import TemporaryStorage from '../components/temporaryStorage';
import TakingOver from '../components/takingOver';
import Sidebar from '../components/Sidebar';
import Drawer from "../components/Drawer";
import { useStyles } from '../styling';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from '@material-ui/core';
// import Sidebar from './components/Sidebar';
import { useHistory } from "react-router";
import SelectDrum from '../components/selectDrum';
import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';


var StatusArray = ["Enrolled", "Packaged", "In Transit", "Taken Over", "In Temporary Storage"]
var NameArray = ["Packaging", "Transit", "Taking Over", "Temporary Storage"]
function getSteps() {
  return NameArray;
}

var activeDrum = "12342222121233";

function GetStepContent(props) {
  var step = props.step;
  var drum = props.drum;
  switch (step) {
    case 0:
       console.log("Here, case was"+step);
       return <Packaging drumId = {drum.id} key = {drum.id + "2"} handleNext = {props.handleNext}/>;
    case 1:
        console.log("Here, case was"+step);
        return <Transit drumId  = {drum.id} key = {drum.id+"2"} handleNext = {props.handleNext}/>;
    case 2:
        console.log("Here, case was"+step);
        return <TakingOver drumId = {drum.id} key = {drum.id+"4"} handleNext = {props.handleNext}/>;
    case 3:
        console.log("Here, case was"+step);
        return <TemporaryStorage drumId = {drum.id} key = {drum.id+"3"} handleNext = {props.handleNext}/>;
    case 4:
        console.log("Here, case was"+step);
        return <p>This drum is fully registered</p>;
    default:
        return 'Unknown step';
  }
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function AddData() {
  const [drum, setDrum] = React.useState('');
  const [initialStep, setInitialStep] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  function complicatedSetActiveStep(drum){
    var mystep = 0;
    for (var i = 0; i < StatusArray.length; i++){
      if (StatusArray[i] == drum.currentStatus){
        mystep = i;
      }
    }
    setActiveStep(mystep, () => console.log("Global state here is "+ activeStep));
    setInitialStep(mystep);
    console.log("Drum id is"+drum.id);
    console.log("Complicated step is " + mystep);

  }

  const parentCallback = (childData) => {
    setDrum(childData);
  };

  const classes = useStyles();
  
  useEffect(() => {
    complicatedSetActiveStep(drum);
  }, [drum]);

  const forceUpdate = useForceUpdate();
  useEffect(() => {
    forceUpdate();
    console.log("Now the value of it is "+activeStep);
  }, [activeStep]);

    return (
        <div className={classes.root}>
        <div className={classes.content} style = {{width: '400px'}}>
        <div className={classes.toolbar} />

          <div>
              <Box mb = {4}>
                  <div>
                  <Box>
                <SelectDrum parentCallback = {parentCallback} style = {{float: "left", display: "inline"}}/>
                </Box>
                </div>
              </Box>             
              
              <div className>


      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

    
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h4" gutterBottom component="div">
              All steps completed - you&apos;re finished
            </Typography>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {<GetStepContent step = {activeStep} drum = {drum} handleNext = {handleNext}/>}
              </Typography>
            <div>
              {/* <Button disabled={activeStep === initialStep} onClick={handleBack} className={classes.button}>
                Back
              </Button> */}
              {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */}

              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
          </div>
        </div>
        </div>
    );
  }
export default AddData;