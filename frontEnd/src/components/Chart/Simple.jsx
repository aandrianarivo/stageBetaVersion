import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from "prop-types";
export default function Simple({list,title}) {
  return (
    <BarChart
    title={title}
      xAxis={[
        {
          id: 'barCategories',
          data: list,
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [2, 15, 3,10],
          color:"yellow"
        },
      ]}
      width={1000}
      height={300}
    />
  );
}
Simple.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,

};
