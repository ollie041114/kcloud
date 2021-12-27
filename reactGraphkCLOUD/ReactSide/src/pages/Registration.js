import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AddData from '../components/AddData';
import Enroll from './Enroll';
import Drawer from '../components/Drawer';
import { useStyles } from '../styling';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 80,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(7),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);



export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Drawer></Drawer>
      <div className = {classes.content} style = {{float: "left"}}>
          <div className={classes.toolbar} />
      <div className={classes.demo1}>
        
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Register new drums" />
          <AntTab label="Add more drum information" />
        </AntTabs>
          {value == 0 ? (
              <Enroll/>
            ) : (
              <AddData/>
            )}
        <Typography className={classes.padding} />
      </div>
    </div>
    </div>
  );
}