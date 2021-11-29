import { AppBar } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classNames from "classnames";


const drawerWidth = 240;
const appBarHeight = 80;
export const useStyles = makeStyles((theme) => ({
  putRegistrationToCenter: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-200px',
  },
  pach: {
    display: 'flex',
    flexGrow: 0,
    Color: theme.palette.background.default,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    Color: theme.palette.background.default,
  },
  mapRoot: {
    display: 'flex',
    flexGrow: 5,
    Color: theme.palette.background.default,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  card: {
    minWidth: 275,
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  // drum History thing! 
  drumHistoryWrapper: {
    display: "grid",
    gridTemplateColumns: `repeat(3, 1fr)`,
    gridTemplateRows: `repeat(3, 1fr)`,
    gap: "50px",
  },
  drumHistoryOne: {
    float: "right",
    gridColumn: "1/3",
    gridRow: "1/3"
  },
  drumHistoryTwo: {
    gridColumn: "3 /3",
    gridRow: "1/3"
  },
  MinidrumHistoryWrapper: {
    display: "grid",
    gridTemplateColumns: `1fr`,
    gap: "5px"
  },
  MinidrumHistoryOne: {
    gridColumn: "1/1",
  },
  MinidrumHistoryTwo: {
    gridColumn: "1/1",
  },
  paper: {
    width: '240px'
  },

  // for Charts! 
  chartWrapper: {
    padding: '2%',
    display: 'inline-block'
  },
  
  mainChartWrapper: {
    width: '96%',
    height: '400px'
  },
  
  subChartWrapper: {
    width: '29%',
    height: '300px'
  },
  
  /* Simple responsivenss example */
  // @media (max-width: 700px) {
  //   .sub.chart-wrapper {
  //     width: 96%;
  //   }
  // },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //  width: 400
    height: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 560,
    width: 560
  },
  maps: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  mapWrapper: {
    display: "grid",
    gridTemplateColumns: `repeat(3, 1fr)`,
    gap: "0px",
  },
  mapOne: {
    gridColumn: "1 / span 2"
  },
  mapTwo: {
    height: `calc(100vh - ${appBarHeight}px)`,
    gridColumn: "3/3",
    overflowY: "scroll"
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));