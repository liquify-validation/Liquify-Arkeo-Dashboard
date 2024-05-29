import ReactApexChart from "react-apexcharts";

const MyDonutChart = () => {
  const data = {
    series: [25, 8.1, 36.6, 7.1, 25],
    labels: ["Ethereum", "BNB", "Bitcoin", "The Graph", "Base"],
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
