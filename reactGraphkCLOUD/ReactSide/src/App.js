
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

function App() {
  const client = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/3034/kcloud/v0.0.4',
    cache: new InMemoryCache()
  })

    return (
      <ApolloProvider client={client}>
        <Router>
        <Switch>
          <Route exact from = "/" render ={props => <Registration{...props} />  }/>
          <Route exact path= "/Explorer" render ={props => <Explorer{...props} />  }/>
          <Route exact path= "/Explorer/DrumHistory" render ={props => <DrumHistory{...props} />  }/>
        </Switch>
        </Router>
      </ApolloProvider>
    );
}
export default App;