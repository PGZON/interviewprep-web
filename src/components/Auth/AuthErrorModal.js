import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX, FiLogIn, FiShield } from 'react-icons/fi';

const AuthErrorModal = ({ 
  sessionExpired, 
  accessForbidden, 
  forbiddenMessage, 
  onDismissSession, 
  onDismissForbidden 
}) => {
  return (
    <AnimatePresence>
      {(sessionExpired || accessForbidden) && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={sessionExpired ? onDismissSession : onDismissForbidden}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border">
              {sessionExpired && (
                <>
                  {/* Session Expired */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FiAlertTriangle className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Session Expired</h3>
                      <p className="text-sm text-gray-600">Your login session has expired</p>
                    </div>
                    <button
                      onClick={onDismissSession}
                      className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX size={20} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-700">
                      For your security, you've been logged out due to inactivity. 
                      Please log in again to continue.
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={onDismissSession}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FiLogIn size={16} />
                      <span>Go to Login</span>
                    </button>
                  </div>
                </>
              )}
              
              {accessForbidden && (
                <>
                  {/* Access Forbidden */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FiShield className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Access Forbidden</h3>
                      <p className="text-sm text-gray-600">You don't have permission for this action</p>
                    </div>
                    <button
                      onClick={onDismissForbidden}
                      className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX size={20} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-700">
                      {forbiddenMessage || 'You do not have sufficient permissions to access this resource.'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={onDismissForbidden}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthErrorModal;
