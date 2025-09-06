import React from 'react';
import { FiBell, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      title: "New Practice Test Available",
      message: "System Design patterns test is now ready",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Achievement Unlocked",
      message: "Completed 5 days streak!",
      time: "1 day ago"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Algorithm Practice",
      time: "Today, 3:00 PM",
      duration: "1 hour"
    },
    {
      id: 2,
      title: "Mock Interview",
      time: "Tomorrow, 2:00 PM",
      duration: "45 minutes"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Notifications & Events</h2>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <FiBell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <FiCalendar className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.time}</p>
                  <span className="text-xs text-gray-500">Duration: {event.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsPanel;
