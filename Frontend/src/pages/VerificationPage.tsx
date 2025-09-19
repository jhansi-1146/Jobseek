import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import axios from "axios";

const VerificationPage: React.FC = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email from signup navigation
  const email = (location.state as { email?: string })?.email;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup/verify", {
        email,
        code,
      });

      // ✅ Save JWT token
      localStorage.setItem("token", res.data.token);

      setMessage("Account verified successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  const handleChangeDetails = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
                  <h1 className="text-2xl font-bold text-blue-900">
                    Verify Your Account
                  </h1>
                  <p className="text-gray-600 font-sans">
                    Enter the 6-digit code sent to your email
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
                  onChange={(e) =>
                    setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
                  }
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans text-center tracking-widest text-lg"
                  placeholder="------"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Verify & Create Account
              </button>
            </form>

            {/* Error / Success Message */}
            {message && (
              <p className="text-center mt-3 text-sm text-red-500">{message}</p>
            )}

            {/* Change Details Link */}
            <div className="text-center mt-6">
              <button
                className="text-blue-600 hover:text-blue-700 font-medium text-sm font-sans"
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
