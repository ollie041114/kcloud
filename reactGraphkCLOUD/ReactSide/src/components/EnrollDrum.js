import React, {Component, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import { getQuery} from "../queries/queries";
import EthereumHandler from '../truffleSide/writeFunctions/EthereumHandler';
function GetTemporaryStorages() {
    const {loading, error, data} = useQuery(getQuery);
    if (loading) return (<option disabled>Loading temporary storages...</option>);
    if (error) return (<p>Error...</p>);
    console.log(data.temporaryStorageDatas[0])
    return data.temporaryStorageDatas.map(temporaryStorageData => {
        return(<option key={temporaryStorageData.id} value = {temporaryStorageData.id}>{temporaryStorageData.drum.drum.place_of_occurence}</option>)
    })
}

function submitForm(e, {drum_id, sensor_id, time}){
    //console.log(drum_id.drum_id, sensor_id.sensor_id, time);
    e.preventDefault();
    //console.log(e);
    var time = Math.round(+new Date()/1000);
    const ethereumHandler = new EthereumHandler();
    ethereumHandler._enrollment(drum_id.drum_id, time, sensor_id.sensor_id);
    return time;
}

function EnrollDrum() {    
        var unixInSeconds = Math.round(+new Date()/1000);
        const [drum_id, setDrumId] = useState("");
        const [sensor_id, setSensorId] = useState(""); 
        const [time, setTime] = useState(Math.round(+new Date()/1000));

        return(
            <div style = {{marginBottom: "40px"}}>
            <h2>Enrollment</h2>
            <form id = "add-drum">
                <div className = "field">
                    <label>Drum id: </label>
                    <input type = "text" onChange={(e)=>
                        setDrumId({drum_id: e.target.value})
                    }/>
                </div> 

                <div className = "field">
                    <label>Sensor id: </label>
                    <input type = "text" onChange={(e)=>
                        setSensorId({sensor_id: e.target.value})
                    }/>
                </div> 

                <button onClick={(e)=>
                    setTime({time: submitForm(e, {drum_id, sensor_id, time})})
                }>+</button>
            </form>
            </div>
        );
};

export default EnrollDrum;