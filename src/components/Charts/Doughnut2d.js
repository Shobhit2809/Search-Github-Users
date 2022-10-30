// / STEP 1 - Include Dependencies
// Include react
import React from "react";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as candy
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


const ChartComponent = ({data})=>{
  const chartConfigs = {
  type: "doughnut2d", // The chart type
  width: "100%", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption:"Stars Per Language",
      // to remove percent values and show value in numbers
      showPercentValues:0,
      // to remove decimals from percentage
      decimals:0,
      // size of pie
      doughnutRadius:'45%',
      // import candy theme above 
      theme:'candy',
    },
    // Chart Data
    // data:data(es6 shorthand)
    data,
  }
};

  return <ReactFC {...chartConfigs}></ReactFC>
}




export default ChartComponent;