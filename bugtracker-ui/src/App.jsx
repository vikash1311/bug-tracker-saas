import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import BugList from './pages/BugList';
import BugDetail from './pages/BugDetail';
import CreateBug from './pages/CreateBug';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Navbar />
              <ProjectList />
            </ProtectedRoute>
          } />
          <Route path="/bugs/project/:projectId" element={
            <ProtectedRoute>
              <Navbar />
              <BugList />
            </ProtectedRoute>
          } />
          <Route path="/bugs/:id" element={
            <ProtectedRoute>
              <Navbar />
              <BugDetail />
            </ProtectedRoute>
          } />
          <Route path="/bugs/create" element={
            <ProtectedRoute>
              <Navbar />
              <CreateBug />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;