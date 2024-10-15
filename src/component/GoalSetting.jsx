import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const GoalSetting = () => {
  const [goal, setGoal] = useState('');

  const handleSetGoal = (e) => {
    e.preventDefault();
    // Save goal to localStorage
    localStorage.setItem('fitnessGoal', goal);
    setGoal(''); // Clear the input after submission
  };

  return (
    <Container className="mt-5">
      <h2>Set Fitness Goal</h2>
      <Form onSubmit={handleSetGoal}>
        <Form.Group controlId="formGoal">
          <Form.Label>Weekly or Monthly Goal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Set Goal
        </Button>
      </Form>
    </Container>
  );
};

export default GoalSetting;
