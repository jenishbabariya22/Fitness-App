import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import { useUserContext } from '../UserContext'; // Import UserContext
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

// Register required components
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Statistics = () => {
  const { workouts } = useUserContext(); // Get workouts from context
  const lineChartRef = useRef(null); // Ref for line chart
  const barChartRef = useRef(null); // Ref for bar chart

  // Prepare data for the charts based on logged workouts
  const lineData = {
    labels: workouts.map(workout => workout.date).slice(-4), // Get last 4 entries for x-axis
    datasets: [
      {
        label: 'Calories Burned',
        data: workouts.map(workout => workout.calories).slice(-4), // Get last 4 calories entries
        borderColor: 'rgba(75, 192, 192, 1)', // Change border color for line chart
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Placeholder background color
        borderWidth: 2,
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Activity type data
  const activityDuration = workouts.reduce((acc, workout) => {
    acc[workout.activity] = (acc[workout.activity] || 0) + Number(workout.duration);
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(activityDuration),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: Object.values(activityDuration),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Change background color for bar chart
      },
    ],
  };

  // Create gradient colors for line chart
  const createGradient = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)'); // Start color for line chart
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0)'); // Fades to transparent
    return gradient;
  };

  // Create gradient colors for bar chart
  const createBarGradient = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.6)'); // Start color for bar chart
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0)'); // Fades to transparent
    return gradient;
  };

  // Update gradients when workouts change
  useEffect(() => {
    if (lineChartRef.current) {
      const gradient = createGradient(lineChartRef.current.canvas);
      lineData.datasets[0].backgroundColor = gradient;
      lineChartRef.current.update();
    }

    if (barChartRef.current) {
      const gradient = createBarGradient(barChartRef.current.canvas);
      barData.datasets[0].backgroundColor = gradient;
      barChartRef.current.update();
    }
  }, [workouts]);

  return (
    <Container className="mt-5">
      <h2>Workout Statistics</h2>

      {/* Line Chart for Calories Burned */}
      <h4>Calories Burned Over Time</h4>
      <Line ref={lineChartRef} data={lineData} />

      {/* Bar Chart for Activity Types */}
      <h4>Activity Duration</h4>
      <Bar ref={barChartRef} data={barData} />
    </Container>
  );
};

export default Statistics;


