import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { Upload, FileText, Linkedin, CheckCircle, TrendingUp, BookOpen, RotateCcw, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillGapAnalyzer: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<null | { title: string; company: string; match: string }>(null);
  const [activeTab, setActiveTab] = useState<'skill-gap' | 'skills-have' | 'recommendations' | 'trending-skills'>('skill-gap');
  const [uploadMethod, setUploadMethod] = useState<'resume' | 'linkedin' | 'manual'>('resume');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualSkills, setManualSkills] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Frontend Developer');
  const [readinessScore, setReadinessScore] = useState(65);
  const [skillsHave] = useState(['JavaScript', 'React', 'HTML/CSS', 'Git', 'Communication', 'Problem Solving']);
  const [skillsGap, setSkillsGap] = useState(['GraphQL', 'Docker', 'Kubernetes']);
  const navigate = useNavigate();

  const handleResumeUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setManualSkills('');
      setUploadMethod('resume');
      localStorage.setItem('resumeName', file.name);
      console.log('Uploaded file:', file.name);
    }
  };

  const handleLinkedInConnect = () => {
    setUploadMethod('linkedin');
    setShowLinkedInModal(true);
    console.log('Connecting to LinkedIn...');
  };
  
  const handleAnalyzeLinkedIn = () => {
    console.log('Analyzing LinkedIn profile:', linkedinUrl);
    setShowLinkedInModal(false);
    // Here you would typically process the LinkedIn URL and then set a state to show the report
    // For now, we will simulate this by setting a state
    setManualSkills('LinkedIn skills loaded'); // Simulating a successful analysis
  };

  const handleManualEntry = () => {
    setSelectedFile(null);
    setUploadMethod('manual');
    setShowManualEntry(true);
  };

  const handleManualSkillsSubmit = () => {
    console.log('Manual skills submitted:', manualSkills);
    setShowManualEntry(false);
    localStorage.setItem('manualSkills', manualSkills);
  };

  const handleLearnNow = (skill: string) => {
    console.log(`Learning ${skill}...`);
  };

  const handleChangeTargetRole = () => {
    setShowRoleModal(true);
  };

  const handleSelectRole = (role: string) => {
    setTargetRole(role);
    if (role === 'Senior Frontend Developer') {
      setSkillsGap(['GraphQL', 'Docker', 'Kubernetes']);
      setReadinessScore(65);
    } else if (role === 'Backend Developer') {
      setSkillsGap(['Node.js', 'MongoDB', 'Docker']);
      setReadinessScore(55);
    } else if (role === 'Full Stack Developer') {
      setSkillsGap(['GraphQL', 'AWS', 'Kubernetes']);
      setReadinessScore(60);
    }
    setShowRoleModal(false);
  };

  const jobDetails: Record<string, { description: string; requirements: string[]; salary: string; location: string }> = {
    'Frontend Developer': {
      description: 'Build modern web applications using React and TypeScript. Work with a dynamic team to create user-friendly interfaces.',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      salary: '$80,000 - $100,000',
      location: 'San Francisco, CA',
    },
    'Junior Full Stack Developer': {
      description: 'Join our fast-growing startup to build scalable web applications from frontend to backend.',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express'],
      salary: '$70,000 - $90,000',
      location: 'New York, NY',
    },
    'React Developer': {
      description: 'Develop cutting-edge e-commerce platforms using React and modern JavaScript frameworks.',
      requirements: ['React', 'Redux', 'JavaScript', 'Git'],
      salary: '$75,000 - $95,000',
      location: 'Austin, TX',
    },
  };

  const jobRecommendations = [
    { title: 'Frontend Developer', company: 'TechCorp', match: '89%' },
    { title: 'Junior Full Stack Developer', company: 'StartupXYZ', match: '76%' },
    { title: 'React Developer', company: 'WebSolutions', match: '92%' }
  ];

  const handleAnalyzeAnotherProfile = () => {
    localStorage.removeItem('resumeName');
    localStorage.removeItem('manualSkills');
    setSelectedFile(null);
    setManualSkills('');
    setUploadMethod('resume');
    setActiveTab('skill-gap');
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
    // Add actual download logic here
  };

  const isReportVisible = selectedFile || (manualSkills.length > 0);

  return (
    <Layout role="student">
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Upload Section */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex-1 flex flex-col items-center md:items-start">
              <Upload className="h-12 w-12 text-blue-400 mb-4" />
              <h2 className="text-xl font-semibold mb-1 text-gray-900">Upload Your Resume</h2>
              <p className="text-sm text-gray-600 mb-4">Get instant analysis of your skill gaps</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {!selectedFile && (
                  <button 
                    onClick={handleResumeUploadClick} 
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm ${
                      uploadMethod === 'resume' 
                        ? 'bg-primary text-white' 
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="h-5 w-5" /> 
                    Upload Resume (PDF/DOC)
                  </button>
                )}
                {selectedFile && (
                  <span className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-medium flex items-center gap-2 text-sm">
                    <Upload className="h-5 w-5" />
                    Uploaded: {selectedFile.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button 
                  onClick={handleLinkedInConnect}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm ${
                    uploadMethod === 'linkedin' 
                      ? 'bg-primary text-white' 
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Linkedin className="h-5 w-5" /> Connect LinkedIn
                </button>
                <button 
                  onClick={handleManualEntry}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm ${
                    uploadMethod === 'manual' 
                      ? 'bg-primary text-white' 
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="h-5 w-5" /> Enter Skills Manually
                </button>
              </div>
              <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            {/* Action buttons, now conditionally rendered */}
            {isReportVisible && (
              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </button>
                <button
                  onClick={handleAnalyzeAnotherProfile}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Analyze Another Profile
                </button>
              </div>
            )}
          </div>

          {isReportVisible && (
            <>
              {/* Target Role Modal */}
              {showRoleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 className="text-lg font-semibold mb-4">Select Target Role</h3>
                    <div className="flex flex-col gap-3 mb-4">
                      {['Senior Frontend Developer', 'Backend Developer', 'Full Stack Developer'].map((role) => (
                        <button
                          key={role}
                          onClick={() => handleSelectRole(role)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm ${targetRole === role ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowRoleModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                  </div>
                </div>
              )}

              {/* Job Readiness Score & Target Role */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Job Readiness Score</h2>
                  <div className="relative flex items-center justify-center mb-2">
                    <svg className="w-24 h-24" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831`} fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray={`${readinessScore}, 100`} />
                    </svg>
                    <span className="absolute text-2xl font-bold text-primary">{readinessScore}%</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-2">You're {readinessScore}% ready for your target role</div>
                  <div className="flex justify-between text-xs text-gray-700 mb-1">
                    <span>Skills You Have: <span className="font-bold text-green-600">5</span></span>
                    <span>Skills to Learn: <span className="font-bold text-red-600">7</span></span>
                  </div>
                  <div className="text-right text-xs text-primary">Market Demand: <span className="font-bold">Very High</span></div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><span className="text-gray-700">&#9679;</span> Target Role</h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-primary text-base">{targetRole}</span>
                    <span className="font-bold text-green-700 text-base">₹15-25L</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Market Demand:</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Very High</span>
                  </div>
                  <button 
                    onClick={handleChangeTargetRole}
                    className="w-full mt-4 px-4 py-2 rounded bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200"
                  >
                    Change Target Role
                  </button>
                </div>
              </div>

              {/* Main Content with Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Updated Tab Bar */}
                <div className="flex border-b border-gray-200 bg-gray-100">
                  <div className="flex-1 flex">
                    <button 
                      onClick={() => setActiveTab('skill-gap')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'skill-gap' ? 'bg-white text-primary' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      Skill Gap
                    </button>
                    <button 
                      onClick={() => setActiveTab('skills-have')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'skills-have' ? 'bg-white text-primary' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      Skills I Have
                    </button>
                    <button 
                      onClick={() => setActiveTab('recommendations')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'recommendations' ? 'bg-white text-primary' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      Recommendations
                    </button>
                    <button
                      onClick={() => setActiveTab('trending-skills')}
                      className={`px-6 py-3 text-sm font-medium ${activeTab === 'trending-skills' ? 'bg-white text-primary' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      Trending Skills
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'skill-gap' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-500 mr-2">⚠️</span>
                        <h2 className="text-lg font-semibold text-gray-900">Missing Skills for {targetRole}</h2>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">These skills are highly demanded for your target role</p>
                      <div className="space-y-3">
                        {skillsGap.map((skill, index) => (
                          <div key={index} className="flex items-center h-12 bg-red-50 border border-red-200 rounded-full overflow-hidden mb-2">
                            <div className="flex-1 flex items-center pl-4">
                              <span className="font-semibold text-red-800 text-sm">{skill}</span>
                              <span className="ml-4 text-xs text-red-600">Demand: <span className="font-bold">High</span></span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white border border-red-300 text-red-600 text-xs font-medium mx-2">Missing</span>
                            <button 
                              onClick={() => handleLearnNow(skill)}
                              className="px-4 h-full bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 border-l border-red-200"
                              style={{ borderRadius: 0 }}
                            >
                              Learn Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'skills-have' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">Skills You Have</h2>
                      </div>
                      <div className="space-y-2">
                        {skillsHave.map((skill, index) => (
                          <div key={index} className="flex items-center h-12 bg-green-50 border border-green-200 rounded-full overflow-hidden mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600 ml-4 mr-2" />
                            <span className="text-green-800 font-medium text-sm flex-1">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'recommendations' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <BookOpen className="h-6 w-6 text-primary mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">Learning Recommendations</h2>
                      </div>
                      <div className="space-y-3">
                        {[
                          { skill: 'GraphQL', course: 'Complete GraphQL Tutorial', provider: 'Udemy', duration: '8 hours', rating: 4.8, price: '₹1,299' },
                          { skill: 'Docker', course: 'Docker & Kubernetes Complete Course', provider: 'Coursera', duration: '12 hours', rating: 4.9, price: 'Free' },
                          { skill: 'AWS', course: 'AWS Certified Developer', provider: 'AWS Training', duration: '40 hours', rating: 4.7, price: '₹2,999' }
                        ].map((course, index) => (
                          <div key={index} className="flex items-center h-16 bg-blue-50 border border-blue-200 rounded-full overflow-hidden mb-2">
                            <div className="flex-1 flex flex-col pl-4">
                              <span className="font-medium text-sm">{course.course}</span>
                              <span className="text-xs text-gray-600">For: <span className="bg-blue-100 text-primary px-2 py-1 rounded">{course.skill}</span> • {course.provider} • {course.duration} • <span className="text-yellow-400">★</span>{course.rating}</span>
                            </div>
                            <div className="text-right pr-4 flex flex-col items-end">
                              <span className="font-semibold text-primary text-sm">{course.price}</span>
                              <button className="px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primary-dark mt-1">Enroll Now</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'trending-skills' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">Trending Skills</h2>
                      </div>
                      <div className="space-y-3">
                        {[
                          { skill: 'React', demand: 'High', reason: 'Most in-demand frontend framework' },
                          { skill: 'Node.js', demand: 'High', reason: 'Popular for backend development' },
                          { skill: 'Python', demand: 'Medium', reason: 'Versatile for data science and AI' },
                          { skill: 'AWS', demand: 'High', reason: 'Cloud computing and infrastructure' },
                          { skill: 'Docker', demand: 'High', reason: 'Containerization and DevOps' },
                          { skill: 'Kubernetes', demand: 'Medium', reason: 'Container orchestration' }
                        ].map((skill, index) => (
                          <div key={index} className="flex items-center h-12 bg-purple-50 border border-purple-200 rounded-full overflow-hidden mb-2">
                            <div className="flex-1 flex flex-col pl-4">
                              <span className="font-medium text-gray-900 text-sm">{skill.skill}</span>
                              <span className="text-xs text-gray-600">{skill.reason}</span>
                            </div>
                            <div className="text-right pr-4 text-xs text-purple-700">
                              Demand: <span className="font-bold">{skill.demand}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommended Jobs Section */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Jobs Based on Your Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {jobRecommendations.map((job, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">{job.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary">Match: {job.match}</span>
                          <button className="text-primary text-sm hover:underline" onClick={() => setSelectedJob(job)}>View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedJob && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-gray-900">{selectedJob.title}</h2>
                          <button
                            onClick={() => setSelectedJob(null)}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="mb-2 text-gray-700 font-medium text-sm">{selectedJob.company}</div>
                        <div className="mb-4 text-xs text-gray-500">{jobDetails[selectedJob.title]?.location} &bull; {jobDetails[selectedJob.title]?.salary}</div>
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm mb-1">Description</h3>
                          <p className="text-gray-700 text-sm">{jobDetails[selectedJob.title]?.description}</p>
                        </div>
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm mb-1">Requirements</h3>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {jobDetails[selectedJob.title]?.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Manual Entry Modal */}
          {showManualEntry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-4">Enter Your Skills</h3>
                <textarea
                  value={manualSkills}
                  onChange={(e) => setManualSkills(e.target.value)}
                  placeholder="Enter your skills separated by commas (e.g., React, JavaScript, Python)"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-sm h-32"
                />
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowManualEntry(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleManualSkillsSubmit}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LinkedIn Modal */}
          {showLinkedInModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">LinkedIn Profile Analysis</h3>
                  <button onClick={() => setShowLinkedInModal(false)} className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your LinkedIn URL for profile analysis
                </p>
                <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  id="linkedin-url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary"
                />
                <div className="mt-4">
                  <button 
                    onClick={handleAnalyzeLinkedIn}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-300"
                  >
                    Analyze LinkedIn
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SkillGapAnalyzer;