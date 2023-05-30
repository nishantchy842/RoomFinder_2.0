import { Chart } from "react-google-charts";

export const data = [
  ["Entity", "Total Number"],
  ["Users", 200],
  ["Rooms", 75],
];

export const options = {
  title: "Total stats",
  is3D: true,
};

const Piechart = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"400px"}
      height={"400px"}
    />
  );
};

export default Piechart;
