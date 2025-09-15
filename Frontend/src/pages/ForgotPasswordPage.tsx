import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image_8a255f.png';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        // Navigate to the reset password page with the email pre-filled as a query parameter
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        // Display an error message if the API call was not successful
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Career Companion Logo" className="h-20 w-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#21589C]">Forgot Your Password?</h1>
            <p className="text-gray-600 font-sans mt-1">
              Enter your email and we'll send you a password reset link.
            </p>
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
  );
};

export default ForgotPasswordPage;