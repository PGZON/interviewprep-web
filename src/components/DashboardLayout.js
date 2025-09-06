import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiBook, FiAward, FiUser, FiSettings, 
  FiBarChart2, FiMenu, FiX, FiLogOut
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Practice Tests', href: '/tests', icon: FiBook },
    { name: 'Progress', href: '/progress', icon: FiBarChart2 },
    { name: 'Achievements', href: '/achievements', icon: FiAward },
    { name: 'Profile', href: '/profile', icon: FiUser },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200
        transition duration-300 lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/AppLogo.svg" alt="InterviewPrep Logo" className="w-full h-full p-1.5 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">InterviewPrep</span>
              <span className="text-xs font-medium text-indigo-600">AI Powered</span>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    ${isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon className={`
                    w-5 h-5 mr-3
                    ${isActive ? 'text-indigo-600' : 'text-gray-400'}
                  `} />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 lg:ml-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 bg-white border-b border-gray-200 lg:hidden">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/AppLogo.svg" alt="InterviewPrep Logo" className="w-full h-full p-1.5 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">InterviewPrep</span>
                <span className="text-xs font-medium text-indigo-600">AI Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
