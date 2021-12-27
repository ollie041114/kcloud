import * as d3 from 'd3';
import React, { useState, useCallback, useEffect, Component } from 'react';
import { csv, scaleBand, scaleLinear } from 'd3';

const width = 960;
const height = 500;



export class D3 extends Component {
    
    componentDidMount() {
        this.state = true;
        console.log(this.props.rhtData);
        this.sortedRht = this.props.rhtData.sort(function (x, y) {
            return d3.ascending(x.date, y.date);
        });
        this.drawBarChart(this.sortedRht);

    }
    componentDidUpdate(prevProps) {
        this.sortedRht = this.props.rhtData.sort(function (x, y) {
            return d3.ascending(x.date, y.date);
        });
        this.drawBarChart(this.sortedRht);
    }

    drawBarChart(data) {
        var that = this;
        // function(d){
        //     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
        //   }
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;


            // append the svg object to the body of the page
        var svg = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return d.date; }))
            .range([0, width]);
        var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return +d.value; }), d3.max(data, function (d) { return +d.value; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add a clipPath: everything out of this area won't be drawn.
        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]])  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function
            
        // Add the highlight lines for normal range    
        let top = y((data[1].norm[1]));
            console.log((data[1].norm[1]))
            var bottom = Math.max(d3.min(data, function (d) { return +d.value; }), (data[1].norm[0])); //one more day
            bottom = y(bottom);
            console.log((d3.min(data, function (d) { return +d.value; })));
            console.log((data[1].norm[0]));
            console.log(bottom +" and the top is "+top);
            var localHeight = (bottom-top); 
            svg.append("rect")
                .attr("y", top)
                .attr("width", width)
                .attr("height", localHeight) 
                .style('fill', '#56f000')
                .style('opacity', 0.5)
        // Create the line variable: where both the line and the brush take place
        var line = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Add the line
        line.append("path")
            .datum(data)
            .attr("class", "line")  // I add the class line to be able to modify this line later on.
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.value) })
            )

        // Create a tooltip
        var Tooltip = d3.select(this.refs.canvas)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")



        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            Tooltip
                .style("opacity", 1);
        }
        var mousemove = function (event, d) {
            if (d !== undefined && event !== undefined){
            //console.log(d);
            Tooltip
                .html(" <b>" + d.name + "</b>: " + d.value + " " + d.unit + "<br> <b>Current Status</b>: " + d.status +
                    "<br>  <small> " + d.description + "</small>")
                    .style("left", (d3.pointer(this)[0] + 70) + "px")
                    .style("top", (d3.pointer(this)[1]) + "px")}
            

        }
        var mouseleave = function (d) {
            Tooltip
                .style("opacity", 0)
        }
        // Add the points
        var points = svg.append('g')
        points
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "myCircle")
            .attr("cx", function (d) { return x(d.date) })
            .attr("cy", function (d) { return y(d.value) })
            .attr("r", 8)
            .attr("stroke", function (d) { return (d.color) })
            .attr("stroke-width", 3)
            .attr("fill", "white")
            .on("mouseover", (e) => { mouseover(e) })
            .on("mousemove", mousemove)
            .on("mouseleave", (e) => { mouseleave(e) })

        // Add the brushing
        line
            .append("g")
            .attr("class", "brush")
            .call(brush);


        var area = d3.area()
            .curve("basis")
            .x(function (d) { return x(xAxis); })
            .y0(height)
            .y1(function (d) { return y(y.domain()[1]); });
            
        // A function that set idleTimeOut to null
        var idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart(event) {

            // What are the selected boundaries?
            var extent = event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain([4, 8])
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and line position
            xAxis.transition().duration(1000).call(d3.axisBottom(x))
            line
                .select('.line')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.value) })
                )
            points
                .selectAll(".myCircle")
                .transition()
                .duration(1000)
                .attr("cx", function (d) { return x(d.date) })
                .attr("cy", function (d) { return y(d.value) })
        }

        // If user double click, reinitialize the chart
        svg.on("dblclick", function () {
            x.domain(d3.extent(data, function (d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))
            line
                .select('.line')
                .transition()
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.value) })
                )
            points
                .selectAll(".myCircle")
                .transition()
                .attr("cx", function (d) { return x(d.date) })
                .attr("cy", function (d) { return y(d.value) })
        });
    }
    render() { return <div ref="canvas"></div> }
}

export default D3