import { React, Component } from "react";

import {create} from 'ipfs-http-client';
import {useState, useRef, useEffect} from 'react';
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import {Box} from "@material-ui/core";
export function SubmitPic (props){

// Create an instance of the client
    const client = create('https://ipfs.infura.io:5001')
    const [fileUrl, updateFileUrl] = useState("");

    useEffect(() => {
        console.log("The true fileUrl is "+fileUrl);
        props.parentCallback(fileUrl);
      }, [fileUrl])

    async function onChange(e){
        e.preventDefault();
        const file = e.target.files[0]
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            updateFileUrl(url)
            //console.log(url);
        }catch(error){
                console.log('Error uploading the file: ', error)
            }
    }

        async function onSubmit(e){
            e.preventDefault();
            const file = e.target.files[0];
            try {
                const added = await client.add(file);
                const url = `https://ipfs.infura.io/ipfs/${added.path}`
                updateFileUrl(url)
                //console.log(url);
            }catch(error){
                    console.log('Error uploading the file: ', error)
                }
            console.log("In Submit pic, the file Url is "+fileUrl);
            props.parentCallback(fileUrl);
    }
    
    return(
            <div> 
                 {/* style = {{marginBottom: "40px"}}> */}
                 <Box mt = {6} mb = {8}>
                <Typography  variant="subtitle1" gutterBottom style={{display:"inline-block"}}> Waste Acceptance Request: </Typography>
                <Box  style={{display:"inline-block"}} ml = {2}>
                <Button
                variant = "outlined"
                color="primary"
                component = "label">
                    Choose file
                    <input type = "file" hidden onChange = {onChange} />
                </Button>
                </Box>
                </Box>
                {/* <p> The IPFS hash is: {fileUrl}</p> */}
            
            {
                fileUrl && (
                <img src={fileUrl} width="200px" />
                )
            }    
            </div>

            
            );
    }