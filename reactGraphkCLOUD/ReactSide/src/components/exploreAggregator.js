import * as d3 from 'd3';
import React, { useState, useCallback, useEffect, Component } from 'react';
import { csv, scaleBand, scaleLinear } from 'd3';
import {InternSet, Intern} from 'internmap';

export class ExploreAggregator extends Component {
    
    DonutChart(data, {
        name = ([x]) => x,  // given d in data, returns the (ordinal) label
        value = ([, y]) => y, // given d in data, returns the (quantitative) value
        title, // given d in data, returns the title text
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        innerRadius = Math.min(width, height) / 3, // inner radius of pie, in pixels (non-zero for donut)
        outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
        labelRadius = (innerRadius + outerRadius) / 2, // center radius of labels
        format = ",", // a format specifier for values (in the label)
        names, // array of names (the domain of the color scale)
        colors, // array of colors for names
        stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
        strokeWidth = 1, // width of stroke separating wedges
        strokeLinejoin = "round", // line join of stroke separating wedges
        padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges
      } = {}) {
        // Compute values.
        const N = d3.map(data, name);
        const V = d3.map(data, value);
        const I = d3.range(N.length).filter(i => !isNaN(V[i]));
        console.log("Lol");
        // Unique the names.
        if (names === undefined) names = N;
        names = new d3.InternSet(names);
      
        // Chose a default color scheme based on cardinality.
        if (colors === undefined) colors = d3.schemeSpectral[names.size];
        if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
      
        // Construct scales.
        const color = d3.scaleOrdinal(names, colors);
      
        // Compute titles.
        if (title === undefined) {
          const formatValue = d3.format(format);
          title = i => `${N[i]}\n${formatValue(V[i])}`;
        } else {
          const O = d3.map(data, d => d);
          const T = title;
          title = i => T(O[i], i, data);
        }
      
        // Construct arcs.
        const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
        
        var margin = { top: 10, right: 30, bottom: 30, left: 60 };

            // append the svg object to the body of the page
        var svg = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
                  .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
        svg.append("g")
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .attr("stroke-linejoin", strokeLinejoin)
          .selectAll("path")
          .data(arcs)
          .join("path")
            .attr("fill", d => color(N[d.data]))
            .attr("d", arc)
          .append("title")
            .text(d => title(d.data));
      
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
          .selectAll("text")
          .data(arcs)
          .join("text")
          .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
          .selectAll("tspan")
          .data(d => {
            const lines = `${title(d.data)}`.split(/\n/);
            return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
          })
          .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "bold")
            .text(d => d);
      
        return Object.assign(svg.node(), {scales: {color}});
      }
    componentDidMount() {
        this.state = true;
        var population = [
            {name: "<5", value: 19912018},
            {name: "5-9", value: 20501982},
            {name: "10-14", value: 20679786},
            {name: "15-19", value: 21354481},
            {name: "20-24", value: 22604232},
            {name: "25-29", value: 21698010},
            {name: "30-34", value: 21183639},
            {name: "35-39", value: 19855782},
            {name: "40-44", value: 20796128},
            {name: "45-49", value: 21370368},
            {name: "50-54", value: 22525490},
            {name: "55-59", value: 21001947},
            {name: "60-64", value: 18415681},
            {name: "65-69", value: 14547446},
            {name: "70-74", value: 10587721},
            {name: "75-79", value: 7730129},
            {name: "80-84", value: 5811429},
            {name: "≥85", value: 5938752}
            ];

            console.log(population)
        this.DonutChart(this.props.population, {
            name: d => d.name,
            value: d => d.value,
            width: 500,
            height: 500
          })

    }
    componentDidUpdate(prevProps) {
    }

    render() { return <div ref="canvas"></div> }
}