import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image_8a255f.png';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add logic to send password reset email
    console.log('Password reset email sent to:', email);
    // Navigate to a confirmation page or back to login
    navigate('/login');
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
                  <h1 className="text-2xl font-bold text-[#21589C]">Forgot Your Password?</h1>
                  <p className="text-gray-600 font-sans mt-1">
                    Enter your email and we'll send you a password reset link.
                  </p>
                </div>
              </div>
            </div>

            {/* Forgot Password Form */}
            <form onSubmit={handleSendEmail} className="space-y-4">
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
              <button
                type="submit"
                className="w-full bg-[#21589C] text-white py-3 rounded-md hover:bg-[#21589C]/90 transition-colors duration-200 font-semibold"
              >
                Send
              </button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <button
                className="text-sm font-medium text-[#21589C] hover:text-[#21589C]/80 font-sans"
                onClick={() => navigate('/login')}
              >
                Remember your password? Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;