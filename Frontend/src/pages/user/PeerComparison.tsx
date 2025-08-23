import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Upload, Users, TrendingUp, Award, Target, Filter, BarChart2, Brain, Zap, Shield, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PeerData {
  id: string;
  name: string;
  college: string;
  region: string;
  targetRole: string;
  skills: { [key: string]: number };
  overallScore: number;
}

const PeerComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text'>('file');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resume Strength Report mock data
  const resumeScore = 78;
  const peerAverage = 65;
  const peerCount = 245;
  const topPercentile = 25;
  const aboveAverage = resumeScore - peerAverage;

  // Mock data for Resume Metrics Breakdown
  const resumeMetrics = [
    {
      name: 'Technical Skills',
      score: 85,
      description: 'Strong technical foundation'
    },
    {
      name: 'Work Experience',
      score: 68,
      description: 'Average work experience'
    },
    {
      name: 'Projects',
      score: 92,
      description: 'Excellent project portfolio'
    },
    {
      name: 'Education',
      score: 88,
      description: 'Strong educational background'
    },
    {
      name: 'Leadership',
      score: 70,
      description: 'Good leadership skills'
    },
  ];

  // Mock data for Skills Comparison
  const skillsComparison = [
    {
      name: 'React',
      yourScore: 85,
      peerAverage: 70,
      percentile: 80,
    },
    {
      name: 'TypeScript',
      yourScore: 75,
      peerAverage: 60,
      percentile: 75,
    },
    {
      name: 'JavaScript',
      yourScore: 90,
      peerAverage: 80,
      percentile: 70,
    },
    {
      name: 'Node.js',
      yourScore: 60,
      peerAverage: 65,
      percentile: 45,
    },
  ];

  // Mock data for Peer Group Analysis
  const peerGroups = [
    {
      name: 'Same College',
      percentage: 89,
      description: 'Peers from your college'
    },
    {
      name: 'Same Field',
      percentage: 234,
      description: 'Peers in your field'
    },
    {
      name: 'Same Experience',
      percentage: 156,
      description: 'Peers with similar experience'
    },
    {
      name: 'Same Location',
      percentage: 78,
      description: 'Peers in your location'
    },
  ];

  // Mock data for Overall Comparison
  const overallComparisonData = {
    yourScore: 78,
    peerAverage: 72,
    topPeer: 88,
    percentile: 75,
  };

  // Mock data for Radar Chart
  const radarData = [
    { skill: 'JavaScript', yourScore: 85, peerAverage: 78 },
    { skill: 'React', yourScore: 80, peerAverage: 75 },
    { skill: 'HTML/CSS', yourScore: 90, peerAverage: 85 },
    { skill: 'Git', yourScore: 75, peerAverage: 80 },
    { skill: 'Communication', yourScore: 88, peerAverage: 82 },
    { skill: 'Problem Solving', yourScore: 92, peerAverage: 88 },
    { skill: 'TypeScript', yourScore: 60, peerAverage: 70 },
    { skill: 'Node.js', yourScore: 45, peerAverage: 65 },
  ];

  // Mock data for Percentile Chart
  const percentileData = [
    { skill: 'Problem Solving', percentile: 85, score: 92 },
    { skill: 'HTML/CSS', percentile: 80, score: 90 },
    { skill: 'Communication', percentile: 75, score: 88 },
    { skill: 'JavaScript', percentile: 70, score: 85 },
    { skill: 'React', percentile: 65, score: 80 },
    { skill: 'Git', percentile: 45, score: 75 },
    { skill: 'TypeScript', percentile: 35, score: 60 },
    { skill: 'Node.js', percentile: 25, score: 45 },
  ];

  // Mock data for improvement suggestions
  const improvementSuggestions = [
    'Add more quantifiable achievements to your work experience section',
    'Include industry-specific keywords to improve ATS compatibility',
    'Highlight leadership and teamwork experiences more prominently',
    'Add certifications and online courses to strengthen your technical skills',
    'Consider adding a summary section to better showcase your value proposition'
  ];

  const [activeTab, setActiveTab] = useState('metrics');
  const tabs = [
    { id: 'metrics', label: 'Resume Metrics' },
    { id: 'skills', label: 'Skills Analysis' },
    { id: 'peers', label: 'Peer Groups' },
    { id: 'overall', label: 'Overall Comparison' },
    { id: 'improvements', label: 'Improvements' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleAnalyze = () => {
    if (resumeText || resumeFile) {
      setResumeUploaded(true);
      setAnalysisComplete(true);
    }
  };

    return (
      <Layout role="student">
      <div className="min-h-screen bg-gray-50 p-0">
        <div className="px-8 pt-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Peer Resume Comparison</h1>
          <p className="text-base text-gray-600 mb-8">Compare your resume with peers and get insights</p>
            </div>

        {/* Resume Upload Section */}
        {!resumeUploaded && (
          <div className="px-8 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Resume</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Upload Method</h3>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="uploadMethod"
                        value="file"
                        checked={uploadMethod === 'file'}
                        onChange={(e) => setUploadMethod(e.target.value as 'file' | 'text')}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">Upload PDF/DOC file</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="uploadMethod"
                        value="text"
                        checked={uploadMethod === 'text'}
                        onChange={(e) => setUploadMethod(e.target.value as 'file' | 'text')}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">Paste resume text</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume Content</h3>
                  {uploadMethod === 'file' ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input 
                        ref={fileInputRef}
                  type="file" 
                  accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                />
                <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
                      <p className="text-gray-500 mt-2">PDF, DOC, or DOCX files only</p>
                    </div>
                  ) : (
                    <textarea
                      placeholder="Paste your resume content here..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="mt-6">
            <button
                  onClick={handleAnalyze}
                  disabled={!resumeText && !resumeFile}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Analyze Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Only show below after resume is uploaded */}
        {resumeUploaded && (
          <>
            {/* Resume Strength Report */}
            <div className="px-8 mb-8">
              <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6">
              <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{resumeScore}</div>
                    <div className="text-sm text-blue-700">Your Score</div>
              </div>
              <div className="text-center">
                    <div className="text-3xl font-bold text-gray-600">{peerAverage}</div>
                    <div className="text-sm text-gray-700">Peer Average</div>
              </div>
              <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{topPercentile}%</div>
                    <div className="text-sm text-green-700">Top Percentile</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">Resume Strength Report</div>
                    <div className="text-gray-600">Based on {peerCount} peer comparisons</div>
              </div>
                </div>
              </div>
            </div>

            {/* Tabbed Navigation and Resume Metrics Breakdown */}
            <div className="px-8 mb-8">
              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-xl overflow-hidden mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
          </div>

              {/* Tab Content */}
              {activeTab === 'metrics' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Resume Metrics Breakdown</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resumeMetrics.map((metric) => (
                      <div key={metric.name} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">{metric.name}</span>
                          <span className="text-lg font-bold text-gray-900">{metric.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${metric.score}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Comparison</h3>
                  <div className="space-y-6">
                    {skillsComparison.map((skill) => (
                      <div key={skill.name} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900">{skill.name}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Your Score: {skill.yourScore}%</span>
                            <span className="text-sm text-gray-600">Peer Average: {skill.peerAverage}%</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${skill.yourScore}%` }}
                            ></div>
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${skill.peerAverage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>You</span>
                          <span>Peers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'peers' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Peer Group Analysis</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {peerGroups.map((group) => (
                      <div key={group.name} className="bg-gray-50 rounded-lg p-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-2">{group.percentage}%</div>
                          <div className="text-sm font-medium text-gray-700 mb-1">{group.name}</div>
                          <div className="text-xs text-gray-500">{group.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'overall' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Overall Comparison</h3>
                  
                  {/* Skills Radar Comparison */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Skills Radar Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Your Skills" dataKey="yourScore" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} />
                        <Radar name="Peer Average" dataKey="peerAverage" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
            </div>

                  {/* Skill Percentile Rankings */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-green-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Skill Percentile Rankings</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={percentileData}>
                  <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="skill" 
                          angle={0} 
                          textAnchor="middle" 
                          height={60}
                          tick={{ fontSize: 14, fontWeight: 600, fill: '#1e293b', dy: 10 }}
                          interval={0}
                        />
                  <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value, name, props) => [`${value}th percentile`, props.payload.skill]} />
                        {/* 🔵 Percentile bars */}
                        <Bar dataKey="percentile" fill="#2563EB">
                          {percentileData.map((entry, index) => (
                            <Tooltip key={entry.skill} content={<div className="p-2 text-sm">{entry.skill}: {entry.percentile}th percentile</div>} />
                          ))}
                        </Bar>
                </BarChart>
              </ResponsiveContainer>
                  </div>

                  {/* Overall Score Comparison */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 Overall Score Comparison</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{resumeScore}</div>
                        <div className="text-sm text-gray-600">Your Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-600">{peerAverage}</div>
                        <div className="text-sm text-gray-600">Peer Average</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">+{aboveAverage}</div>
                        <div className="text-sm text-gray-600">Above Average</div>
                      </div>
            </div>
          </div>
            </div>
              )}

              {activeTab === 'improvements' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Improvement Recommendations</h3>
                  
                  {/* AI-Powered Suggestions */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI-Powered Suggestions</h3>
                    <div className="space-y-4">
                      {improvementSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Potential Score Improvement */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Potential Score Improvement</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">+15</div>
                        <div className="text-sm text-gray-600">Potential Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">85</div>
                        <div className="text-sm text-gray-600">Target Score</div>
                      </div>
                    </div>
              </div>

                  {/* Learning Resources */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">📚 Recommended Learning Resources</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                <li>• Complete online courses in your weak areas</li>
                <li>• Join coding bootcamps or workshops</li>
                <li>• Contribute to open-source projects</li>
                <li>• Practice with peers through study groups</li>
                <li>• Seek mentorship from industry professionals</li>
              </ul>
            </div>
          </div>
              )}
        </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PeerComparison;