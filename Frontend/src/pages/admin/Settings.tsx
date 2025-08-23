import React, { useState } from 'react';
import { 
  Shield, 
  Settings as SettingsIcon,
  Trash2, 
  Save,
  Users,
  Database,
  Globe,
  Activity
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Career Companion',
    siteDescription: 'AI-powered job search platform for students',
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '24',
    maxLoginAttempts: '5',
    passwordPolicy: 'strong',
    ipWhitelist: false
  });

  const [userManagement, setUserManagement] = useState({
    autoApproveUsers: false,
    requireEmailVerification: true,
    allowProfileEditing: true,
    userDataRetention: '365'
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System', icon: Database }
  ];

  const handleSave = () => {
    // Handle save logic
    console.log('Admin settings saved');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-gray-600">Manage system configuration and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <textarea
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                    <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, maintenanceMode: !generalSettings.maintenanceMode})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Allow Registrations</h3>
                    <p className="text-sm text-gray-500">Allow new users to register</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, allowRegistrations: !generalSettings.allowRegistrations})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.allowRegistrations ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      generalSettings.allowRegistrations ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Send email notifications to admins</p>
                  </div>
                  <button
                    onClick={() => setGeneralSettings({...generalSettings, emailNotifications: !generalSettings.emailNotifications})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      generalSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      generalSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">1 hour</option>
                    <option value="8">8 hours</option>
                    <option value="24">24 hours</option>
                    <option value="168">1 week</option>
                  </select>
                </div>

          <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <select
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="3">3 attempts</option>
                    <option value="5">5 attempts</option>
                    <option value="10">10 attempts</option>
                  </select>
          </div>

          <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
                  <select
                    value={securitySettings.passwordPolicy}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordPolicy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="basic">Basic (6+ characters)</option>
                    <option value="strong">Strong (8+ chars, uppercase, lowercase, number)</option>
                    <option value="very-strong">Very Strong (10+ chars, special chars)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">IP Whitelist</h3>
                    <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({...securitySettings, ipWhitelist: !securitySettings.ipWhitelist})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.ipWhitelist ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.ipWhitelist ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Auto-Approve Users</h3>
                    <p className="text-sm text-gray-500">Automatically approve new user registrations</p>
                  </div>
                  <button
                    onClick={() => setUserManagement({...userManagement, autoApproveUsers: !userManagement.autoApproveUsers})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userManagement.autoApproveUsers ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      userManagement.autoApproveUsers ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Require Email Verification</h3>
                    <p className="text-sm text-gray-500">Require users to verify their email address</p>
                  </div>
                  <button
                    onClick={() => setUserManagement({...userManagement, requireEmailVerification: !userManagement.requireEmailVerification})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userManagement.requireEmailVerification ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      userManagement.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Allow Profile Editing</h3>
                    <p className="text-sm text-gray-500">Allow users to edit their profiles</p>
                  </div>
                  <button
                    onClick={() => setUserManagement({...userManagement, allowProfileEditing: !userManagement.allowProfileEditing})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userManagement.allowProfileEditing ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      userManagement.allowProfileEditing ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
          </div>

          <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Data Retention (days)</label>
                  <select
                    value={userManagement.userDataRetention}
                    onChange={(e) => setUserManagement({...userManagement, userDataRetention: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="365">1 year</option>
                    <option value="0">Never (keep forever)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">System Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Version:</span>
                      <span className="ml-2 text-gray-900">1.0.0</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="ml-2 text-gray-900">2024-01-15</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Database Size:</span>
                      <span className="ml-2 text-gray-900">2.3 GB</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Active Users:</span>
                      <span className="ml-2 text-gray-900">1,247</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">System Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                      <Activity className="h-4 w-4 mr-3" />
                      Clear Cache
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                      <Database className="h-4 w-4 mr-3" />
                      Backup Database
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                      <Globe className="h-4 w-4 mr-3" />
                      Check for Updates
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Reset System</h4>
                    <p className="text-sm text-red-600 mb-4">
                      This will reset all system settings to default. This action cannot be undone.
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Reset System
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 