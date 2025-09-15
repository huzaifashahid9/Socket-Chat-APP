import React from "react";
import Form from "./modules/Form";
import Dashboard from "./modules/Dashboard";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null;
  if (!isLoggedIn) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null;
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/login"
        element={
          <PublicRoute>
            <Form isSignInPage={true} />
          </PublicRoute>
        }
      />
      <Route
        path="/user/sign_up"
        element={
          <PublicRoute>
            <Form isSignInPage={false} />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default App;
