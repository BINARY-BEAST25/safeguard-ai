import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChildrenPage from './pages/ChildrenPage';
import ActivityPage from './pages/ActivityPage';
import AnalyticsPage from './pages/AnalyticsPage';
import Layout from './components/layout/Layout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loading">Loading PhishGuard Sentinel...</div>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#122130', color: '#e6f4ff', border: '1px solid #22384b' },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="children" element={<ChildrenPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
