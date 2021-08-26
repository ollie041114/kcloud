import { React, Component } from "react";

import {create} from 'ipfs-http-client';
import {useState, useRef, useEffect} from 'react';



export function SubmitPic (props){
    
    

// Create an instance of the client
    const client = create('https://ipfs.infura.io:5001')
    const [fileUrl, updateFileUrl] = useState("");
    const _fileUrl = useRef();

    useEffect(() => {
        if (props.onChange) {
          props.onChange(fileUrl)
        }
      }, [fileUrl])



    async function onChange(e){
        const file = e.target.files[0]
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            updateFileUrl(url)
            //console.log(url);
        }catch(error){
                console.log('Error uploading the file: ', error)
            }
        props.parentCallback(fileUrl)
        e.preventDefault();
        }
    async function onSubmit(e){
        props.parentCallback(fileUrl)
        e.preventDefault();
    }


        return(
            <div style = {{marginBottom: "40px"}}>
                <p style={{display:"inline-block"}}> Add a file to IPFS here </p>
                <form style={{display:"inline-block", marginLeft: "5px"}} id = "ipfs-hash-form" className = "scep-form" onSubmit = {onSubmit}>
                    <input
                        type = "file"
                        onChange = {onChange}
                    />
                </form>

                <p> The IPFS hash is: {fileUrl}</p>
            
            {
                fileUrl && (
                <img src={fileUrl} width="200px" />
                )
            }    
            </div>

            
            );
    }