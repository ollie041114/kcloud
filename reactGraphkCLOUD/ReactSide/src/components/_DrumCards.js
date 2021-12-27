import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { useStyles } from '../styling';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useState } from 'react';



function ifDanger(sensorData) {
  var counter = 0;
  sensorData.map((item) => {
    try {
      if (item.rAlarm.message == "Danger" || item.tAlarm.message == "Danger" || item.aAlarm.message == "Danger") {
        counter = counter + 1;
      }
    } finally {
      return 0;
    }
  });
  if (counter >= 0) {
    return counter;
  }
}

export function DrumCard(props) {

  const history = useHistory();
  const Oncl = props.onClick;
  const OnClickForAlarm = props.forAlarm;
  var drum = props.drum;

  const classes = useStyles();
  console.log(drum.currentStatus);
  const bull = <span className={classes.bullet}>•</span>;
  var [counter, setCounter] = useState(ifDanger(drum.sensorData));
  if (props.filtered == "True") {
    if (counter > 0){
      return (
        <Card className={classes.card} key={drum.id}>
          <Box>

            {(counter > 0) ?
              <ButtonBase
                onClick={(event) => OnClickForAlarm(event, history, drum)}
              >
                <Alert variant="outlined" severity="error">
                  Error alert — there are {counter} unchecked errors!
                </Alert></ButtonBase> :
              null
            }


          </Box>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Drum No. {drum.id}
            </Typography>


            <Typography variant="h6" component="h6">
              {drum.currentStatus}
            </Typography>


            <Typography className={classes.pos} color="textSecondary">
              From: {drum.place_of_occurence}
            </Typography>
            <Typography variant="body2" component="p">
              <p>Classification: {drum.classification}</p>
              <p>Type: {drum.type}</p>
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={(event) => Oncl(event, history, drum)}>See details...</Button>
          </CardActions>
        </Card>
      );
    } else {
      return null;
    }
  } else {
    return (
      <Card className={classes.card} key={drum.id}>
        <Box>

          {(counter > 0) ?
            <ButtonBase
              onClick={(event) => OnClickForAlarm(event, history, drum)}
            >
              <Alert variant="outlined" severity="error">
                Error alert — there are {counter} unchecked errors!
              </Alert></ButtonBase> :
            null
          }


        </Box>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Drum No. {drum.id}
          </Typography>


          <Typography variant="h6" component="h6">
            {drum.currentStatus}
          </Typography>


          <Typography className={classes.pos} color="textSecondary">
            From: {drum.place_of_occurence}
          </Typography>
          <Typography variant="body2" component="p">
            <p>Classification: {drum.classification}</p>
            <p>Type: {drum.type}</p>
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={(event) => Oncl(event, history, drum)}>See details...</Button>
        </CardActions>
      </Card>
    );
  }
}