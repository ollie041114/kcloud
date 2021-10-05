import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Point
} from 'react-google-maps';
import * as parksData from "../data/data.json"
import { gql, useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import { DrumCard } from '../components/_DrumCards';
import Drawer from '../components/Drawer';
import { getExtendedDrumData } from '../queries/structuredQuery';
import { isCompositeType } from 'graphql';
import { useStyles } from '../styling';
import { useHistory } from 'react-router';
import { DrumHistoryMini } from './DrumHistory';
import { useRef } from 'react';
import mapStyling from '../mapStyling';
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


var itemsList = [];
// For now, generates random locations in Ottawa. 
function getRandomIntInclusive(min, max) {
  return (min + 0.5 * Math.random()); //The maximum is inclusive and the minimum is inclusive
}
var locations = []
for (let i = 0; i < 16; i++) {
  var inner = [];
  inner[0] = getRandomIntInclusive(129, -75);
  inner[1] = getRandomIntInclusive(35, 46);
  locations.push([inner[0], inner[1]])
}

function Map(props) {
  var drums = props.drums;
  var history = props.history;
  const [selectedDrum, setSelectedDrum] = useState(null);
  var extendedDrums = [];
  for (let i = 0; i < drums.length; i++) {
    extendedDrums.push(getExtendedDrumData(drums[i], locations[i]))
  }
  return <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 35.53842, lng: 129.3114 }}
    options={{styles: mapStyling}}
  >

    {extendedDrums.map((drum) => (
      <Marker
        key={drum.basicInfo.id}
        position={{
          lat: drum.location.coordinates[1],
          lng: drum.location.coordinates[0]
        }}
        icon={{
          path: drum.currentStatusInfo.rawIcon.icon[4],
          anchor: new window.google.maps.Point(
            drum.currentStatusInfo.rawIcon.icon[0] / 2, // width
            drum.currentStatusInfo.rawIcon.icon[1] // height
          ),
          scaledSize: new window.google.maps.Size,
          fillColor: "#0000ff",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 0.075
        }}
        onClick={
          (event) => {
            history.push({
              pathname: '/GoogleMaps/',
              search: drum.graphCopy.id.toString(),
              state: { drumsy: drum.graphCopy }
            });
            props.setSelectedDrumGlobally(drum);
            setSelectedDrum(drum);
          }
        }
      >
        {
          selectedDrum && selectedDrum.basicInfo.id == drum.basicInfo.id ? (
            <InfoWindow
              key={selectedDrum.basicInfo.id}
              position={{
                lat: selectedDrum.location.coordinates[1],
                lng: selectedDrum.location.coordinates[0]
              }}
              onCloseClick={(e) => {
                props.setSelectedDrumGlobally(null);
                setSelectedDrum(null);
              }}
            >
              <DrumCard drum={selectedDrum.graphCopy} onClick={Oncl}></DrumCard>
            </InfoWindow>
          ) : (
            <h1></h1>
          )
        }
      </Marker>
      // Geometry is an array of coordinates, together with a type 
    ))}
  </GoogleMap>
  //defaultCenter: where it's gonna position the map when it loads for the first time
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function Oncl(event, history, drum) {
  event.preventDefault();
  history.push({
    pathname: '/Explorer/DrumHistory',
    search: drum.id.toString(),
    state: { drumsy: drum }
  });
}

function GoogleMaps() {
  var history = useHistory();
  const classes = useStyles();
  const [selectedDrum, setSelectedDrum] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("Selected drum is: ");
  console.log(selectedDrum);


  return (
    <div className={classes.pach}>
      <Drawer></Drawer>
      <div className={classes.content} style = {{padding: "0px"}}>
        <div className={classes.toolbar} />
        <div className={classes.mapWrapper} >


          <div className={classes.mapOne}>
            <WrappedMap
              history={history}
              setSelectedDrumGlobally={setSelectedDrum}
              drums={data.drums}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB_IRQ7x-jmSAKQbPQxIPrU-mEYeEZjNJU&callback=initMap`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>

          <div className={classes.mapTwo}>
            {
              selectedDrum != null ? (
                <DrumHistoryMini drum={selectedDrum.graphCopy} isMini={true} showBasicInfo={true}></DrumHistoryMini>
              ) : (
                <div>
                  <DrumHistoryMini drum={data.drums[0]} isMini={true} showBasicInfo={true}></DrumHistoryMini>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(GoogleMaps);