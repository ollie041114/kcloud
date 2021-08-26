import React, {Component} from "react";
import App from "../App";
import {gql, useQuery} from "@apollo/client";
import { getBooksQuery} from "../queries/queries";

function ExchangeRates() {
        const { loading, error, data } = useQuery(getBooksQuery);      
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