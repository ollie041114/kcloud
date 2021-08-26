import React, {Component, useState, useRef} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';


//submitPic = new SubmitPic();
function submitForm(e, {drum_id, time, acquisition, transferee, startTime, endTime, fileUrl}){

    e.preventDefault();
    var time = Math.round(+new Date()/1000);
    var t1 = Math.round(startTime.getTime());
    var t2 = Math.round(endTime.getTime());
    var schedule = "" + t1 + "*"+t2;


    const ethereumHandler = new EthereumHandler();
    console.log(drum_id.drum_id, time, acquisition.acquisition, transferee, t1, t2, fileUrl.fileUrl);
    //ethereumHandler._takingOver(drum_id.drum_id, time.time, acquisition.acquisition, transferee.transferee, schedule, 222, fileUrl.fileUrl);
    return time;
}

function TakingOver() {
        var unixInSeconds = Math.round(+new Date()/1000);
        const [drum_id, setDrumId] = useState("");
        
        const [startTime, setStartTime] = useState();
        const [endTime, setEndTime] = useState();
        
        const [time, setTime] = useState(+new Date()/1000);       
        const [acquisition, setAcquisition] = useState("");
        const [transferee, setTransferee] = useState(""); 
        const [transportationSchedule, setTranposportation] = useState(null);
        const [fileUrl, setFileUrl] = useState();
        const pic = useRef();

        function handleCallback (childData) {
            setFileUrl({fileUrl: childData})
        }

        return(
            <div style = {{marginBottom: "40px"}}>

                <h2>Taking Over</h2>
                <form id = "package-drum">
                    <div className = "field">
                        <label>Drum id: </label>
                        <input type = "text" onChange={(e)=>
                            setDrumId({drum_id: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Acquisition : </label>
                        <input type = "text" onChange={(e)=>
                            setAcquisition({acquisition: e.target.value})
                        }/>
                    </div>

                    <div className = "field">
                        <label>Transferee: </label>
                            <input type = "text" onChange={(e)=>
                                setTransferee({transferee: e.target.value})
                            }/>
                    </div>

                    <div className = "field">
                        <label>Transportation schedule: </label>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>Start date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setStartTime} value = {startTime} />
                        </div>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>End date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setEndTime} value = {endTime} />
                        </div>
                    </div>

                  <div className = "field">
                      <label> Waste acceptance request: </label>
                      <SubmitPic ref={pic} parentCallback = {handleCallback} />
                  </div>  
                  
                  <button onClick={(e)=>
                        setTime({time: submitForm(e, {drum_id, time, acquisition, 
                            transferee, startTime, endTime, fileUrl})})
                    }>+</button>
                </form>
            </div>
        );
};

export default TakingOver;