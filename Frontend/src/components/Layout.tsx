import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  User,
  LogOut,
  Home,
  Brain,
  Briefcase,
  Scale,
  TrendingUp,
  Users,
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  Search,
  ChevronRight,
  Plus,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import JobFilters from './JobFilters';
import Sidebar from './Sidebar';

interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, viewMode: propViewMode, onViewModeChange }) => {
  const location = useLocation();
  const [sidebarState, setSidebarState] = useState<'closed' | 'full' | 'collapsed'>('full');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(propViewMode || 'grid');
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'New job recommendation: Senior React Dev', time: '5 min ago', read: false },
    { id: '2', message: 'Interview scheduled with TechCorp Inc.', time: '1 hour ago', read: false },
    { id: '3', message: 'Your skill gap report is ready!', time: 'Yesterday', read: false },
    { id: '4', message: 'Application for Data Scientist reviewed.', time: '2 days ago', read: true },
    { id: '5', message: 'New message from recruiter at CloudNine.', time: '3 days ago', read: false },
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleSidebarToggle = () => {
    setSidebarState((prevState) => {
      if (prevState === 'closed') return 'full';
      if (prevState === 'full') return 'collapsed';
      return 'closed';
    });
  };

  const isSidebarOpen = sidebarState !== 'closed';
  const isSidebarCollapsed = sidebarState === 'collapsed';
  const sidebarWidthClass = isSidebarCollapsed ? 'w-14' : 'w-56';

  // This is the updated line to match the desired behavior
  const searchbarWidthClass = isSidebarCollapsed ? 'max-w-xl' : 'max-w-sm';

  const studentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/user' },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: Brain, path: '/user/skill-gap' },
    { id: 'tracker', label: 'Application Tracker', icon: Briefcase, path: '/user/tracker' },
    { id: 'job-compare', label: 'Job Comparison Tool', icon: Scale, path: '/user/job-compare' },
    { id: 'peer-compare', label: 'Peer Resume Comparison', icon: Users, path: '/user/peer-compare' },
    { id: 'growth', label: 'Growth Tracker', icon: TrendingUp, path: '/user/growth' },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
    { id: 'users', label: 'User Management', icon: Users, path: '/admin/users' },
    { id: 'roles', label: 'Role Library', icon: BookOpen, path: '/admin/roles' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  const menuItems = role === 'student' ? studentMenuItems : adminMenuItems;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (profileDropdownOpen && !target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }

      if (notificationOpen && !target.closest('.notification-dropdown-container')) {
        setNotificationOpen(false);
      }

      if (window.innerWidth < 1024 && isSidebarOpen && !target.closest('.sidebar-container') && !target.closest('.menu-button')) {
        setSidebarState('closed');
      }
    };

    if (profileDropdownOpen || notificationOpen || (isSidebarOpen && window.innerWidth < 1024)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen, notificationOpen, isSidebarOpen]);

  const handleBellClick = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate('/');
    setProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/user/profile');
    setProfileDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/user/settings');
    setProfileDropdownOpen(false);
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="h-screen bg-background flex flex-row">
      <div className={`sidebar-container z-40 h-full bg-white flex-shrink-0 flex flex-col
                         ${sidebarWidthClass} transition-all duration-300 ease-in-out
                         ${sidebarState === 'closed' ? 'hidden lg:flex' : 'block fixed lg:relative'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" onClick={() => setSidebarState('closed')} />
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out`}>
        <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between flex-shrink-0 px-6">
          {/* Left section of the navbar with menu button and title */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="menu-button p-2 rounded-md hover:bg-gray-100" aria-label="Toggle sidebar" onClick={handleSidebarToggle}>
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-xl font-bold text-[#1a4f8a] whitespace-nowrap">
              Career Companion
            </span>
          </div>

          {/* Central search bar */}
          <div className="flex-grow flex items-center justify-center">
            <div className={`relative w-full ${searchbarWidthClass}`}>
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-12 pr-4 py-2 rounded-xl bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-[#1A4F8A] focus:outline-none w-full text-sm text-gray-700 placeholder-gray-500 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Right section with notifications and profile */}
          <div className="flex items-center gap-2 relative profile-dropdown-container flex-shrink-0">
            <div className="relative notification-dropdown-container">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition"
                onClick={handleBellClick}
                aria-haspopup="true"
                aria-expanded={notificationOpen}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50 max-h-80 overflow-y-auto">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-800 border-b border-gray-100">Notifications</div>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">No new notifications.</div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-center px-4 py-2 border-b border-gray-100 last:border-b-0
                                       ${notification.read ? 'bg-white text-gray-700' : 'bg-[#E6F0F8] text-gray-900 font-medium hover:bg-[#D0E0EF]'}
                                       cursor-pointer`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#1A4F8A] rounded-full flex-shrink-0 mr-2"></div>
                        )}
                        <div className="flex flex-col flex-grow">
                          <span className="text-sm">{notification.message}</span>
                          <span className={`text-xs ${notification.read ? 'text-gray-500' : 'text-[#1A4F8A]'}`}>{notification.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { setNotificationOpen(false); }}
                    className="w-full text-center px-4 py-2 text-sm text-[#1A4F8A] hover:bg-[#E6F0F8]"
                  >
                    View All
                  </button>
                </div>
              )}
            </div>
              
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1A4F8A] font-bold text-white text-sm flex-shrink-0 cursor-pointer hover:bg-[#123969] transition"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
            >
              CS
            </button>
            <span className="font-medium text-gray-900 whitespace-nowrap text-base">Chinmayi Sharma</span>

            {profileDropdownOpen && (
  <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50">
    <button
      onClick={handleProfileClick}
      className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
    >
      <User className="mr-3 h-5 w-5 text-gray-500" /> My Profile
    </button>
    <button
      onClick={handleSettingsClick}
      className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
    >
      <Settings className="mr-3 h-5 w-5 text-gray-500" /> Settings
    </button>
    <div className="border-t border-gray-100 my-1.5" />
    <button
      onClick={handleLogout}
      className="flex items-center px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left"
    >
      <LogOut className="mr-3 h-5 w-5 text-red-500" /> Logout
    </button>
  </div>
)}
          </div>
        </nav>
        <div className="flex-1 overflow-auto min-w-0">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { sidebarState });
            }
            return child;
          })}
        </div>
      </div>
      <JobFilters
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setViewMode(mode);
          onViewModeChange?.(mode);
        }}
      />
    </div>
  );
};

export default Layout;