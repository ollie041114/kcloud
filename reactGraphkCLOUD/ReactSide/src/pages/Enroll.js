import React from 'react';
import DrumList from '../components/DrumList';
import AddDrum from '../components/EnrollDrum';
import { useStyles } from '../styling';

export function Enrollment(props){
    const classes = useStyles();
    return(
        <div className = {classes.root}>
        <div className={classes.content} >
        <div className={classes.toolbar} />
        <AddDrum />
        </div>
        </div>

    );
}

export default Enrollment