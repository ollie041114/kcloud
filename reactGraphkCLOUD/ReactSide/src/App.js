
import {React, Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Explorer from './pages/Explorer';
import { useHistory } from 'react-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Registration from './pages/Registration';
import DrumHistory from './pages/DrumHistory';
import GoogleMaps from './pages/GoogleMaps';
import SensorData from './pages/SensorData';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paths from './components/Paths';
import { getBooksQuery } from "./queries/queries";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useStyles } from './styling';

function App() {
  const classes = useStyles();
  const [node, setNode] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (event) => {
    setNode(event.target.value);
  };

  var [signIn, setSignin] = useState(false);
  
  function onSubmit() {
    if (node=="Node 1" && password=="Node 1"){
      setSignin(true);      
    }
    if (node=="Node 2" && password=="Node 2"){
      setSignin(true);
    }
    if (node=="Node 3" && password=="Node 3"){
      setSignin(true);
    }
    if (node=="Node 4" && password=="Node 4"){
      setSignin(true);
    }
    if (node=="Node 5" && password=="Node 5"){
      setSignin(true);
    }
    localStorage.setItem('state', JSON.stringify(node));
    // console.log(myStr);
  };
  
  const client = new ApolloClient({
    //uri: 'https://api.thegraph.com/subgraphs/name/ollie041114/kcloud',
    uri: 'http://localhost:8000/subgraphs/name/ollie041114/Kcloud',
    cache: new InMemoryCache()
  })

    return (
      // {(sensorData != null) ?
      //   (
      //     <D3 extendedDrum={extendedDrum} rhtData={extendedDrum.sensorData.temp} key = {extendedDrum.basicInfo.id}/>
      //   ) : (
      //     <h1>Loading!</h1>
      //   )
      // }
      <ApolloProvider client={client}>
        {(signIn == true) ? (<Router>
        <Switch>
          <Route exact from = "/" render ={props => <Registration{...props} />  }/>
          <Route exact path= "/Explorer" render ={props => <Explorer{...props} />  }/>
          <Route exact path= "/Explorer/DrumHistory" render ={props => <DrumHistory{...props} />  }/>
          <Route exact path= "/GoogleMaps" render ={props => <GoogleMaps{...props} />  }/>
          <Route exact path= "/SensorData" render ={props => <SensorData{...props} />  }/>
          <Route exact path= "/PathMonitor" render ={props => <Paths{...props} /> }/>
          </Switch>
        </Router>) : 


(<Box sx={{ minWidth: 120 }} class={classes.putRegistrationToCenter}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Node</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={node}
          label="Node"
          onChange={handleChange}
        >
          <MenuItem value={"Node 1"}>Node 1</MenuItem>
          <MenuItem value={"Node 2"}>Node 2</MenuItem>
          <MenuItem value={"Node 3"}>Node 3</MenuItem>
          <MenuItem value={"Node 4"}>Node 4</MenuItem>
          <MenuItem value={"Node 5"}>Node 5</MenuItem>
        </Select>
      </FormControl>
      <TextField id="standard-basic" label="Password" variant="standard" onChange={(data) => setPassword(data.target.value)}/>
      <Button variant="contained" disableElevation onClick={onSubmit}>
      Submit
    </Button>
    </Box>)
          }
      </ApolloProvider>
    );
}
export default App;