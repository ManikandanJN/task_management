import React from "react";
import LoginPage from "./login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./auth/public-route";
import PrivateRoute from "./auth/private-route";
import TaskPage from "./task-page";
import NotFoundPage from "./components/404page";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
