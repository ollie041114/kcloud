import React from 'react';

import {Route} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Registration from './pages/Registration';
import Explorer from './pages/Explorer';

export const withRouter = (Component) => {
    const Wrapper = (props) => {
      const history = useHistory();
      
      return (
        <Component
          history={history}
          {...props}
          />
      );
    };
    
    return Wrapper;
  };



export const RegistrationRoute = '/';
export const ExplorerRoute = '/Explorer';
export const DrumHistoryRoute = '/Explorer/DrumHistory';
class Routing extends React.Component {
    render() {
        return (
                    <Route path = {RegistrationRoute} exact component = {Registration} />   
                   
        );
    }
}

export default withRouter(Routing);