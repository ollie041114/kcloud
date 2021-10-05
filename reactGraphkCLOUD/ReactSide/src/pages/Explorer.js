import React, {Component} from 'react';
import App from "../App";
import {gql, useQuery} from "@apollo/client";
import { getBooksQuery} from "../queries/queries";
import { useStyles } from '../styling';
import Drawer from '../components/Drawer';
import { useHistory } from 'react-router';
import { DrumCard } from '../components/_DrumCards';




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



function Oncl(event, history, drum){
    event.preventDefault();
    history.push({
        pathname: '/Explorer/DrumHistory',
        search: drum.id.toString(),
        state: { drumsy: drum }
      });
}

function ExchangeRates() {
        const { loading, error, data } = useQuery(getBooksQuery);      
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return data.drums.map(drum => {
            return(
                <DrumCard drum = {drum} onClick = {Oncl}></DrumCard>
            )
        });
}

function Explorer(){
    const classes = useStyles(); 
        return (
            <div className={classes.root}>
                <Drawer></Drawer>
            <div className={classes.content}>
            <div className={classes.toolbar} />
                {ExchangeRates()}
            </div>
            </div>
        );
}

//Bind together the query with the component
export default withRouter(Explorer);