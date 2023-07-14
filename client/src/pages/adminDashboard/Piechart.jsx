import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

const Piechart = () => {
  const { totalRoomCount } = useSelector((state) => state.room);
  const { totalUsers } = useSelector((state) => state.user);

  const data = [
    ["Entity", "Total Number"],
    [`Users ${totalUsers}`, totalUsers],
    [`Rooms ${totalRoomCount}`, totalRoomCount],
  ];

  const options = {
    title: "Total status",
    is3D: true,
  };
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
