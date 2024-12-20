import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme, Tooltip } from "@mui/material";
import { tokens } from "../theme";

const PieChart = ({ data, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CustomTooltip = ({ datum }) => (
    <div
      style={{
        padding: "12px 16px",
        background: "rgba(0, 0, 0, 0.9)",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <strong>{datum.id}</strong>: {datum.value}
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {title && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2 style={{ color: colors.text[100] }}>{title}</h2>
        </div>
      )}
      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          },
        }}
        margin={{ top: 20, right: 100, bottom: 40, left: 30 }}
        innerRadius={0.9}
        padAngle={0}
        cornerRadius={0}
        activeOuterRadiusOffset={8}
        colors={({ data }) => data.color}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        tooltip={CustomTooltip}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsDiagonalLength={10}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", "2"]],
        }}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justifyLeft: true,
            translateX: 60,
            translateY: 0,
            itemsSpacing: 10,
            itemWidth: 60,
            itemHeight: 18,
            itemTextColor: colors.grey[100],
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 15,
            symbolShape: "square",
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
