import React, {Component, useState, useRef} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitPic } from './SubmitPic';
import DateTimePicker from 'react-datetime-picker';


//submitPic = new SubmitPic();
function submitForm(e, {drum_id, time, acquisition, transferee, startDate, endDate, fileUrl}){

    e.preventDefault();
    var time = Math.round(+new Date()/1000);
    var t1 = Math.round(startDate.getTime());
    var t2 = Math.round(endDate.getTime());
    var schedule = "" + t1 + "finishat:"+t2;

    const ethereumHandler = new EthereumHandler();
    ethereumHandler._takingOver(drum_id, time, acquisition, transferee, schedule, 222, fileUrl.fileUrl);
    return time;
}

function TakingOver() {
        const [drum_id, setDrumId] = useState("");
        const [time, setTime] = useState(+new Date()/1000);       
        
        const [acquisition, setAcquisition] = useState();
        const [transferee, setTransferee] = useState();
        
        const [startDate, setStartDate] = useState(+new Date());       
        const [endDate, setEndDate] = useState(+new Date());


        const [fileUrl, setFileUrl] = useState(""); 
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
                            setDrumId(e.target.value)
                        }/>
                    </div>

                    <div className = "field">
                        <label>Acquisition : </label>
                        <input type = "text" onChange={(e)=>
                            setAcquisition(e.target.value)
                        }/>
                    </div>

                    <div className = "field">
                        <label>Transferee: </label>
                            <input type = "text" onChange={(e)=>
                                setTransferee(e.target.value)
                            }/>
                    </div>

                    <div className = "field">
                        <label>Transportation schedule: </label>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>Start date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setStartDate} value = {startDate} />
                        </div>
                        <div>
                            <p style={{display:"inline-block", marginRight: "10px"}}>End date: </p>
                            <DateTimePicker style={{display:"inline-block", marginLeft: "20px"}} onChange = {setEndDate} value = {endDate} />
                        </div>
                    </div>

                  <div className = "field">
                      <label> Waste acceptance request: </label>
                      <SubmitPic ref={pic} parentCallback = {handleCallback} />
                  </div>  
                  
                  <button onClick={(e)=>
                        setTime({time: submitForm(e, {drum_id, time, acquisition, transferee, startDate, endDate, fileUrl}) })
                    }>+</button>
                </form>
            </div>
        );
};

export default TakingOver;