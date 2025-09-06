import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize the root with concurrent mode
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Defer non-critical operations
const deferredOperations = () => {
  // Report web vitals after initial render
  reportWebVitals(console.log);
  
  // Preload critical assets or data
  const preloadAssets = () => {
    // Add preloading logic here
    const links = [
      { rel: 'dns-prefetch', href: process.env.REACT_APP_API_BASE_URL },
      { rel: 'preconnect', href: process.env.REACT_APP_API_BASE_URL }
    ];
    
    links.forEach(link => {
      const linkEl = document.createElement('link');
      linkEl.rel = link.rel;
      linkEl.href = link.href;
      document.head.appendChild(linkEl);
    });
  };

  // Execute preloading after 1 second
  setTimeout(preloadAssets, 1000);
};

// Execute deferred operations
if (window.requestIdleCallback) {
  window.requestIdleCallback(deferredOperations);
} else {
  setTimeout(deferredOperations, 1);
}
