import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import useUser hook

const Header = () => {
  const { user, logoutUser } = useUser(); // Get user data and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Call the logout function
    navigate('/'); // Redirect to the login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Fitness Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/log-workout">Log Workout</Nav.Link>
                <Nav.Link as={Link} to="/set-goal">Set Goal</Nav.Link>
                <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/">Home</Nav.Link> // Show only home for non-logged in users
            )}
          </Nav>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="text-white me-3">Welcome, {user.email}</span> {/* Display user name */}
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button> {/* Logout button */}
            </div>
          ) : (
            <Button variant="outline-light" as={Link} to="/login">Login</Button> // Show login button for non-logged in users
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
