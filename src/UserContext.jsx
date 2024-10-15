import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for managing user state
const UserContext = createContext();

// Custom hook to access UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component that wraps the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [workouts, setWorkouts] = useState(() => {
    // Initialize workouts state from localStorage
    const storedWorkouts = localStorage.getItem('workouts');
    return storedWorkouts ? JSON.parse(storedWorkouts) : [];
  });

  const [goal, setGoal] = useState(() => {
    // Initialize goal state from localStorage
    return localStorage.getItem('goal') || '';
  });

  const addWorkout = (workout) => {
    const updatedWorkouts = [...workouts, workout];
    setWorkouts(updatedWorkouts); // Update state
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts)); // Save to localStorage
  };

  const loginUser = (userData) => {
    setUser(userData); // Set user when logged in
    localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
  };

  const logoutUser = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  const updateGoal = (newGoal) => {
    setGoal(newGoal); // Update the goal state
    localStorage.setItem('goal', newGoal); // Save goal to localStorage
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, workouts, addWorkout, goal, updateGoal }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
