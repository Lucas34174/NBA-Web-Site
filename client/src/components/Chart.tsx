import { Line } from "react-chartjs-2";
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
import type { ChartOptions } from "chart.js";
import type { AVGscore, sumMatch } from "../type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface propsLineChart {
  average: AVGscore;
}

interface propssumChart {
  average: sumMatch;
}

const LineChart = ({ average }: propsLineChart) => {
  const data = {
    labels: average.season,
    datasets: [
      {
        label: "Average score",
        data: average.total_points,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0,
      },
      {
        label: "Average home score",
        data: average.home_points,
        borderColor: "rgba(93, 245, 5, 1)",
        backgroundColor: "rgba(14, 231, 25, 1)",
        tension: 0,
      },
      {
        label: "Average  away score",
        data: average.away_points,
        borderColor: "rgba(231, 23, 23, 1)",
        backgroundColor: "rgba(192, 118, 75, 1)",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Évolution des ventes",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const sumChart = ({ average }: propssumChart) => {
  const data = {
    labels: average.season,
    datasets: [
      {
        label: "Average score",
        data: average.match_num,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Évolution des ventes",
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
