import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Layout and Protection
import DashboardLayout from '../components/Layout/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Custom loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Lazy load all pages
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const OAuthCallback = lazy(() => import('../pages/OAuthCallback'));
const FeaturesPage = lazy(() => import('../pages/FeaturesPage'));
const PricingPage = lazy(() => import('../pages/PricingPage'));
const APIPage = lazy(() => import('../pages/APIPage'));
const DemoPage = lazy(() => import('../pages/DemoPage'));
const IntegrationsPage = lazy(() => import('../pages/IntegrationsPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const CareersPage = lazy(() => import('../pages/CareersPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PressPage = lazy(() => import('../pages/PressPage'));
const DocumentationPage = lazy(() => import('../pages/DocumentationPage'));
const HelpCenterPage = lazy(() => import('../pages/HelpCenterPage'));
const CommunityPage = lazy(() => import('../pages/CommunityPage'));
const TutorialsPage = lazy(() => import('../pages/TutorialsPage'));
const StatusPage = lazy(() => import('../pages/StatusPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('../pages/TermsOfServicePage'));
const CookiePolicyPage = lazy(() => import('../pages/CookiePolicyPage'));
const GDPRPage = lazy(() => import('../pages/GDPRPage'));
const SecurityPage = lazy(() => import('../pages/SecurityPage'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));
const StartTestPage = lazy(() => import('../pages/StartTestPage'));
const TestAttemptPage = lazy(() => import('../pages/TestAttemptPage'));
const TestResultPage = lazy(() => import('../pages/TestResultPage'));
const ReviewPage = lazy(() => import('../pages/ReviewPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ProgressPage = lazy(() => import('../pages/ProgressPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));

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
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
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
