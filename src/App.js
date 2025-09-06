import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import AppRoutes from './routes/AppRoutes';
import { initEnvironment } from './config/environmentValidator';
import LoadingSpinner from './components/UI/LoadingSpinner';
import './styles/global.css';

function App() {
  // Initialize configuration and validation
  useEffect(() => {
    initEnvironment();
  }, []);

  return (
    <div className="App">
      <ToastProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
