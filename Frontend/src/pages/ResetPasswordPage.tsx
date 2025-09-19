import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image_8a255f.png";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill email from query if available
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [location.search]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      setIsSuccess(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password reset successful. Redirecting...");
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Failed to reset password.");
        setIsSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error, try again later.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-4">
            <img
              src={logo}
              alt="Career Companion Logo"
              className="h-20 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-[#21589C]">Reset Password</h1>
            <p className="text-gray-600 mt-1">
              Enter the OTP code sent to your email and your new password.
            </p>
          </div>
        </div>

        {/* Reset Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#21589C] 
                       focus:border-transparent"
            required
            disabled={!!new URLSearchParams(location.search).get("email")}
          />
          <input
            type="text"
            placeholder="OTP Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#21589C] 
                       focus:border-transparent"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#21589C] 
                       focus:border-transparent"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-[#21589C] 
                       focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#21589C] text-white py-3 rounded-md 
                       hover:bg-[#21589C]/90 transition-colors duration-200 
                       font-semibold"
          >
            RESET PASSWORD
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-sans ${
              isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
