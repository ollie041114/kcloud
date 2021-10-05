import React, {Component, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { SubmitStepButton } from './submitStepButton';
function TemporaryStorage(props) {
    function submitForm(e, {drum_id, storageUniqueNumber, Longitude, Latitude, startDate, endDate}){
        //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
        e.preventDefault();
        //console.log(e);
        setTransactionHash("It was changed!");
        var time = Math.round(+new Date()/1000);
        
        var startTime = (Math.floor(startDate.getTime() / 1000));
        var endTime = (Math.floor(endDate.getTime() / 1000));
        var storage_schedule = startTime + "finishat:" + endTime;
        
        var storage_id = storageUniqueNumber;
        const ethereumHandler = new EthereumHandler();
    
        var longitude = Longitude; 
        var latitude = Latitude; 
    
    
        ethereumHandler._temporaryStorage(drum_id, time, longitude, latitude, storage_id, storage_schedule, callbackReceipt);
        return transactionHash;
    }

    const callbackReceipt = (childData) => {
        setTransactionReceipt(childData);
      };
        const [drum_id, setDrumId] = useState(props.drumId);

        //const [sensor_id, setSensorId] = useState(""); 
        const [time, setTime] = useState(Math.round(+new Date()/1000));
        
        const [storageUniqueNumber, setStorageUniqueNumber] = useState("");
        const [Longitude, setLongitude] = useState("");
        const [Latitude, setLatitude] = useState("");
        const [startDate, setStartDate] = useState(+new Date());
        const [endDate, setEndDate] = useState(+new Date());
        const [transactionHash, setTransactionHash] = useState("Oh my goodness");
        const [transactionReceipt, setTransactionReceipt] = useState(null);
        
        function ConditionForButton() {
            if (transactionHash != "Oh my goodness" && transactionReceipt == null){
                return true;} else{
                    return false;
                }
        }
        function CallbackForButton(e) {
            submitForm(e, {drum_id, storageUniqueNumber, Longitude, Latitude, startDate, endDate})
        }
        useEffect(() => {
            if (transactionReceipt != null){
                props.handleNext();
            }
          }, [transactionReceipt]); // Only re-run the effect if open changes
        return(
            <div style = {{marginBottom: "40px"}}>

                <h2>Temporary Storage</h2>
                <form id = "package-drum">
                    <div className = "field">
                        <label>Drum id: {drum_id}</label>
                    </div>

                    <div className = "field">
                        <label>Storage id: : </label>
                        <input type = "text" onChange={(e)=>
                            setStorageUniqueNumber(e.target.value)
                        }/>
                    </div>

                    <div className = "field">
                        <label>Storage location: : </label>

                        <div style={{display: "inline-block"}}>
                            <label>Longitude</label>
                            <input type = "text" onChange={(e)=>
                                setLongitude(e.target.value)
                            }/>
                        </div>

                        <div style={{display: "inline-block"}}>
                            <label>Latitude</label>
                            <input type = "text" onChange={(e)=>
                                setLatitude(e.target.value)
                            }/>
                        </div>

                    </div>

                    <div className = "field">
                        <label>Storage schedule: </label>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>Start date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setStartDate} value = {startDate} />
                        </div>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>End date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setEndDate} value = {endDate} />
                        </div>
                    </div>

                    <SubmitStepButton CallbackForButton = {CallbackForButton} ConditionForButton = {ConditionForButton}/>
                </form>
            </div>
        );
};

export default TemporaryStorage;