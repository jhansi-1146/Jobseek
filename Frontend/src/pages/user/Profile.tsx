import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, ArrowLeft, EyeOff, Edit2, Camera, Settings, Shield, Bell, Download, Upload, MapPin, Building, Eye, Mail, Phone } from 'lucide-react';
import Layout from '../../components/Layout';

const mockProfile = {
  name: 'Chinmayi Sharma',
  email: 'chinmayi.sharma@email.com',
  phone: '+91 98765 43210',
  role: 'Senior Frontend Developer',
  location: 'Bangalore, India',
  company: 'TechCorp',
  experience: '5+ years',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  bio: 'Passionate frontend developer with 5+ years of experience in React, TypeScript, and modern technologies. Love creating intuitive user experiences and scalable applications.',
  profileViews: 156,
  profileStrength: 85
};

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const location = useLocation();
  const [profile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  // Determine if this is the admin profile page
  const isAdmin = location.pathname.startsWith('/admin');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' }
  ];

  const ProfileContent: React.FC = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">My Profile</h1>
          <p className="text-base text-gray-600">Manage your professional profile and information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-6">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-2xl font-bold">CS</span>
              </div>
              <button className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 shadow-md border-2 border-white">
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Profile Information */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
                <p className="text-base text-gray-600 mb-2">{profile.role}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {profile.company}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{profile.bio}</p>

              {/* Profile Metrics */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="h-4 w-4 mr-2" />
                  {profile.profileViews} profile views
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">Profile Strength: {profile.profileStrength}%</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${profile.profileStrength}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-gray-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {profile.bio}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Experience</h4>
                    <p className="text-gray-600">{profile.experience}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Location</h4>
                    <p className="text-gray-600">{profile.location}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-4">
                    <User className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profile.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10 bg-gray-50"
                          readOnly
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={profile.phone}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10 bg-gray-50"
                          readOnly
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900">{profile.role}</h4>
                    <p className="text-blue-600">{profile.company}</p>
                    <p className="text-gray-600 text-sm">2020 - Present</p>
                    <p className="text-gray-700 mt-2">
                      Led frontend development initiatives, implemented modern React patterns, and mentored junior developers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900">Bachelor of Technology in Computer Science</h4>
                    <p className="text-green-600">Stanford University</p>
                    <p className="text-gray-600 text-sm">2016 - 2020</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );

  return isAdmin ? (
    <Layout 
      role="admin"
      viewMode="grid"
      onViewModeChange={() => {}}
    >
      <ProfileContent />
    </Layout>
  ) : (
    <Layout 
      role="student"
      viewMode="grid"
      onViewModeChange={() => {}}
    >
      <ProfileContent />
    </Layout>
  );
};

export default Profile; 