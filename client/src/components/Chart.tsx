import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import type { AVGscore, sumMatch, Game, PlayerRadarData } from "../type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  RadialLinearScale,
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

interface propsgameChart {
  score: Game[];
  abbreviation: string;
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

export const GameChart = ({ score, abbreviation }: propsgameChart) => {
  let dataset: number[] = [];
  let labell: string[] = [];
  score.map((game) => {
    if (game.team_abbreviation_home === abbreviation) {
      dataset.unshift(game.pts_home - game.pts_away);
      labell.unshift(game.team_name_away);
    } else {
      dataset.unshift(game.pts_away - game.pts_home);
      labell.unshift(game.team_name_home);
    }
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels: labell,
    datasets: [
      {
        label: "Performance",
        data: dataset,
        border: "rgba(14, 226, 103, 1)",
        backgroundColor: dataset.map((v) =>
          v < 0 ? "rgba(255, 0, 0, 1)" : "rgba(25, 135, 84, 0.9)"
        ),
        categoryPercentage: 1.0,
        barPercentage: 0.99,
      },
    ],
  };

  return (
    <div className="bg-dark border border-secondary rounded p-3">
      <Bar options={options} data={data} />
      <div className="d-flex justify-content-center gap-3 mt-2 small text-secondary">
        <span>
          <span
            className="bg-success d-inline-block rounded me-1"
            style={{ width: 12, height: 12 }}
          ></span>
          Victoire
        </span>
        <span>
          <span
            className="bg-danger d-inline-block rounded me-1"
            style={{ width: 12, height: 12 }}
          ></span>
          Défaite
        </span>
      </div>
    </div>
  );
};

interface propsRadar {
  player: PlayerRadarData;
}

const normalize = (value: number, min: number, max: number) =>
  Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
export function RadarChart({ player }: propsRadar) {
  const ts = clamp(player.ts_pct, 0.45, 0.75);
  const data = {
    labels: [
      "Scoring",
      "Playmaking",
      "Rebounds",
      "Efficiency",
      "Usage",
      "Impact",
    ],
    datasets: [
      {
        label: player.player_name,
        data: [
          normalize(player.pts, 0, 35),
          normalize(player.ast, 0, 12),
          normalize(player.reb, 0, 15),
          normalize(ts, 0.45, 0.75),
          normalize(player.usg_pct, 0.15, 0.4),
          normalize(player.net_rating, -10, 10),
        ],
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: "#444" },
        angleLines: { color: "#444" },
        pointLabels: {
          color: "#fff",
          font: { size: 12 },
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return <Radar data={data} options={options} />;
}
export default LineChart;
