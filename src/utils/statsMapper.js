/**
 * Stats Mapper Utility
 * Handles mapping between backend response and frontend stats structure
 */

export const mapBackendStatsToFrontend = (backendStats) => {
  if (!backendStats || typeof backendStats !== 'object') {
    return null;
  }

  console.log('📊 Mapping backend stats:', backendStats);

  // Handle different possible backend response structures
  const mapped = {
    totalTests: extractNumber(backendStats, [
      'totalTests', 
      'testsCompleted', 
      'totalTestsAttempted',
      'testCount',
      'numberOfTests'
    ]),
    
    averageScore: extractNumber(backendStats, [
      'averageScore', 
      'avgScore', 
      'overallAccuracy',
      'meanScore',
      'averagePercentage'
    ]),
    
    strongestTopic: extractString(backendStats, [
      'strongestTopic', 
      'bestTopic', 
      'topicStrength',
      'strongTopic',
      'bestPerformingTopic'
    ]),
    
    weakestTopic: extractString(backendStats, [
      'weakestTopic', 
      'worstTopic', 
      'topicWeakness',
      'weakTopic',
      'poorestPerformingTopic'
    ]),
    
    totalTimeSpent: extractNumber(backendStats, [
      'totalTimeSpent', 
      'timeSpent', 
      'totalDuration',
      'studyTime',
      'totalMinutes'
    ]),
    
    completionRate: extractNumber(backendStats, [
      'completionRate', 
      'testCompletionRate',
      'completionPercentage',
      'finishRate'
    ], 100) // Default to 100 if not found
  };

  console.log('📊 Mapped stats result:', mapped);
  return mapped;
};

// Helper function to extract number values with fallbacks
const extractNumber = (obj, keys, defaultValue = 0) => {
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      const num = Number(value);
      if (!isNaN(num)) {
        return num;
      }
    }
  }
  return defaultValue;
};

// Helper function to extract string values with fallbacks
const extractString = (obj, keys, defaultValue = 'N/A') => {
  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return defaultValue;
};

// Validate stats structure
export const validateStats = (stats) => {
  if (!stats || typeof stats !== 'object') {
    return getDefaultStats();
  }

  return {
    totalTests: Number(stats.totalTests) || 0,
    averageScore: Number(stats.averageScore) || 0,
    strongestTopic: stats.strongestTopic || 'N/A',
    weakestTopic: stats.weakestTopic || 'N/A',
    totalTimeSpent: Number(stats.totalTimeSpent) || 0,
    completionRate: Number(stats.completionRate) || 0
  };
};

// Get default stats structure
export const getDefaultStats = () => ({
  totalTests: 0,
  averageScore: 0,
  strongestTopic: 'N/A',
  weakestTopic: 'N/A',
  totalTimeSpent: 0,
  completionRate: 0
});

// Check if stats have meaningful data
export const hasStatsData = (stats) => {
  if (!stats) return false;
  
  return stats.totalTests > 0 || 
         stats.averageScore > 0 || 
         (stats.strongestTopic && stats.strongestTopic !== 'N/A') ||
         stats.totalTimeSpent > 0;
};
