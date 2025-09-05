import React from 'react';
import { motion } from 'framer-motion';

const IntegrationsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Integrations</h1>
      <div className="prose max-w-none">
        <p className="text-xl mb-6">Connect your favorite tools and services with our platform.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Add integration cards here */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p>Integration details will be available soon.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegrationsPage;
