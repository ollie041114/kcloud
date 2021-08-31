import React, {Component} from 'react';
import App from "../App";
import {gql, useQuery} from "@apollo/client";
import { getBooksQuery} from "../queries/queries";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styling';
import Drawer from '../Drawer';
import { useHistory } from 'react-router';





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
function DrumCard(props) {
    const history = useHistory();
    var drum = props.drum;
    const classes = useStyles(); 
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Drum No. {drum.id}
          </Typography>
          <Typography variant="h5" component="h5">
            Current Status: {drum.currentStatus}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            From: {drum.place_of_occurence}
          </Typography>
          <Typography variant="body2" component="p">
            <p>Classification: {drum.classification}</p>
            <p>Type: {drum.type}</p>
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick = {(event)=> Oncl(event, history, drum)}>Learn More</Button>
        </CardActions>
      </Card>
    );
}

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
        console.log(data);
        // Iterate through a list of drums, return a list item for each of them 
        return data.drums.map(drum => {
            return(
                <DrumCard drum = {drum}></DrumCard>
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
                <ul id="drum-list">
                    <li>Drum List!</li>
                </ul>
            </div>
            </div>
        );
}

//Bind together the query with the component
export default withRouter(Explorer);