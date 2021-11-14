
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

function App() {
  const client = new ApolloClient({
    //uri: 'https://api.thegraph.com/subgraphs/name/ollie041114/kcloud',
    uri: 'http://localhost:8000/subgraphs/name/ollie041114/Kcloud',
    cache: new InMemoryCache()
  })

    return (
      <ApolloProvider client={client}>
        <Router>
        <Switch>
          <Route exact from = "/" render ={props => <Registration{...props} />  }/>
          <Route exact path= "/Explorer" render ={props => <Explorer{...props} />  }/>
          <Route exact path= "/Explorer/DrumHistory" render ={props => <DrumHistory{...props} />  }/>
          <Route exact path= "/GoogleMaps" render ={props => <GoogleMaps{...props} />  }/>
          <Route exact path= "/SensorData" render ={props => <SensorData{...props} />  }/>
        </Switch>
        </Router>
      </ApolloProvider>
    );
}
export default App;