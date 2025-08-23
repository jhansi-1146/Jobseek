// src/components/UserDashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings as SettingsIcon, User as UserIcon } from 'lucide-react';
import Layout from '../../components/Layout';

const stats = [
  { value: 23, label: 'Applications Sent', sub: '+3 this week', color: 'text-blue-700' },
  { value: 5, label: 'Interviews Scheduled', sub: '+2 this week', color: 'text-blue-700' },
  { value: '8.2/10', label: 'Skill Gap Score', sub: 'Improved 0.5', color: 'text-blue-700' },
  { value: 156, label: 'Profile Views', sub: '+12 today', color: 'text-blue-700' },
];

const applications = [
  { title: 'Senior Software Engineer', company: 'TechCorp Inc.', date: '2 days ago', status: 'Interview', statusColor: 'bg-blue-700 text-white' },
  { title: 'Data Scientist', company: 'DataFlow Systems', date: '1 week ago', status: 'Applied', statusColor: 'bg-gray-100 text-gray-700' },
  { title: 'DevOps Engineer', company: 'CloudNine Solutions', date: '2 weeks ago', status: 'Rejected', statusColor: 'bg-red-500 text-white' },
];

const quickActions = [
  { label: 'Find New Jobs', primary: true, path: '/user/jobs' },
  { label: 'Analyze Skills', path: '/user/skill-gap' },
  { label: 'Compare Resume', path: '/user/peer-compare' },
];

const tasks = [
  { label: 'Follow up with TechCorp HR', date: 'Today', color: 'bg-red-500' },
  { label: 'Complete skill assessment', date: 'Tomorrow', color: 'bg-yellow-400' },
  { label: 'Update resume with new certification', date: 'This week', color: 'bg-green-500' },
];

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <Layout role="student">
      <main className="bg-gray-50 min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Greeting & Stats */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Welcome back, Chinmayi Sharma</h1>
          <p className="text-lg text-gray-500 mb-8">Here's what's happening with your career journey</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col shadow-sm hover:shadow transition-shadow">
                <span className={`text-2xl font-extrabold ${s.color}`}>{s.value}</span>
                <span className="font-semibold text-gray-900 mt-1">{s.label}</span>
                <span className="text-sm text-gray-400 mt-1">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Applications</h2>
              <p className="text-base text-gray-500 mb-6">Track your latest job applications</p>
              <div className="flex flex-col gap-4 mb-4">
                {applications.map((app, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg text-gray-900">{app.title}</div>
                      <div className="text-gray-500 text-base">{app.company}</div>
                      <div className="text-gray-400 text-sm">{app.date}</div>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${app.statusColor}`}>{app.status}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/user/tracker')} // Changed navigation path to /user/tracker
                className="w-full py-2 rounded-lg border border-gray-200 text-base font-semibold text-gray-700 hover:bg-gray-100">
                View All Applications
              </button>
            </div>

            {/* Right Column: Quick Actions & Upcoming Tasks */}
            <div className="flex flex-col gap-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(action.path)}
                      className={`w-full py-3 rounded ${action.primary ? 'bg-blue-700 text-white font-semibold' : 'bg-white text-gray-900 border border-gray-200 font-medium hover:bg-gray-50'}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Upcoming Tasks */}
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Tasks</h2>
                <ul className="space-y-4">
                  {tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${task.color}`}></span>
                      <div>
                        <div className="font-medium text-gray-900">{task.label}</div>
                        <div className="text-sm text-gray-500">{task.date}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}