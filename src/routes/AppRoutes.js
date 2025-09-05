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
import FeaturesPage from '../pages/FeaturesPage';
import PricingPage from '../pages/PricingPage';
import APIPage from '../pages/APIPage';
import DemoPage from '../pages/DemoPage';
import IntegrationsPage from '../pages/IntegrationsPage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import CareersPage from '../pages/CareersPage';
import ContactPage from '../pages/ContactPage';
import PressPage from '../pages/PressPage';
import DocumentationPage from '../pages/DocumentationPage';
import HelpCenterPage from '../pages/HelpCenterPage';
import CommunityPage from '../pages/CommunityPage';
import TutorialsPage from '../pages/TutorialsPage';
import StatusPage from '../pages/StatusPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import CookiePolicyPage from '../pages/CookiePolicyPage';
import GDPRPage from '../pages/GDPRPage';
import SecurityPage from '../pages/SecurityPage';
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

      <Route path="/features" element={
        <PageTransition>
          <FeaturesPage />
        </PageTransition>
      } />

      <Route path="/pricing" element={
        <PageTransition>
          <PricingPage />
        </PageTransition>
      } />

      <Route path="/api" element={
        <PageTransition>
          <APIPage />
        </PageTransition>
      } />

      <Route path="/demo" element={
        <PageTransition>
          <DemoPage />
        </PageTransition>
      } />

      <Route path="/integrations" element={
        <PageTransition>
          <IntegrationsPage />
        </PageTransition>
      } />

      <Route path="/about" element={
        <PageTransition>
          <AboutPage />
        </PageTransition>
      } />

      <Route path="/blog" element={
        <PageTransition>
          <BlogPage />
        </PageTransition>
      } />

      <Route path="/careers" element={
        <PageTransition>
          <CareersPage />
        </PageTransition>
      } />

      <Route path="/contact" element={
        <PageTransition>
          <ContactPage />
        </PageTransition>
      } />

      <Route path="/press" element={
        <PageTransition>
          <PressPage />
        </PageTransition>
      } />

      <Route path="/docs" element={
        <PageTransition>
          <DocumentationPage />
        </PageTransition>
      } />

      <Route path="/help" element={
        <PageTransition>
          <HelpCenterPage />
        </PageTransition>
      } />

      <Route path="/community" element={
        <PageTransition>
          <CommunityPage />
        </PageTransition>
      } />

      <Route path="/tutorials" element={
        <PageTransition>
          <TutorialsPage />
        </PageTransition>
      } />

      <Route path="/status" element={
        <PageTransition>
          <StatusPage />
        </PageTransition>
      } />

      <Route path="/privacy" element={
        <PageTransition>
          <PrivacyPolicyPage />
        </PageTransition>
      } />

      <Route path="/terms" element={
        <PageTransition>
          <TermsOfServicePage />
        </PageTransition>
      } />

      <Route path="/cookies" element={
        <PageTransition>
          <CookiePolicyPage />
        </PageTransition>
      } />

      <Route path="/gdpr" element={
        <PageTransition>
          <GDPRPage />
        </PageTransition>
      } />

      <Route path="/security" element={
        <PageTransition>
          <SecurityPage />
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
