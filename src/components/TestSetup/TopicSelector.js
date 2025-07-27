import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiMonitor, 
  FiDatabase, 
  FiCode, 
  FiLayers, 
  FiGlobe, 
  FiWifi, 
  FiSettings,
  FiCoffee
} from 'react-icons/fi';

const TopicSelector = ({ selectedTopic, onTopicSelect }) => {
  const topics = [
    { 
      label: "Operating System", 
      value: "OS", 
      icon: FiMonitor, 
      color: "from-blue-500 to-cyan-500",
      description: "Process, memory, file systems"
    },
    { 
      label: "DBMS", 
      value: "DBMS", 
      icon: FiDatabase, 
      color: "from-emerald-500 to-green-500",
      description: "Database concepts, normalization"
    },
    { 
      label: "SQL", 
      value: "SQL", 
      icon: FiCode, 
      color: "from-purple-500 to-violet-500",
      description: "Queries, joins, functions"
    },
    { 
      label: "Java OOPs", 
      value: "Java OOPs", 
      icon: FiCoffee, 
      color: "from-orange-500 to-red-500",
      description: "Classes, inheritance, polymorphism"
    },
    { 
      label: "Data Structures", 
      value: "DSA", 
      icon: FiLayers, 
      color: "from-indigo-500 to-purple-500",
      description: "Arrays, trees, graphs"
    },
    { 
      label: "Web Tech", 
      value: "Web", 
      icon: FiGlobe, 
      color: "from-pink-500 to-rose-500",
      description: "HTML, CSS, JavaScript, frameworks"
    },
    { 
      label: "Networking", 
      value: "Networking", 
      icon: FiWifi, 
      color: "from-teal-500 to-cyan-500",
      description: "TCP/IP, protocols, security"
    },
    { 
      label: "Other", 
      value: "Other", 
      icon: FiSettings, 
      color: "from-gray-500 to-slate-500",
      description: "Custom topic of your choice"
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Subject</h3>
        <p className="text-sm text-gray-600 mb-4">Select the tech subject you want to master</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topics.map((topic, index) => {
          const IconComponent = topic.icon;
          const isSelected = selectedTopic === topic.value;
          
          return (
            <motion.div
              key={topic.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onTopicSelect(topic.value)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    p-2 rounded-lg bg-gradient-to-r ${topic.color} text-white shadow-md
                  `}>
                    <IconComponent size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {topic.label}
                    </div>
                    <div className={`text-xs mt-1 ${
                      isSelected ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {topic.description}
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3 flex justify-end"
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicSelector;
