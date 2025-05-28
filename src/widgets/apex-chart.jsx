import React from "react";
import ReactApexChart from "react-apexcharts";

function ApexChart() {
  const series = [
    {
      name: "Orders",
      data: [12, 9, 15, 28, 38, 33, 37, 49, 43, 25, 30, 26],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    markers: {
      size: 5,
      colors: ["#fff"],
      strokeColors: "#3366ff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Orders`,
      },
    },
    colors: ["#3366ff"],
    title: {
      text: "Sales Revenue",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
}

export default ApexChart;
