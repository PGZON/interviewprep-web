import React, { createContext, useContext, useReducer } from 'react';
import axiosInstance from '../api/axiosInstance';

const TestSessionContext = createContext();

// Action types
const TEST_SESSION_ACTIONS = {
  SET_SESSION: 'SET_SESSION',
  SET_QUESTIONS: 'SET_QUESTIONS',
  ADD_QUESTIONS: 'ADD_QUESTIONS',
  SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
  SET_ANSWER: 'SET_ANSWER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_PREFETCHING: 'SET_PREFETCHING'
};

// Initial state
const initialState = {
  sessionId: null,
  batchId: null,
  topic: '',
  difficulty: '',
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  isLoading: false,
  isPrefetching: false,
  error: null,
  totalAnswered: 0
};

// Reducer
const testSessionReducer = (state, action) => {
  switch (action.type) {
    case TEST_SESSION_ACTIONS.SET_SESSION:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        batchId: action.payload.batchId,
        topic: action.payload.topic,
        difficulty: action.payload.difficulty
      };
    
    case TEST_SESSION_ACTIONS.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false
      };
    
    case TEST_SESSION_ACTIONS.ADD_QUESTIONS:
      return {
        ...state,
        questions: [...state.questions, ...action.payload],
        isPrefetching: false
      };
    
    case TEST_SESSION_ACTIONS.SET_CURRENT_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.payload
      };
    
    case TEST_SESSION_ACTIONS.SET_ANSWER:
      const newAnswers = {
        ...state.answers,
        [action.payload.questionId]: action.payload.selectedOption
      };
      
      return {
        ...state,
        answers: newAnswers,
        totalAnswered: Object.keys(newAnswers).length
      };
    
    case TEST_SESSION_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case TEST_SESSION_ACTIONS.SET_PREFETCHING:
      return {
        ...state,
        isPrefetching: action.payload
      };
    
    case TEST_SESSION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isPrefetching: false
      };
    
    default:
      return state;
  }
};

// Provider component
export const TestSessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(testSessionReducer, initialState);

  // Initialize session from localStorage or props
  const initializeSession = (sessionData) => {
    dispatch({
      type: TEST_SESSION_ACTIONS.SET_SESSION,
      payload: sessionData
    });
    
    if (sessionData.questions) {
      dispatch({
        type: TEST_SESSION_ACTIONS.SET_QUESTIONS,
        payload: sessionData.questions
      });
    }
  };

  // Set answer for current question
  const setAnswer = (questionId, selectedOption) => {
    dispatch({
      type: TEST_SESSION_ACTIONS.SET_ANSWER,
      payload: { questionId, selectedOption }
    });
    
    // Also store in localStorage for results page
    const currentAnswers = JSON.parse(localStorage.getItem('testAnswers') || '{}');
    currentAnswers[questionId] = selectedOption;
    localStorage.setItem('testAnswers', JSON.stringify(currentAnswers));
  };

  // Navigate to question
  const goToQuestion = (index) => {
    if (index >= 0 && index < state.questions.length) {
      dispatch({
        type: TEST_SESSION_ACTIONS.SET_CURRENT_INDEX,
        payload: index
      });

      // Prefetch next batch if approaching end
      if (index >= state.questions.length - 3 && !state.isPrefetching) {
        prefetchNextBatch();
      }
    }
  };

  // Go to next question
  const nextQuestion = () => {
    goToQuestion(state.currentQuestionIndex + 1);
  };

  // Go to previous question
  const previousQuestion = () => {
    goToQuestion(state.currentQuestionIndex - 1);
  };

  // Prefetch next batch of questions
  const prefetchNextBatch = async () => {
    if (!state.sessionId || state.isPrefetching) return;
    
    // Skip API calls for demo sessions
    if (state.sessionId.includes('demo-session')) {

      return;
    }

    dispatch({ type: TEST_SESSION_ACTIONS.SET_PREFETCHING, payload: true });

    try {
      const response = await axiosInstance.get(`/mcq/next?sessionId=${state.sessionId}`);
      
      if (response.data && response.data.questions) {
        dispatch({
          type: TEST_SESSION_ACTIONS.ADD_QUESTIONS,
          payload: response.data.questions
        });
      } else {
        dispatch({ type: TEST_SESSION_ACTIONS.SET_PREFETCHING, payload: false });
      }
    } catch (error) {

      dispatch({ type: TEST_SESSION_ACTIONS.SET_PREFETCHING, payload: false });
    }
  };

  // Get current question
  const getCurrentQuestion = () => {
    return state.questions[state.currentQuestionIndex] || null;
  };

  // Get selected answer for current question
  const getCurrentAnswer = () => {
    const currentQuestion = getCurrentQuestion();
    return currentQuestion ? state.answers[currentQuestion.id] : null;
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    return getCurrentAnswer() !== null && getCurrentAnswer() !== undefined;
  };

  // Get progress percentage
  const getProgress = () => {
    return state.questions.length > 0 
      ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100 
      : 0;
  };

  // Check if at first question
  const isFirstQuestion = () => {
    return state.currentQuestionIndex === 0;
  };

  // Check if at last question
  const isLastQuestion = () => {
    return state.currentQuestionIndex === state.questions.length - 1;
  };

  const value = {
    // State
    ...state,
    
    // Actions
    initializeSession,
    setAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    
    // Computed values
    getCurrentQuestion,
    getCurrentAnswer,
    isCurrentQuestionAnswered,
    getProgress,
    isFirstQuestion,
    isLastQuestion
  };

  return (
    <TestSessionContext.Provider value={value}>
      {children}
    </TestSessionContext.Provider>
  );
};

// Hook to use the context
export const useTestSession = () => {
  const context = useContext(TestSessionContext);
  if (!context) {
    throw new Error('useTestSession must be used within a TestSessionProvider');
  }
  return context;
};

export default TestSessionContext;
