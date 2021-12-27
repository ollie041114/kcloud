import * as d3 from 'd3';
import React, { useState, useCallback, useEffect, Component } from 'react';
import { csv, scaleBand, scaleLinear } from 'd3';
import {InternSet, Intern} from 'internmap';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export class ExploreAggregatorText extends Component {

    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
    }
    render() { 
        return this.props.data.map(function(item, i){

            console.log('test');
            return   <Box key = {i} sx={{ width: '100%', maxWidth: 500 }}>
           <Typography variant="h6" gutterBottom component="div">
           {item.name}: {item.value}
           </Typography>
           </Box> 
          });
          
    // this.props.data.map((e)=>{
    //    return
    //         <Box sx={{ width: '100%', maxWidth: 500 }}>
    //         <Typography variant="h6" gutterBottom component="div">
    //           h6. Heading
    //         </Typography>
    //       </Box> 
    //       });
} 
}