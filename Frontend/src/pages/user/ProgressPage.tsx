import React from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout role="student">
      <div className="p-8 max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/user/skill-gap')}
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-medium"
        >
          ← Back to Skill Gap Analyzer
        </button>
        <h1 className="text-2xl font-bold mb-4">Progress Dashboard</h1>
        <p className="mb-4">This page will show your skill levels over time and courses completed.</p>
        {/* TODO: Implement progress dashboard UI */}
      </div>
    </Layout>
  );
};

export default ProgressPage; 