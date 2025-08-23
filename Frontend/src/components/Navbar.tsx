import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  MoreVertical,
  User,
  LogOut,
  Settings as SettingsIcon,
  Menu,
  Search,
  Bell,
} from 'lucide-react';

interface NavbarProps {
  userType?: 'student' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ userType = 'student' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
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
    <nav className="bg-white border-b border-gray-200 px-2 py-2 flex items-center justify-between"> {/* Minimized horizontal (px-2) and vertical (py-2) padding */}
      {/* Left section: Menu, Career Companion Logo & Text */}
      <div className="flex items-center space-x-1"> {/* Minimal space-x */}
        <button
          onClick={() => console.log('Toggle sidebar')}
          className="p-0.5 rounded-sm hover:bg-gray-100 border-2 border-transparent"
        >
          <Menu className="h-3 w-3 text-gray-600" /> {/* Very small icon h-3 w-3 */}
        </button>
        <GraduationCap className="h-4 w-4 text-blue-600" /> {/* Very small icon h-4 w-4 */}
        <span
          className="text-sm font-bold font-sans text-gray-900" // Smallest practical font size
          style={{ fontFamily: 'Inter' }}
        >
          Career Companion
        </span>
      </div>

      {/* Middle section: Search Bar, Notification Bell, User Avatar */}
      <div className="flex items-center space-x-1.5"> {/* Minimal space-x */}
        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-1.5 text-gray-400 h-2.5 w-2.5" /> {/* Extremely small search icon h-2.5 w-2.5 */}
          <input
            type="text"
            placeholder="Search..."
            className="pl-6 pr-1 py-0.5 w-32 text-xs border border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            // Adjusted: minimal vertical padding (py-0.5), very narrow width (w-32), smallest text (text-xs), rounded-sm
          />
        </div>

        {/* Notification Bell */}
        <button className="p-0.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <Bell className="h-3.5 w-3.5 text-gray-600" /> {/* Very small icon h-3.5 w-3.5 */}
        </button>

        {/* AJ Circle (User Avatar) */}
        <div className="flex items-center justify-center bg-blue-100 text-blue-700 font-semibold rounded-full h-5 w-5 text-xs flex-shrink-0">
          {/* Very small height and width (h-5 w-5), smallest text (text-xs) */}
          AJ
        </div>
      </div>

      {/* Right section: MoreVertical Dropdown */}
      <div className="relative navbar-dropdown">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-0.5 rounded-lg hover:bg-gray-100 more-vertical-button" // Minimal padding
        >
          <MoreVertical className="h-3.5 w-3.5 text-gray-600" /> {/* Very small icon h-3.5 w-3.5 */}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <Link
              to={userType === 'admin' ? '/admin/profile' : '/user/profile'}
              onClick={() => setDropdownOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <User className="h-3 w-3 mr-2" /> {/* Very small icon */}
              Profile
            </Link>
            <Link
              to={userType === 'admin' ? '/admin/settings' : '/user/settings'}
              onClick={() => setDropdownOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <SettingsIcon className="h-3 w-3 mr-2" /> {/* Very small icon */}
              Settings
            </Link>
            <hr className="my-1" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <LogOut className="h-3 w-3 mr-2" /> {/* Very small icon */}
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;