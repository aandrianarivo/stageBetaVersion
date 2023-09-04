import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
    colors={["yellow","grey",'red']}
      series={[
        {
          data: [
            { id: 0, value: 2, label: 'GEL' },
            { id: 1, value: 2, label: 'STYLO BLEU' },
            { id: 2, value: 2, label: 'CALCULATRICE' },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
