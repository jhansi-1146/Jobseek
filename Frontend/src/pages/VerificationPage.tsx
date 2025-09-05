import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image_8a255f.png';

const VerificationPage: React.FC = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add real verification logic here
    navigate('/dashboard');
  };

  const handleChangeDetails = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full h-screen">
        <div className="bg-white w-full h-full flex items-center justify-center">
          <div className="max-w-md w-full p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <img src={logo} alt="Career Companion Logo" className="h-24 w-auto mr-2" />
                <div>
                  <h1 className="text-2xl font-bold text-[#21589C]">Verify Your Account</h1>
                  <p className="text-gray-600 font-sans">
                    Enter the 6-digit code sent to your email/phone
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 font-sans">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans text-center tracking-widest text-lg"
                  placeholder="------"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#21589C] text-white py-3 rounded-md hover:bg-[#21589C]/90 transition-colors duration-200 font-semibold"
              >
                Verify & Create Account
              </button>
            </form>

            {/* Change Details Link */}
            <div className="text-center mt-6">
              <button
                className="text-[#21589C] hover:text-[#21589C]/80 font-medium text-sm font-sans"
                onClick={handleChangeDetails}
              >
                Change Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;