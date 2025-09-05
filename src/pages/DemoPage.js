import React from 'react';
import { motion } from 'framer-motion';

const DemoPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Interactive Demo</h1>
      <div className="prose max-w-none">
        <p className="text-xl mb-6">Experience our platform firsthand with our interactive demo.</p>
        {/* Add demo content here */}
        <div className="bg-gray-100 rounded-lg p-8 mt-8">
          <p className="text-lg">Demo content coming soon...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoPage;
