import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext'; // Import UserContext

const WorkoutLog = () => {
  const { addWorkout } = useUserContext(); // Get addWorkout from context
  const [workout, setWorkout] = useState({
    activity: '',
    duration: '',
    calories: '',
    date: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(workout); // Add workout to context
    navigate('/dashboard'); // Redirect to dashboard after submission
  };

  return (
    <Container className="mt-5">
      <h2>Log Workout</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formActivity">
          <Form.Label>Activity Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Activity"
            value={workout.activity}
            onChange={(e) => setWorkout({ ...workout, activity: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDuration" className="mt-3">
          <Form.Label>Duration (in minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Duration"
            value={workout.duration}
            onChange={(e) => setWorkout({ ...workout, duration: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCalories" className="mt-3">
          <Form.Label>Calories Burned</Form.Label>
          <Form.Control
            type="number"
            placeholder="Calories"
            value={workout.calories}
            onChange={(e) => setWorkout({ ...workout, calories: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDate" className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={workout.date}
            onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Log Workout
        </Button>
      </Form>
    </Container>
  );
};

export default WorkoutLog;
