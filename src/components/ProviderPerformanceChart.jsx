// import React from "react";
// import { ResponsiveLine } from "@nivo/line";

// const ProviderPerformanceChart = ({ data }) => {
//   if (!data || !data.providers || data.providers.length === 0) {
//     return <div>No performance data available</div>;
//   }

//   const totalNonce = Number(data.providers[0].total_nonce);

//   const points = [
//     { x: data.start_time, y: totalNonce },
//     { x: data.end_time, y: totalNonce },
//   ];

//   const chartData = [
//     {
//       id: "performance",
//       data: points,
//     },
//   ];

//   return (
//     <div style={{ width: "600px", height: "300px" }}>
//       <ResponsiveLine
//         data={chartData}
//         margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{ type: "linear", min: "auto", max: "auto" }}
//         axisBottom={{
//           tickRotation: -45,
//           legend: "Time",
//           legendOffset: 40,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           legend: "Calls",
//           legendOffset: -50,
//           legendPosition: "middle",
//         }}
//         colors={{ scheme: "nivo" }}
//         enablePoints={true}
//         enableArea={true}
//         areaOpacity={0.1}
//         useMesh={true}
//       />
//     </div>
//   );
// };

// export default ProviderPerformanceChart;

// DEMO

import React from "react";
import { ResponsiveLine } from "@nivo/line";

const ProviderPerformanceChart = ({ data }) => {
  const mockData = {
    providers: [
      { timestamp: "2024-12-14", total_nonce: "100" },
      { timestamp: "2024-12-15", total_nonce: "150" },
      { timestamp: "2024-12-16", total_nonce: "130" },
      { timestamp: "2024-12-17", total_nonce: "180" },
      { timestamp: "2024-12-18", total_nonce: "220" },
      { timestamp: "2024-12-19", total_nonce: "200" },
      { timestamp: "2024-12-20", total_nonce: "250" },
    ],
  };

  const chartDataSource =
    data && data.providers && data.providers.length > 1
      ? data.providers.map((p) => ({
          x: p.timestamp || p.time,
          y: Number(p.total_nonce),
        }))
      : mockData.providers.map((p) => ({
          x: p.timestamp,
          y: Number(p.total_nonce),
        }));

  const chartData = [
    {
      id: "performance",
      data: chartDataSource,
    },
  ];

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 60, right: 20, bottom: 60, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        axisBottom={{
          tickRotation: -45,
          legend: "Time",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Calls",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        colors={["#166cf9"]}
        enablePoints={true}
        enableArea={true}
        areaOpacity={0.1}
        useMesh={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "white",
              },
            },
            legend: {
              text: {
                fill: "white",
              },
            },
          },
          legends: {
            text: {
              fill: "white",
            },
          },
          tooltip: {
            container: {
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              fontSize: "14px",
              borderRadius: "4px",
            },
          },
        }}
      />
    </div>
  );
};

export default ProviderPerformanceChart;
