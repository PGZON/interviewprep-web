import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Layout Components
import DashboardLayout from '../components/Layout/DashboardLayout';

// Pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import OAuthCallback from '../pages/OAuthCallback';
import UserDashboard from '../pages/UserDashboard';
import StartTestPage from '../pages/StartTestPage';
import TestAttemptPage from '../pages/TestAttemptPage';
import TestResultPage from '../pages/TestResultPage';
import ReviewPage from '../pages/ReviewPage';
import ProfilePage from '../pages/ProfilePage';
import ProgressPage from '../pages/ProgressPage';
import AchievementsPage from '../pages/AchievementsPage';
import AdminDashboard from '../pages/AdminDashboard';

// Route Protection
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PageTransition>
          <LandingPage />
        </PageTransition>
      } />
      
      <Route path="/auth" element={
        <PageTransition>
          <AuthPage />
        </PageTransition>
      } />
      
      <Route path="/oauth/callback" element={
        <PageTransition>
          <OAuthCallback />
        </PageTransition>
      } />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        {/* Nested dashboard routes */}
        <Route index element={
          <PageTransition>
            <UserDashboard />
          </PageTransition>
        } />
        
        <Route path="test" element={
          <PageTransition>
            <StartTestPage />
          </PageTransition>
        } />
        
        <Route path="test/attempt" element={
          <PageTransition>
            <TestAttemptPage />
          </PageTransition>
        } />
        
        <Route path="test/results" element={
          <PageTransition>
            <TestResultPage />
          </PageTransition>
        } />
        
        <Route path="review" element={
          <PageTransition>
            <ReviewPage />
          </PageTransition>
        } />
        
        <Route path="progress" element={
          <PageTransition>
            <ProgressPage />
          </PageTransition>
        } />
        
        <Route path="achievements" element={
          <PageTransition>
            <AchievementsPage />
          </PageTransition>
        } />
        
        <Route path="profile" element={
          <PageTransition>
            <ProfilePage />
          </PageTransition>
        } />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <PageTransition>
            <AdminDashboard />
          </PageTransition>
        </AdminRoute>
      } />

      {/* Legacy route support - redirect old paths */}
      <Route path="/test" element={<Navigate to="/dashboard/test" replace />} />
      <Route path="/review" element={<Navigate to="/dashboard/review" replace />} />
      <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
      
      {/* Logout route */}
      <Route path="/logout" element={<Navigate to="/auth" replace />} />
      
      {/* Catch all - redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
