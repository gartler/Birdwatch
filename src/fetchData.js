import React, { Component } from 'react';
import * as d3 from 'd3'

class FetchData extends Component {
  constructor(props) {
   super (props);

   this.state = {
     data: [{timestamp:55, value:44, id:3}],
   };
  }

  fetchData() {
    let url = "http://192.168.0.111:3004/bird/"

    fetch(url)
     .then(response => response.json())
     .then(data => this.setState({ data },()=> this.initGraph()));
  }

  componentDidMount() {
   this.fetchData()
  }
  initGraph() {
    // const width = 640;
    // const height = 480;
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 1760 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    const svgCanvas = d3.select(".graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    const data = this.state.data
// Add X axis --> it is a date format
var x = d3.scaleLinear()
.domain([d3.min(data, function(d) { return +d.timestamp }), d3.max(data, function(d) { return +d.timestamp; })])
.range([ 0, width ]);
svgCanvas.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([d3.min(data, function(d) { return +d.value; }), d3.max(data, function(d) { return +d.value; })])
.range([ height, 0 ]);
svgCanvas.append("g")
.call(d3.axisLeft(y));

// Add the line
svgCanvas.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "steelblue")
.attr("stroke-width", 1.5)
.attr("d", d3.line()
  .x(function(d) { return x(d.timestamp) })
  .y(function(d) { return y(d.value) })
  )

  }
  render (){
   return(
    <div className="fetch">
      test
      <div className="graph"></div>
       {JSON.stringify(this.state.data)}
    </div>
     )
  };
}

export default FetchData;
