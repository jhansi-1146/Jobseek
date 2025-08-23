import React from 'react';
import {
  LayoutDashboard,
  Search,
  Cpu,
  ClipboardCheck,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  Settings as SettingsIcon,
  User as UserIcon,
  GraduationCap // Ensure GraduationCap is imported for the collapsed logo
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Added isCollapsed prop
interface SidebarProps {
  isCollapsed: boolean;
}

const menu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'job-discovery', label: 'Find Jobs', icon: Search },
  { id: 'ai-job-matcher', label: 'Skill Analyzer', icon: Cpu },
  { id: 'applications', label: 'Application Tracker', icon: ClipboardCheck },
  { id: 'job-compare', label: 'Job Compare', icon: Target },
  { id: 'growth', label: 'Growth Tracker', icon: TrendingUp },
  { id: 'peer-compare', label: 'Peer Comparison', icon: Users },
];

const getRoute = (id: string) => {
  if (id === 'dashboard') return '/user';
  if (id === 'job-discovery') return '/user/jobs';
  if (id === 'ai-job-matcher') return '/user/skill-gap';
  if (id === 'applications') return '/user/tracker';
  if (id === 'job-compare') return '/user/job-compare';
  if (id === 'growth') return '/user/growth';
  if (id === 'peer-compare') return '/user/peer-compare';
  return null;
};

// Accept isCollapsed as a prop
const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`bg-white h-full flex flex-col select-none border-r border-gray-100
                      ${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 ease-in-out`}>
      {/* Logo and App Name */}
      <div className={`flex items-center h-20 px-4 border-b border-gray-100 ${isCollapsed ? 'justify-center' : 'px-8'}`}>
        {!isCollapsed && (
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight whitespace-nowrap">Student Portal</span>
        )}
        {isCollapsed && (
             <GraduationCap className="h-8 w-8 text-blue-600" />
        )}
      </div>
      <nav className="flex-1 flex flex-col justify-between py-6">
        <ul className="px-2 space-y-1">
          {menu.map((item, idx) => {
            const Icon = item.icon;
            const route = getRoute(item.id);
            const isSelected = route && location.pathname.startsWith(route);
            return (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center gap-3 py-2.5 rounded-lg transition-colors duration-200
                    ${isSelected ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}
                    ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} // REMOVED THE COMMENT FROM INSIDE HERE
                  onClick={() => route && navigate(route)}
                >
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-700' : 'text-gray-400'} transition-colors`} />
                  {!isCollapsed && (
                    <span className="text-base font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;