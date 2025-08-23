import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Search, Download, Eye, Trash2, Filter, MoreVertical, Calendar, GraduationCap, MapPin } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  major: string;
  year: string;
  location: string;
  joinDate: string;
  lastActive: string;
  applications: number;
  skillsAnalyzed: boolean;
  resumeUploaded: boolean;
  status: 'active' | 'inactive';
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserDetails, setShowUserDetails] = useState<string | null>(null);

  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@student.edu',
      college: 'Stanford University',
      major: 'Computer Science',
      year: 'Senior',
      location: 'California, USA',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      applications: 12,
      skillsAnalyzed: true,
      resumeUploaded: true,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@university.edu',
      college: 'UC Berkeley',
      major: 'Information Systems',
      year: 'Junior',
      location: 'California, USA',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      applications: 8,
      skillsAnalyzed: true,
      resumeUploaded: true,
      status: 'active'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'mchen@mit.edu',
      college: 'MIT',
      major: 'Software Engineering',
      year: 'Sophomore',
      location: 'Massachusetts, USA',
      joinDate: '2024-01-08',
      lastActive: '2024-01-18',
      applications: 5,
      skillsAnalyzed: false,
      resumeUploaded: true,
      status: 'active'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@college.edu',
      college: 'Harvard University',
      major: 'Data Science',
      year: 'Graduate',
      location: 'Massachusetts, USA',
      joinDate: '2024-01-05',
      lastActive: '2024-01-12',
      applications: 15,
      skillsAnalyzed: true,
      resumeUploaded: true,
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Alex Rodriguez',
      email: 'alex.r@university.edu',
      college: 'UT Austin',
      major: 'Computer Science',
      year: 'Senior',
      location: 'Texas, USA',
      joinDate: '2024-01-01',
      lastActive: '2024-01-20',
      applications: 20,
      skillsAnalyzed: true,
      resumeUploaded: true,
      status: 'active'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleDownloadResume = (user: User) => {
    // Simulate resume download
    alert(`Downloading resume for ${user.name}`);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // Simulate user deletion
      alert('User deleted successfully');
    }
  };

  const exportUserData = () => {
    // Simulate data export
    alert('Exporting user data...');
  };

  return (
    <Layout role="admin">
      <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage student accounts and access their data</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={exportUserData}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or college..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Students ({filteredUsers.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Select All</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="opacity-0" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        College & Major
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {user.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="flex items-center text-sm text-gray-900">
                              <GraduationCap className="h-4 w-4 mr-1" />
                              {user.college}
                            </div>
                            <div className="text-sm text-gray-500">{user.major} - {user.year}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.applications} applications</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.skillsAnalyzed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              Skills {user.skillsAnalyzed ? 'Analyzed' : 'Pending'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.resumeUploaded ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              Resume {user.resumeUploaded ? 'Uploaded' : 'Missing'}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Last active: {new Date(user.lastActive).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setShowUserDetails(user.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {user.resumeUploaded && (
                              <button
                                onClick={() => handleDownloadResume(user)}
                                className="text-green-600 hover:text-green-900"
                                title="Download Resume"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete User"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{users.length}</div>
                <div className="text-gray-600">Total Students</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {users.filter(u => u.status === 'active').length}
                </div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {users.filter(u => u.resumeUploaded).length}
                </div>
                <div className="text-gray-600">Resumes Uploaded</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {users.reduce((sum, user) => sum + user.applications, 0)}
                </div>
                <div className="text-gray-600">Total Applications</div>
              </div>
            </div>
          </div>
        </div>

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">User Details</h2>
              <button
                onClick={() => setShowUserDetails(null)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {(() => {
              const user = users.find(u => u.id === showUserDetails);
              if (!user) return null;
              
              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">College</label>
                      <p className="mt-1 text-sm text-gray-900">{user.college}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Major</label>
                      <p className="mt-1 text-sm text-gray-900">{user.major}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <p className="mt-1 text-sm text-gray-900">{user.year}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-sm text-gray-900">{user.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Join Date</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Active</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(user.lastActive).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.applications}</div>
                        <div className="text-sm text-gray-600">Applications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {user.skillsAnalyzed ? '✓' : '✗'}
                        </div>
                        <div className="text-sm text-gray-600">Skills Analyzed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {user.resumeUploaded ? '✓' : '✗'}
                        </div>
                        <div className="text-sm text-gray-600">Resume Uploaded</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserManagement;