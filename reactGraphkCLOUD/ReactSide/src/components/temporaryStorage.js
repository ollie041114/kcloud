import React, {Component, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';

function submitForm(e, {drum_id, sensor_id, time}){
    //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
    e.preventDefault();
    //console.log(e);
    var time = Math.round(+new Date()/1000);
    const ethereumHandler = new EthereumHandler();
    ethereumHandler._enrollment(drum_id.drum_id, time, sensor_id.sensor_id);
    return time;
}
//submitPic = new SubmitPic();

function TemporaryStorage() {
        var unixInSeconds = Math.round(+new Date()/1000);
        const [drum_id, setDrumId] = useState("");
        //const [sensor_id, setSensorId] = useState(""); 
        const [time, setTime] = useState(Math.round(+new Date()/1000));
        const [storageUniqueNumber, setCarrier] = useState("");
        const [storageLocation, setTransportationSchedule] = useState(""); 
        const [startTime, setStartTime] = useState(null);
        //const [endTime, setEndTime] = useState(new Date());
        const [endTime, setEndTime] = useState(new Date());
        return(
            <div style = {{marginBottom: "40px"}}>

                <h2>Temporary Storage</h2>
                <form id = "package-drum">
                    <div className = "field">
                        <label>Drum id: </label>
                        <input type = "text" onChange={(e)=>
                            setDrumId({drum_id: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Storage id: : </label>
                        <input type = "text" onChange={(e)=>
                            setDrumId({drum_id: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Storage location: : </label>

                        <div style={{display: "inline-block"}}>
                            <label>Longitude</label>
                            <input type = "text" onChange={(e)=>
                                setDrumId({drum_id: e.target.value})
                            }/>
                        </div>

                        <div style={{display: "inline-block"}}>
                            <label>Latitude</label>
                            <input type = "text" onChange={(e)=>
                                setDrumId({drum_id: e.target.value})
                            }/>
                        </div>

                    </div>

                    <div className = "field">
                        <label>Storage schedule: </label>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>Start date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setStartTime} value = {startTime} />
                        </div>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>End date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setEndTime} value = {endTime} />
                        </div>
                    </div>

                    <button onClick={(e)=>
                        setTime({time: submitForm(e, {drum_id, drum_id, time})})
                    }>+</button>
                </form>
            </div>
        );
};

export default TemporaryStorage;