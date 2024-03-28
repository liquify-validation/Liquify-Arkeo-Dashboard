import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockPieData as data } from "../data/mockData";

const Pie2 = () => {
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
      margin={{ top: 20, right: 130, bottom: 60, left: 30 }}
      innerRadius={0.9}
      padAngle={0}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      colors={({ id, data }) => data.color}
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
          translateX: 100,
          translateY: 0,
          itemsSpacing: 15,
          itemWidth: 70,
          itemHeight: 18,
          itemTextColor: "white",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Pie2;
