
import React, {Component} from 'react';

import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// components
import DrumList from './components/DrumList';
import AddDrum from './components/EnrollDrum';
import Packaging from './components/packaging';
import Transit from './components/transit';
import TemporaryStorage from './components/temporaryStorage';
import TakingOver from './components/takingOver';
import Sidebar from './components/Sidebar';
// import Sidebar from './components/Sidebar';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/3034/kcloud/v0.0.4',
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id = "main" className="App" style={{display: "inline"}}>
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
      </ApolloProvider>
    );
  }
}
export default App;