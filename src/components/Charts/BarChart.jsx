import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const BarChart = ({ data: dataProduct }) => {
  const [data, setData] = useState({
    labels: ["3-4.2", "4.2-4.6", "4.6-5"],
    datasets: [
      {
        label: "Orders with rating",
        data: [],
        backgroundColor: ["#10B981", "#375E83", "#FFA70B"],
        borderColor: ["#10B981", "#375E83", "#FFA70B"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const ratings = dataProduct?.products?.map((product) => product.rating);
    const dataCounts = [
      ratings?.filter((rating) => rating >= 3 && rating <= 4.2).length,
      ratings?.filter((rating) => rating >= 4.2 && rating <= 4.6).length,
      ratings?.filter((rating) => rating > 4.6).length,
    ];

    setData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((i) => ({
        ...i,
        data: dataCounts,
      })),
    }));
  }, [dataProduct]);
  return data ? (
    <Bar
      data={data}
      options={{
        scales: {
          x: {
            type: "category",
          },
        },
        plugins: {
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        },
      }}
    />
  ) : null;
};
