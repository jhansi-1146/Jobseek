import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Calendar, Download, TrendingUp, Users, Briefcase, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const Analytics: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for charts
  const topAppliedRoles = [
    { role: 'Frontend Developer', applications: 45, growth: '+15%' },
    { role: 'Full Stack Developer', applications: 38, growth: '+22%' },
    { role: 'Data Scientist', applications: 32, growth: '+8%' },
    { role: 'UX Designer', applications: 28, growth: '+12%' },
    { role: 'Product Manager', applications: 25, growth: '+18%' },
    { role: 'Backend Developer', applications: 22, growth: '+6%' },
    { role: 'DevOps Engineer', applications: 18, growth: '+25%' },
    { role: 'Mobile Developer', applications: 15, growth: '+10%' }
  ];

  const skillGapData = [
    { skill: 'JavaScript', avgGap: 15, users: 120 },
    { skill: 'React', avgGap: 22, users: 98 },
    { skill: 'Python', avgGap: 18, users: 85 },
    { skill: 'SQL', avgGap: 28, users: 105 },
    { skill: 'TypeScript', avgGap: 35, users: 76 },
    { skill: 'Node.js', avgGap: 32, users: 68 },
    { skill: 'AWS', avgGap: 45, users: 92 },
    { skill: 'Git', avgGap: 12, users: 134 }
  ];

  const userActivityData = [
    { date: 'Jan 1', users: 45, applications: 120, skillAnalyses: 38 },
    { date: 'Jan 7', users: 52, applications: 145, skillAnalyses: 42 },
    { date: 'Jan 14', users: 48, applications: 132, skillAnalyses: 45 },
    { date: 'Jan 21', users: 58, applications: 165, skillAnalyses: 52 },
    { date: 'Jan 28', users: 62, applications: 178, skillAnalyses: 58 }
  ];

  const followUpData = [
    { type: 'No Follow-up', value: 45, color: '#EF4444' },
    { type: 'Email Follow-up', value: 32, color: '#3B82F6' },
    { type: 'Phone Follow-up', value: 18, color: '#10B981' },
    { type: 'LinkedIn Message', value: 25, color: '#F59E0B' },
    { type: 'In-person Meeting', value: 8, color: '#8B5CF6' }
  ];

  const applicationStatusData = [
    { status: 'Applied', count: 450, percentage: 52 },
    { status: 'Interview', count: 285, percentage: 33 },
    { status: 'Offer', count: 95, percentage: 11 },
    { status: 'Rejected', count: 35, percentage: 4 }
  ];

  const topColleges = [
    { college: 'Stanford University', users: 45, applications: 180 },
    { college: 'MIT', users: 38, applications: 165 },
    { college: 'UC Berkeley', users: 42, applications: 172 },
    { college: 'Harvard University', users: 35, applications: 148 },
    { college: 'UT Austin', users: 40, applications: 158 }
  ];

  const exportData = () => {
    alert('Exporting analytics data...');
  };

  return (
    <Layout 
      role="admin"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Insights into student job search patterns and platform usage</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <button
                  onClick={exportData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                    <div className="text-xs text-green-600 mt-1">+12% from last month</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Briefcase className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3,856</div>
                    <div className="text-sm text-gray-600">Applications Tracked</div>
                    <div className="text-xs text-green-600 mt-1">+18% from last month</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">892</div>
                    <div className="text-sm text-gray-600">Skills Analyzed</div>
                    <div className="text-xs text-green-600 mt-1">+25% from last month</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">68%</div>
                    <div className="text-sm text-gray-600">Avg. Skill Match</div>
                    <div className="text-xs text-green-600 mt-1">+3% from last month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Applied Roles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Applied Roles</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topAppliedRoles}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#2563EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ status, percentage }) => `${status}: ${percentage}%`}
                    >
                      <Cell fill="#3B82F6" />
                      <Cell fill="#F59E0B" />
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Activity Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Activity Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="applications" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="skillAnalyses" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span>Active Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  <span>Applications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
                  <span>Skill Analyses</span>
                </div>
              </div>
            </div>

            {/* Skill Gap Analysis and Follow-up Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Average Skill Gaps</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillGapData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="skill" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}% gap`, 'Average Gap']} />
                    <Bar dataKey="avgGap" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Follow-up Patterns</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={followUpData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ type, value }) => `${type}: ${value}`}
                    >
                      {followUpData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Colleges and Detailed Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Colleges by Activity</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-500">College</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-500">Users</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-500">Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topColleges.map((college, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 text-sm text-gray-900">{college.college}</td>
                          <td className="py-3 text-sm text-gray-600 text-right">{college.users}</td>
                          <td className="py-3 text-sm text-gray-600 text-right">{college.applications}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Role Performance</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-500">Role</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-500">Applications</th>
                        <th className="text-right py-3 text-sm font-medium text-gray-500">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topAppliedRoles.slice(0, 5).map((role, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 text-sm text-gray-900">{role.role}</td>
                          <td className="py-3 text-sm text-gray-600 text-right">{role.applications}</td>
                          <td className="py-3 text-sm text-right">
                            <span className="text-green-600 font-medium">{role.growth}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Analytics;