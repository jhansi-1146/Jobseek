import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Users, BookOpen, BarChart3, TrendingUp, Calendar, Award } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
      return (
      <Layout 
        role="admin"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      >
      <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome to the Career Companion admin portal</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                    <div className="text-xs text-green-600 mt-1">+12% this month</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">45</div>
                    <div className="text-sm text-gray-600">Job Roles</div>
                    <div className="text-xs text-blue-600 mt-1">3 added this week</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3,856</div>
                    <div className="text-sm text-gray-600">Applications Tracked</div>
                    <div className="text-xs text-green-600 mt-1">+18% this month</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">68%</div>
                    <div className="text-sm text-gray-600">Avg. Skill Match</div>
                    <div className="text-xs text-green-600 mt-1">+3% improvement</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent User Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">John Smith</div>
                      <div className="text-sm text-gray-600">Completed skill gap analysis</div>
                    </div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Added 3 new job applications</div>
                    </div>
                    <div className="text-xs text-gray-500">4 hours ago</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Michael Chen</div>
                      <div className="text-sm text-gray-600">Uploaded resume for peer comparison</div>
                    </div>
                    <div className="text-xs text-gray-500">6 hours ago</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">System Health</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Server Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Database</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API Response Time</span>
                    <span className="text-gray-900 font-medium">142ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Sessions</span>
                    <span className="text-gray-900 font-medium">89</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="font-medium text-gray-900">Manage Users</div>
                  <div className="text-sm text-gray-600">View and manage student accounts</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <BookOpen className="h-6 w-6 text-green-600 mb-2" />
                  <div className="font-medium text-gray-900">Update Roles</div>
                  <div className="text-sm text-gray-600">Add or edit job role descriptions</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-600">Check platform usage statistics</div>
                </button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default AdminDashboard;