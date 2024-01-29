import React from "react";
import ReactApexChart from "react-apexcharts";

const MyDonutChart = () => {
  const data = {
    series: [44, 55, 13, 43, 22],
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  };

  const options = {
    chart: {
      type: "donut",
    },
    labels: data.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 100,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "85%",
        },
      },
    },
  };

  return <ReactApexChart options={options} series={data.series} type="donut" />;
};

export default MyDonutChart;
