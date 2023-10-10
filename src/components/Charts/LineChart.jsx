import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const StockLineChart = ({ data }) => {
  const labels = data?.products?.map((product) => product.title);
  const stockData = data?.products?.map((product) => product.stock);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Hər məhsulun ayri ayrılıqda miqdarı",
        data: stockData,
        fill: false,
        borderColor: "#10B981",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="line-chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};
