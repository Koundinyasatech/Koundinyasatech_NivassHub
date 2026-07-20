import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function EntryChart() {
  const data = [
    { day: "Mon", value: 10 },
    { day: "Tue", value: 20 },
  ];

  return (
    <div
      style={{
        width: 600,
        height: 300,
      }}
    >
      <BarChart
        width={600}
        height={300}
        data={data}
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#365574"
        />
      </BarChart>
    </div>
  );
}

export default EntryChart;