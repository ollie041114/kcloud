import React, {Component, useState, useEffect} from "react";
import App from "../App";
import {gql, useQuery} from "@apollo/client";
import { getBooksQuery} from "../queries/queries";
import {updateTime} from './updateTime.js';

function ExchangeRates() {
    const { loading, error, data, refetch } = useQuery(getBooksQuery);      
    const now = new Date().toLocaleTimeString();

    let [time, setTime] = useState(now);

    useEffect(() => {
      console.log(`initializing interval`);
      const interval = setInterval(() => {
        updateTime(refetch, setTime);
      }, 10000);
    
      return () => {
        console.log(`clearing interval`);
        clearInterval(interval);
      };
    }, []); 

    if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        console.log(data);
        // Iterate through a list of drums, return a list item for each of them 
        return data.drums.map(drum => {
            return(
                <li key = {drum.id}> {drum.id}, {drum.classification}, {drum.place_of_occurence}</li>
            )
        });
      }

function DrumList(){
        return (
            <div>
                <p>{ExchangeRates()}</p>
                <ul id="drum-list">
                    <li>Drum List!</li>
                </ul>
            </div>
        );
}

//Bind together the query with the component
export default DrumList;