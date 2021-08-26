import React, {Component, useState, useRef} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';

function submitForm(e, {drum_id, classification, w_type, 
    place_of_occurence, date_of_occurence, dose_rate, selectedDate, fileUrl}){
    //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
    e.preventDefault();
    //console.log(e);
    var date_of_occurence_in_unix = (Math.floor(date_of_occurence.getTime() / 1000));
    var time = Math.round(+new Date()/1000);
    const ethereumHandler = new EthereumHandler();
    console.log(fileUrl);
    ethereumHandler._packaging(drum_id.drum_id, time, classification.classification, w_type.w_type, date_of_occurence_in_unix, place_of_occurence.place_of_occurence, dose_rate.dose_rate, fileUrl.fileUrl);
    
    return time;
}


//submitPic = new SubmitPic();
function Packaging() {    
        var unixInSeconds = Math.round(+new Date()/1000);
        const [drum_id, setDrumId] = useState(null);
        //const [sensor_id, setSensorId] = useState(""); 
        const [time, setTime] = useState(Math.round(+new Date()/1000));
        const [classification, setClassification] = useState();
        const [w_type, setWType] = useState(); 
        const [place_of_occurence, setPlace] = useState();
        const [date_of_occurence, setDate] = useState(new Date());
        const [dose_rate, setDoseRate] = useState();
        const [selectedDate, setSelectedDate] = useState(null);
        const [fileUrl, setFileUrl] = useState();
        const pic = useRef();

        function handleCallback (childData) {
            setFileUrl({fileUrl: childData})
        }

        return(
            <div style = {{marginBottom: "40px"}}>
                <h2>Packaging</h2>
                <form id = "package-drum">
                    <div className = "field">
                        <label>Drum id: </label>
                        <input type = "text" onChange={(e)=>
                            setDrumId({drum_id: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Classification: </label>
                        <input type = "text" onChange={(e)=>
                            setClassification({classification: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Type: </label>
                        <input type = "text" onChange={(e)=>
                            setWType({w_type: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Place of Occurence: </label>
                        <input type = "text" onChange={(e)=>
                            setPlace({place_of_occurence: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Date of occurence: </label>
                        <DatePicker
                            selected = {selectedDate}
                            onChange = {date => setSelectedDate(date)}
                        />
                    </div>

                    <div className = "field">
                        <label>Surface radiation dose rate: </label>
                        <input type = "text" onChange={(e)=>
                            setDoseRate({dose_rate: e.target.value})
                        }/>
                    </div>
                    

                    <SubmitPic ref = {pic} parentCallback = {handleCallback} />


                    <button onClick={(e)=>
                        setTime({time: submitForm(e, {drum_id, classification, w_type, 
                        place_of_occurence, date_of_occurence, dose_rate, selectedDate, fileUrl})})
                    }>+</button>
                </form>
            </div>
        );
};

export default Packaging;