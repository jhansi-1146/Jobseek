import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Search, Edit, Trash2, Play, BookOpen, Users, TrendingUp } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  experience: string;
  salary: string;
  demand: 'High' | 'Medium' | 'Low';
  growth: string;
  videoUrl?: string;
  createdDate: string;
  lastUpdated: string;
  views: number;
}

const RoleLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddRole, setShowAddRole] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const roles: Role[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      category: 'Software Development',
      description: 'Build user interfaces and user experiences for web applications using modern frameworks and technologies.',
      skills: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Git', 'Responsive Design'],
      experience: '0-3 years',
      salary: '$60,000 - $120,000',
      demand: 'High',
      growth: '+22%',
      videoUrl: 'https://example.com/frontend-dev-video',
      createdDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      views: 245
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      category: 'Software Development',
      description: 'Work on both frontend and backend components of web applications, managing the entire development lifecycle.',
      skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB', 'Express', 'Git'],
      experience: '2-5 years',
      salary: '$70,000 - $140,000',
      demand: 'High',
      growth: '+25%',
      videoUrl: 'https://example.com/fullstack-dev-video',
      createdDate: '2024-01-02',
      lastUpdated: '2024-01-16',
      views: 189
    },
    {
      id: '3',
      title: 'Data Scientist',
      category: 'Data & Analytics',
      description: 'Analyze complex data sets to derive insights and build predictive models for business decision-making.',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Tableau', 'Pandas'],
      experience: '1-4 years',
      salary: '$80,000 - $150,000',
      demand: 'High',
      growth: '+31%',
      createdDate: '2024-01-03',
      lastUpdated: '2024-01-17',
      views: 156
    },
    {
      id: '4',
      title: 'UX Designer',
      category: 'Design',
      description: 'Design user experiences and interfaces that are intuitive, accessible, and aligned with business goals.',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Wireframing'],
      experience: '0-3 years',
      salary: '$55,000 - $110,000',
      demand: 'Medium',
      growth: '+13%',
      videoUrl: 'https://example.com/ux-designer-video',
      createdDate: '2024-01-04',
      lastUpdated: '2024-01-18',
      views: 203
    },
    {
      id: '5',
      title: 'Product Manager',
      category: 'Product Management',
      description: 'Lead product development from conception to launch, working with cross-functional teams to deliver value.',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Communication', 'Roadmapping', 'User Research'],
      experience: '2-6 years',
      salary: '$90,000 - $160,000',
      demand: 'Medium',
      growth: '+19%',
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-19',
      views: 134
    }
  ];

  const categories = ['all', ...Array.from(new Set(roles.map(role => role.category)))];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || role.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDemandColor = (demand: Role['demand']) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddRole = () => {
    setShowAddRole(true);
    setEditingRole(null);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setShowAddRole(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      alert('Role deleted successfully');
    }
  };

  return (
    <Layout role="admin">
      <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Role Library</h1>
                <p className="text-gray-600 mt-1">Manage job role descriptions and explainer videos</p>
              </div>
              <button
                onClick={handleAddRole}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Role
              </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search roles by title, description, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{roles.length}</div>
                    <div className="text-sm text-gray-600">Total Roles</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {roles.filter(r => r.demand === 'High').length}
                    </div>
                    <div className="text-sm text-gray-600">High Demand</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Play className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {roles.filter(r => r.videoUrl).length}
                    </div>
                    <div className="text-sm text-gray-600">With Videos</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {roles.reduce((sum, role) => sum + role.views, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRoles.map((role) => (
                <div key={role.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{role.title}</h3>
                        <p className="text-sm text-blue-600 mb-2">{role.category}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(role.demand)}`}>
                            {role.demand} Demand
                          </span>
                          <span className="text-xs text-gray-500">
                            Growth: {role.growth}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditRole(role)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{role.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {role.skills.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{role.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium">{role.experience}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Salary:</span>
                        <span className="font-medium">{role.salary}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Views:</span>
                        <span className="font-medium">{role.views}</span>
                      </div>
                    </div>

                    {role.videoUrl && (
                      <div className="mb-4">
                        <button className="w-full flex items-center justify-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Explainer Video
                        </button>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 border-t border-gray-200 pt-3">
                      <div>Created: {new Date(role.createdDate).toLocaleDateString()}</div>
                      <div>Updated: {new Date(role.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No roles found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

      {/* Add/Edit Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </h2>
              <button
                onClick={() => setShowAddRole(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              alert(editingRole ? 'Role updated successfully!' : 'Role created successfully!');
              setShowAddRole(false);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Title</label>
                  <input
                    type="text"
                    defaultValue={editingRole?.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    defaultValue={editingRole?.category}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Data & Analytics">Data & Analytics</option>
                    <option value="Design">Design</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  defaultValue={editingRole?.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  defaultValue={editingRole?.skills.join(', ')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="JavaScript, React, HTML/CSS..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <input
                    type="text"
                    defaultValue={editingRole?.experience}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0-3 years"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    defaultValue={editingRole?.salary}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="$60,000 - $120,000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Demand Level</label>
                  <select
                    defaultValue={editingRole?.demand}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Demand</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate</label>
                  <input
                    type="text"
                    defaultValue={editingRole?.growth}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+22%"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (optional)</label>
                  <input
                    type="url"
                    defaultValue={editingRole?.videoUrl}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddRole(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingRole ? 'Update Role' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RoleLibrary;