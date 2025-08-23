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
  Bell, // Ensure Bell is imported
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

// Define Notification type for better type safety
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
  const [sidebarState, setSidebarState] = useState<'closed' | 'full' | 'collapsed'>('closed');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false); // State to control notification dropdown visibility
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(propViewMode || 'grid');
  const navigate = useNavigate();

  // Dummy Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'New job recommendation: Senior React Dev', time: '5 min ago', read: false },
    { id: '2', message: 'Interview scheduled with TechCorp Inc.', time: '1 hour ago', read: false },
    { id: '3', message: 'Your skill gap report is ready!', time: 'Yesterday', read: false },
    { id: '4', message: 'Application for Data Scientist reviewed.', time: '2 days ago', read: true },
    { id: '5', message: 'New message from recruiter at CloudNine.', time: '3 days ago', read: false },
  ]);

  // Calculate unread count
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // New handler to cycle through sidebar states
  const handleSidebarToggle = () => {
    setSidebarState((prevState) => {
      if (prevState === 'closed') return 'full';
      if (prevState === 'full') return 'collapsed';
      return 'closed'; // From collapsed back to closed
    });
  };

  // Determine actual sidebar open/collapsed status for props and styling
  const isSidebarOpen = sidebarState !== 'closed';
  const isSidebarCollapsed = sidebarState === 'collapsed';
  const sidebarWidthClass = isSidebarCollapsed ? 'w-20' : 'w-72'; // Tailwind classes for collapsed/full width

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

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments.length > 0) {
      breadcrumbs.push({ label: 'Home', path: '/' });

      if (pathSegments[0] === 'user' || pathSegments[0] === 'admin') {
        breadcrumbs.push({
          label: pathSegments[0] === 'user' ? 'Student Portal' : 'Admin Portal',
          path: `/${pathSegments[0]}`
        });

        if (pathSegments[1]) {
          const currentItem = menuItems.find(item => item.path === `/${pathSegments[0]}/${pathSegments[1]}`);
          if (currentItem) {
            breadcrumbs.push({ label: currentItem.label, path: currentItem.path });
          }
        }
      }
    }

    return breadcrumbs;
  };

  // Effect to handle clicks outside dropdowns and sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Close profile dropdown if click is outside
      if (profileDropdownOpen && !target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }

      // Close notification dropdown if click is outside
      if (notificationOpen && !target.closest('.notification-dropdown-container')) {
        setNotificationOpen(false);
      }

      // Only close sidebar on mobile if clicked outside and sidebar is open
      if (window.innerWidth < 1024 && isSidebarOpen && !target.closest('.sidebar-container') && !target.closest('.menu-button')) {
        setSidebarState('closed'); // Close sidebar on mobile
      }
    };

    if (profileDropdownOpen || notificationOpen || (isSidebarOpen && window.innerWidth < 1024)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen, notificationOpen, isSidebarOpen]);

  // Function to mark all unread notifications as read when the dropdown opens
  const handleBellClick = () => {
    setNotificationOpen((prev) => !prev);
    // if (!notificationOpen) { // If opening, mark all unread as read
    //   setNotifications((prevNotifications) =>
    //     prevNotifications.map((n) => ({ ...n, read: true }))
    //   );
    // }
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

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="h-screen bg-background flex flex-row">
      {/* Sidebar - Dynamically adjust width based on state */}
      <div className={`sidebar-container z-40 h-full bg-white border-r border-gray-100 flex-shrink-0
                  ${sidebarWidthClass} transition-all duration-300 ease-in-out
                  ${sidebarState === 'closed' ? 'hidden lg:flex' : 'block fixed lg:relative'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" onClick={() => setSidebarState('closed')} />
      )}

      {/* Main Content Area (navbar + page content) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
                  ${isSidebarOpen ? sidebarWidthClass.replace('w-', 'ml-') : 'ml-0'}`}>

        {/* Top Navbar - Fixed */}
        <nav className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-5 w-full">
            {/* Hamburger Menu Icon (moved beside Career Companion) */}
            <button className="menu-button p-2 rounded-md hover:bg-gray-100 mr-3" aria-label="Toggle sidebar" onClick={handleSidebarToggle}>
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <span className="text-2xl font-extrabold text-blue-700 tracking-tight whitespace-nowrap">
              Career Companion
            </span>
            {/* Search Bar */}
            <div className="flex-1 flex items-center ml-8">
              <div className="relative w-full max-w-md flex items-center">
                <Search className="h-5 w-5 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-lg text-gray-700 placeholder-gray-400 shadow-sm"
                />
              </div>
            </div>
            {/* User Actions */}
            <div className="flex items-center gap-4 ml-8 relative profile-dropdown-container">
              {/* Notification Bell with Badge */}
              <div className="relative notification-dropdown-container"> {/* Added container for click outside */}
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-blue-50 transition"
                  onClick={handleBellClick}
                  aria-haspopup="true"
                  aria-expanded={notificationOpen}
                >
                  <Bell className="h-6 w-6 text-blue-600" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Menu */}
                {notificationOpen && (
                  <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-800 border-b border-gray-100">Notifications</div>
                   {notifications.length === 0 ? (
  <div className="px-4 py-3 text-sm text-gray-500">No new notifications.</div>
) : (
  notifications.map((notification) => (
  <div
    key={notification.id}
    className={`flex items-center px-4 py-2 border-b border-gray-100 last:border-b-0
                ${notification.read ? 'bg-white text-gray-700' : 'bg-blue-50 text-gray-900 font-medium hover:bg-blue-100'}
                cursor-pointer`}
    // MODIFY THIS LINE:
    onClick={() => handleNotificationClick(notification.id)} // Use the new handler
  >
    {!notification.read && (
      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mr-2"></div>
    )}
    <div className="flex flex-col flex-grow">
      <span className="text-sm">{notification.message}</span>
      <span className={`text-xs ${notification.read ? 'text-gray-500' : 'text-blue-600'}`}>{notification.time}</span>
    </div>
  </div>
))
)}
 <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => { /* Handle view all notifications page navigation */ setNotificationOpen(false); }}
                      className="w-full text-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      View All
                    </button>
                  </div>
                )}
              </div>

              {/* AJ Circle - now a clickable button */}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 font-bold text-blue-700 text-base flex-shrink-0 cursor-pointer hover:bg-blue-200 transition"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                CS
              </button>
              <span className="font-medium text-gray-900 ml-3 whitespace-nowrap text-lg">Chinmayi Sharma</span>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center px-5 py-2.5 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <User className="mr-3 h-5 w-5 text-gray-500" /> My Profile
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center px-5 py-2.5 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Settings className="mr-3 h-5 w-5 text-gray-500" /> Settings
                  </button>
                  <div className="border-t border-gray-100 my-1.5" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-5 py-2.5 text-base text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-red-500" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        {/* Breadcrumbs */}
        {breadcrumbs.length > 1 && (
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />}
                  <button
                    onClick={() => navigate(breadcrumb.path)}
                    className={`hover:text-blue-600 ${
                      index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {breadcrumb.label}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        )}
        {/* Page Content */}
        <div className="flex-1 overflow-auto min-w-0">
          {children}
        </div>
      </div>

      {/* Job Filters Modal */}
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