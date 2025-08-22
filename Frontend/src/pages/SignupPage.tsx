import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add real signup logic here
    navigate('/verification');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 m-0">
      <div className="w-full h-screen">
        <div className="bg-white w-full h-full flex items-center justify-center">
          <div className="max-w-md w-full p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">Join Career Companion</h1>
                  <p className="text-gray-600 font-sans">Create your account</p>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSendVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 font-sans">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 font-sans">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 font-sans">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 font-sans">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Send Verification Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
