import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose max-w-none">
        <p className="text-xl mb-6">Information about how we use cookies and similar technologies.</p>
        <div className="bg-gray-100 rounded-lg p-8 mt-8">
          <p className="text-lg">Cookie policy content coming soon...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CookiePolicyPage;
