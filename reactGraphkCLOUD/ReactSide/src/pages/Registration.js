import React, {Component} from 'react';

import '../App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// components
import DrumList from '../components/DrumList';
import AddDrum from '../components/EnrollDrum';
import Packaging from '../components/packaging';
import Transit from '../components/transit';
import TemporaryStorage from '../components/temporaryStorage';
import TakingOver from '../components/takingOver';
import Sidebar from '../components/Sidebar';
import Drawer from "../Drawer";
import { useStyles } from '../styling';
import { useTheme } from '@material-ui/core';
// import Sidebar from './components/Sidebar';
import { useHistory } from "react-router";


function Registration() {
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Drawer></Drawer>
        
        <div className={classes.content}>
        <div className={classes.toolbar} />
          <div style={{display: "inline", float: "left"}}>
              <h1>My Radioactive Drums</h1>
              <DrumList/>
          </div>

          <div style={{display: "inline", float: "right"}}>
              <h1>Register new drum</h1>
              <AddDrum/>
              <Packaging/>
              <Transit />
              <TemporaryStorage />
              <TakingOver />
          </div>

        </div>
        </div>
    );
  }
export default Registration;