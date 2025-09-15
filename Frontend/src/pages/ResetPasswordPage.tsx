import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/image_8a255f.png';

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (!token) {
            setMessage('Invalid or missing password reset token.');
        }
    }, [location.search]);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        // TODO: Add logic to send new password and token to your backend API
        // For demonstration, we'll simulate a successful reset
        setMessage('Password reset successful. Redirecting to login...');
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <img src={logo} alt="Company Logo" className="h-16 w-auto" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#21589C] mb-2">Reset Password</h1>
                    <p className="text-gray-600">
                        Enter a new password for your account.
                    </p>
                </div>

                {/* Password Reset Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21589C] focus:border-transparent font-sans"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#21589C] text-white py-3 rounded-md hover:bg-[#21589C]/90 transition-colors duration-200 font-semibold"
                    >
                        RESET PASSWORD
                    </button>
                </form>

                {/* Message to the user */}
                {message && <p className="mt-4 text-center text-sm font-sans text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordPage;