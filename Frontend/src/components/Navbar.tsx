import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    GraduationCap,
    MoreVertical,
    User,
    LogOut,
    Settings as SettingsIcon,
    Menu,
    Search,
    BellDot,
} from 'lucide-react';

interface NavbarProps {
    userType?: 'student' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ userType = 'student' }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.navbar-dropdown') && !target.closest('.more-vertical-button')) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-1 py-1 flex items-center justify-between">
            {/* Left section: Menu, Career Companion Logo & Text */}
            <div className="flex items-center space-x-1">
                <button
                    onClick={() => console.log('Toggle sidebar')}
                    className="p-0.5 rounded-sm hover:bg-gray-100"
                >
                    <Menu className="h-3 w-3 text-gray-600" />
                </button>
                <GraduationCap className="h-4 w-4 text-cs-blue" />
                <span
                    className="text-xs font-bold font-sans text-gray-900"
                    style={{ fontFamily: 'Inter' }}
                >
                    Career Companion
                </span>
            </div>

            {/* Middle section: Search Bar, Notification Bell, User Avatar */}
            <div className="flex items-center space-x-1">
                {/* Search Bar */}
                <div className="relative flex items-center">
                    <Search className="absolute left-1.5 text-gray-400 h-2.5 w-2.5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-6 pr-1 py-0.5 w-24 text-xs border border-gray-300 rounded-sm focus:ring-cs-blue focus:border-cs-blue transition-colors duration-200"
                    />
                </div>

                {/* Notification Bell */}
                <button className="p-0.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    <BellDot className="h-3.5 w-3.5 text-gray-600" />
                </button>

                {/* AJ Circle (User Avatar) */}
                <div className="flex items-center justify-center bg-cs-blue/10 text-cs-blue font-semibold rounded-full h-5 w-5 text-xs flex-shrink-0">
                    AJ
                </div>
            </div>

            {/* Right section: MoreVertical Dropdown */}
            <div className="relative navbar-dropdown">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="p-0.5 rounded-lg hover:bg-gray-100 more-vertical-button"
                >
                    <MoreVertical className="h-3.5 w-3.5 text-gray-600" />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <Link
                            to={userType === 'admin' ? '/admin/profile' : '/user/profile'}
                            onClick={() => setDropdownOpen(false)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </Link>
                        <Link
                            to={userType === 'admin' ? '/admin/settings' : '/user/settings'}
                            onClick={() => setDropdownOpen(false)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                            <SettingsIcon className="h-4 w-4 mr-2" />
                            Settings
                        </Link>
                        <hr className="my-1" />
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;