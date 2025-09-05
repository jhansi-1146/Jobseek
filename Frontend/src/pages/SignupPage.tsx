import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image_8a255f.png';

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

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 m-0">
      <div className="w-full h-screen">
        <div className="bg-white w-full h-full flex items-center justify-center">
          <div className="max-w-md w-full p-8 relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-auto h-auto mr-0">
                  <img src={logo} alt="Career Companion Logo" className="h-24 w-auto" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#21589C]">Join Career Companion</h1>
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans"
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans"
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans"
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
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#21589C] text-white py-3 rounded-md hover:bg-[#21589C]/90 transition-colors duration-200 font-semibold"
              >
                Send Verification Code
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 font-sans">
                Already have an account?{' '}
                <button
                  className="text-[#21589C] hover:text-[#21589C]/80 font-medium"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;