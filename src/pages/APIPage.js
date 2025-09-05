import React from 'react';
import { motion } from 'framer-motion';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const APIPage = () => {
  const codeExamples = {
    authentication: `const getAccessToken = async () => {
  const response = await fetch('https://api.interviewprep.ai/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: 'your_api_key_here'
    })
  });
  return response.json();
};`,
    questions: `// Get a random interview question
const getQuestion = async (topic, difficulty) => {
  const response = await fetch('https://api.interviewprep.ai/questions/random', {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      topic: topic,
      difficulty: difficulty
    })
  });
  return response.json();
};`,
    evaluation: `// Submit answer for evaluation
const evaluateAnswer = async (questionId, answer) => {
  const response = await fetch('https://api.interviewprep.ai/evaluate', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      questionId: questionId,
      answer: answer
    })
  });
  return response.json();
};`
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/auth/token',
      description: 'Get access token using API key'
    },
    {
      method: 'GET',
      path: '/questions/random',
      description: 'Get random interview questions'
    },
    {
      method: 'POST',
      path: '/evaluate',
      description: 'Submit and evaluate answers'
    },
    {
      method: 'GET',
      path: '/topics',
      description: 'List available question topics'
    },
    {
      method: 'GET',
      path: '/analytics',
      description: 'Get performance analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          API 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Documentation</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Integrate InterviewPrep's AI capabilities into your own applications
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Authentication Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
          <div className="bg-gray-900 rounded-2xl p-6 mb-8">
            <SyntaxHighlighter 
              language="javascript" 
              style={atomDark}
              showLineNumbers={true}
              className="rounded-xl"
            >
              {codeExamples.authentication}
            </SyntaxHighlighter>
          </div>
        </motion.section>

        {/* Endpoints Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {endpoints.map((endpoint, index) => (
              <div 
                key={endpoint.path}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    endpoint.method === 'GET' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-purple-600 font-mono">{endpoint.path}</code>
                </div>
                <p className="text-gray-600">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Code Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Code Examples</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Questions</h3>
              <div className="bg-gray-900 rounded-2xl p-6">
                <SyntaxHighlighter 
                  language="javascript" 
                  style={atomDark}
                  showLineNumbers={true}
                  className="rounded-xl"
                >
                  {codeExamples.questions}
                </SyntaxHighlighter>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Answer Evaluation</h3>
              <div className="bg-gray-900 rounded-2xl p-6">
                <SyntaxHighlighter 
                  language="javascript" 
                  style={atomDark}
                  showLineNumbers={true}
                  className="rounded-xl"
                >
                  {codeExamples.evaluation}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Get API Access
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default APIPage;
