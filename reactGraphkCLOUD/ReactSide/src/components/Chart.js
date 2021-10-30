import React from "react";

import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon, 
    ListItemText
} from "@material-ui/core";
import { useState } from "react";
import { getExtendedDrumData } from '../queries/structuredQuery';
import clsx from 'clsx';
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from "@material-ui/core";
import ArchiveIcon from '@material-ui/icons/Archive';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { useStyles } from "../styling";
import { IconButton } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { format } from 'date-fns';
import { BrowserTouer as Router,
    Switch, 
    Route,
    Link } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {RegistrationRoute, ExplorerRoute } from '../Routing';
import { useHistory } from "react-router";
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    registerables
  } from 'chart.js';
import { isCompositeType } from "graphql";
  Chart.register(...registerables);




function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getData(extendedDrum) {
  var sensorData = extendedDrum.sensorData
  console.log(sensorData);
  // Create random array of objects
  let mini_data = [];
  for(var i = 0; i < sensorData.radio.length; i++) {
    mini_data.push({
      label: sensorData.radio[i],
      value: sensorData.radio[i],
      time: sensorData.time_recorded[i]
    });
  }
  console.log(mini_data);
  let data = {
    title: 'Sensor '+extendedDrum.basicInfo.id,
    data: mini_data
  };
  return data;
}


// BarChart
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
	      maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.color
        }]
      }
    });
  }

  render() {
    return (
        <canvas ref={this.canvasRef} />
    );
  }
}


// LineChart
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.time);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    console.log(this.props.data);
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      options: {
			  maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'week'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => format(d.time, 'yyyy/MM/dd kk:mm:ss')),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          fill: 'none',
          backgroundColor: this.props.color,
          pointRadius: 2,
          borderColor: this.props.color,
          borderWidth: 1,
          lineTension: 0
        }]
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}


// Doughnut
class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'doughnut',
      options: {
	      maintainAspectRatio: false
      },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.colors
        }]
      }
    });

  }


  render() {
    return <canvas ref={this.canvasRef} />;
  }
}


// App
export function Charts (props) {
var drum = props.drum;
var [data, setData] = useState(props.sensorData);
console.log(data);
//     constructor(props) {
//     super(props);

//     this.state = {
//       data: getData()
//     };
//   }

//   componentDidMount() {
//     window.setInterval(() => {
//       this.setState({
//         data: getData()
//       })
//     }, 5000)
//   }
  const classes = useStyles();
    return (
      <div className="App">
        <div className={classes.mainChartWrapper}>
          <LineChart
            data={data.data}
            title={data.title}
            color="#3E517A"
          />
        </div>
        {/* <div className={classes.subChartWrapper}>
          <BarChart
            data={data[1].data}
            title={data[1].title}
            color="#70CAD1"
          />
        </div>
        <div className={classes.subChartWrapper}>
          <BarChart
            data={data[2].data}
            title={data[2].title}
            color="#B08EA2"
          />
        </div>
        <div className={classes.subChartWrapper}>
          <DoughnutChart
            data={data[3].data}
            title={data[3].title}
            colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']}
          />
        </div> */}
      </div>
    );
}