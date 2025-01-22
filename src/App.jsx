 import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductForm from './components/ProductForms';
import LogInMayukh from './components/LogInMayukh';
import ProductDelete from './components/ProductDeleteForm';
import ProductModify from './components/ProductModifyForm';
import './App.css';

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check if token exists

  if (!authToken) {
    // If no token, redirect to login page
    return <Navigate to="/" />;
  }

  return children; // Render the children (ProductForm) if authenticated
};

const App = () => {
  return (
    <Router>
      <Routes>
      <Route
          path="/ProductForm"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route path="/ProductDelete"
        element={
          <PrivateRoute>
            <ProductDelete></ProductDelete>
          </PrivateRoute>
        }></Route>
          <Route path="/ProductModify"
        element={
          <PrivateRoute>
            <ProductModify></ProductModify>
          </PrivateRoute>
        }></Route>
        {/* Login Route */}
        <Route path="/*" element={<LogInMayukh />} />

        {/* Protected Route for ProductForm */}
        <Route
          path="/ProductForm"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
