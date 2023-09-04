import { BarChart } from "@mui/x-charts/BarChart";
import PropTypes from "prop-types";

export default function BasicBars({ list }) {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: list }]}
      series={[
        { data: [4, 3, 5] },
        { data: [1, 6, 3] },
        { data: [2, 5, 6] },
      ]}
      width={1000}
      height={300}
    />
  );
}
BasicBars.propTypes = {
  list: PropTypes.array.isRequired,
};
