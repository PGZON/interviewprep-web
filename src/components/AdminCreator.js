import React, { useState } from 'react';
import { createDefaultAdmin, registerUser, checkAdminStatus } from '../utils/adminCreator';

const AdminCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: 'admin@interviewprep.com',
    password: 'Admin123!',
    name: 'System Administrator'
  });

  const isAdmin = checkAdminStatus();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateDefaultAdmin = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await createDefaultAdmin();
      setMessage(`✅ Default admin user created successfully! Email: ${result.email || 'admin@interviewprep.com'}`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
      console.error('Admin creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCustomAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await registerUser(formData);
      setMessage(`✅ Admin user registered successfully! Email: ${formData.email}. You may need to manually set the role to ADMIN in the database.`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
      console.error('Admin creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-800 mb-4">✅ Admin Access Confirmed</h2>
        <p className="text-green-700">You already have admin access! You can access the admin panel at:</p>
        <a 
          href="/admin" 
          className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go to Admin Panel
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Admin User</h2>
      
      {/* Quick Default Admin Creation */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Quick Setup</h3>
        <p className="text-sm text-blue-700 mb-3">
          Create a default admin user with preset credentials:
        </p>
        <ul className="text-xs text-blue-600 mb-3">
          <li>• Email: admin@interviewprep.com</li>
          <li>• Password: Admin123!</li>
          <li>• Name: System Administrator</li>
        </ul>
        <button
          onClick={handleCreateDefaultAdmin}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Default Admin'}
        </button>
      </div>

      {/* Custom Admin Creation Form */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-800 mb-4">Custom Admin User</h3>
        <form onSubmit={handleCreateCustomAdmin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Custom Admin'}
          </button>
        </form>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mt-4 p-3 rounded ${
          message.includes('✅') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• If backend doesn't support direct admin creation, user will be created as regular user</li>
          <li>• You may need to manually update the user role to 'ADMIN' in your database</li>
          <li>• Check your Spring Boot backend logs for any errors</li>
          <li>• Admin access is required to view /admin routes</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminCreator;
