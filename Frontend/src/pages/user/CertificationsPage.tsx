import React from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';

const CertificationsPage: React.FC = () => {
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
        <h1 className="text-2xl font-bold mb-4">Recommended Certifications</h1>
        <p className="mb-4">This page will display recommended certifications based on your missing skills.</p>
        {/* TODO: Implement certifications recommendation UI */}
      </div>
    </Layout>
  );
};

export default CertificationsPage; 