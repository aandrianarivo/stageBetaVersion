import { BarChart } from "@mui/x-charts/BarChart";

export default function SimpleCharts() {
  return (
    <div className="container-fluid">
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={500}
      />
    </div>
  );
}
