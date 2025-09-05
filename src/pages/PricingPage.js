import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiStar } from 'react-icons/fi';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started with interview preparation",
      features: [
        "5 practice questions per day",
        "Basic performance tracking",
        "Community forum access",
        "Email support",
        "Basic AI feedback"
      ],
      highlighted: false,
      buttonText: "Get Started",
      buttonClass: "bg-gray-800 hover:bg-gray-700"
    },
    {
      name: "Pro",
      price: { monthly: 29, annual: 290 },
      description: "Ideal for serious job seekers and developers",
      features: [
        "Unlimited practice questions",
        "Advanced performance analytics",
        "Mock interviews with AI",
        "Priority email & chat support",
        "Detailed AI code reviews",
        "Custom learning paths",
        "Interview strategy guides"
      ],
      highlighted: true,
      buttonText: "Start Free Trial",
      buttonClass: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
    },
    {
      name: "Enterprise",
      price: { monthly: 99, annual: 990 },
      description: "For teams and organizations",
      features: [
        "Everything in Pro plan",
        "Team management dashboard",
        "Custom question bank",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics & reporting",
        "SSO & security features"
      ],
      highlighted: false,
      buttonText: "Contact Sales",
      buttonClass: "bg-gray-800 hover:bg-gray-700"
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
          Simple, Transparent 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Pricing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-10"
        >
          Choose the perfect plan for your interview preparation needs
        </motion.p>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center space-x-4"
        >
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-16 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-colors duration-300"
          >
            <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-300 ${
              billingCycle === 'monthly' ? 'left-1' : 'left-9'
            }`} />
          </button>
          <div className="flex items-center">
            <span className={`text-sm ${billingCycle === 'annual' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Annual</span>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Save 20%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
                plan.highlighted ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                    <FiStar className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹{billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}</span>
                <span className="text-gray-500">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
