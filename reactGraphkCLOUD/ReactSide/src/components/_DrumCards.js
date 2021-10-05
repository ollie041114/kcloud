import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { useStyles } from '../styling';


export function DrumCard(props) {
    const history = useHistory();
    const Oncl = props.onClick
    var drum = props.drum;
    const classes = useStyles(); 
    console.log(drum.currentStatus);
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
            {'K-CLOUD'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick = {(event)=> Oncl(event, history, drum)}>See details...</Button>
        </CardActions>
      </Card>
    );
}