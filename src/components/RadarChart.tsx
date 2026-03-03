import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const RadarChart = () => {
  const data = {
    labels: ['Reach', 'Lifespan', 'Loyalty', 'Revenue', 'Simplicity'],
    datasets: [
      {
        label: 'IG',
        data: [7, 4, 10, 7, 5],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'TT',
        data: [10, 2, 4, 3, 8],
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45, 212, 191, 0.1)',
        borderWidth: 2,
        pointRadius: 0
      },
      {
        label: 'YT',
        data: [6, 10, 8, 10, 4],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        angleLines: { color: '#292524' },
        grid: { color: '#292524' },
        pointLabels: { color: '#78716c', font: { size: 9, weight: 'bold' as const } },
        ticks: { display: false, stepSize: 2 }
      }
    }
  };

  return (
    <div className="h-[220px] w-full mt-4">
      <Radar data={data} options={options} />
    </div>
  );
};
