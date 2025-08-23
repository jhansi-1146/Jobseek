import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Scale, DollarSign, MapPin, Building, Star, X, Clock, Users, Calendar, Globe, Award, FileText, CheckCircle, Search, TrendingUp, Target, ExternalLink, Download, Share2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  skills: string[];
  perks: string[];
  matchPercentage: number;
  description: string;
  // Additional job details
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  postedDate: string;
  deadline: string;
  companySize: string;
  industry: string;
  jobLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  benefits: {
    healthInsurance: boolean;
    dentalInsurance: boolean;
    visionInsurance: boolean;
    retirementPlan: boolean;
    paidTimeOff: boolean;
    flexibleHours: boolean;
    remoteWork: boolean;
    learningBudget: boolean;
    equity: boolean;
    gymMembership: boolean;
  };
  requirements: {
    education: string;
    certifications: string[];
    languages: string[];
    travelRequired: boolean;
    relocation: boolean;
  };
  applicationStats: {
    totalApplicants: number;
    daysLeft: number;
    urgency: 'High' | 'Medium' | 'Low';
  };
}

const JobComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const handleExportComparison = () => {
    if (selectedJobs.length === 0) return;
    
    const comparisonData = {
      date: new Date().toLocaleDateString(),
      jobs: selectedJobs.map(job => ({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        matchPercentage: job.matchPercentage,
        skills: job.skills,
        benefits: Object.entries(job.benefits)
          .filter(([, included]) => included)
          .map(([benefit]) => benefit.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())),
        requirements: job.requirements.education,
        jobType: job.jobType,
        workMode: job.workMode,
        companySize: job.companySize,
        industry: job.industry
      }))
    };

    const dataStr = JSON.stringify(comparisonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-comparison-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShareComparison = () => {
    if (selectedJobs.length === 0) return;
    
    const comparisonText = selectedJobs.map(job => 
      `${job.title} at ${job.company} (${job.matchPercentage}% match)`
    ).join('\n');
    
    const shareData = {
      title: 'Job Comparison Results',
      text: `Job Comparison:\n${comparisonText}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(comparisonText).then(() => {
        alert('Comparison copied to clipboard!');
      });
    }
  };

  const availableJobs: Job[] = [
    {
      id: '1',
      title: 'React Developer',
      company: 'Amazon',
      location: 'Mumbai',
      salary: '₹22-35L',
      experience: '1-3 years',
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
      perks: ['Health Insurance', 'Remote Work', '401k', 'Flexible Hours'],
      matchPercentage: 92,
      description: 'Build modern web applications using React and TypeScript. You will work closely with our design and backend teams to create seamless user experiences.',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      companySize: '500-1000 employees',
      industry: 'Technology',
      jobLevel: 'Mid',
      benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        visionInsurance: true,
        retirementPlan: true,
        paidTimeOff: true,
        flexibleHours: true,
        remoteWork: true,
        learningBudget: true,
        equity: false,
        gymMembership: true,
      },
      requirements: {
        education: 'Bachelor\'s degree in Computer Science or related field',
        certifications: ['AWS Certified Developer'],
        languages: ['English'],
        travelRequired: false,
        relocation: false,
      },
      applicationStats: {
        totalApplicants: 45,
        daysLeft: 12,
        urgency: 'Medium',
      }
    },
    {
      id: '2',
      title: 'Frontend Engineer',
      company: 'Flipkart',
      location: 'Bangalore',
      salary: '₹20-32L',
      experience: '2-4 years',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
      perks: ['Equity', 'Health Insurance', 'Learning Budget', 'Snacks'],
      matchPercentage: 88,
      description: 'Work on both frontend and backend of our SaaS platform. You will be responsible for developing new features and maintaining existing codebase.',
      jobType: 'Full-time',
      workMode: 'Remote',
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      companySize: '50-200 employees',
      industry: 'SaaS',
      jobLevel: 'Mid',
      benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        visionInsurance: false,
        retirementPlan: false,
        paidTimeOff: true,
        flexibleHours: true,
        remoteWork: true,
        learningBudget: true,
        equity: true,
        gymMembership: false,
      },
      requirements: {
        education: 'Bachelor\'s degree or equivalent experience',
        certifications: [],
        languages: ['English'],
        travelRequired: false,
        relocation: false,
      },
      applicationStats: {
        totalApplicants: 28,
        daysLeft: 8,
        urgency: 'High',
      }
    },
    {
      id: '3',
      title: 'Senior Frontend Engineer',
      company: 'Google',
      location: 'Bangalore',
      salary: '₹25-40L',
      experience: '3-5 years',
      skills: ['React', 'Redux', 'JavaScript', 'Git', 'Webpack'],
      perks: ['Health Insurance', 'Paid Time Off', 'Team Events', 'Remote Work'],
      matchPercentage: 95,
      description: 'Join our team building e-commerce platforms with React. You will work on high-traffic websites and contribute to our component library.',
      jobType: 'Full-time',
      workMode: 'On-site',
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      companySize: '200-500 employees',
      industry: 'E-commerce',
      jobLevel: 'Senior',
      benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        visionInsurance: true,
        retirementPlan: true,
        paidTimeOff: true,
        flexibleHours: false,
        remoteWork: false,
        learningBudget: false,
        equity: false,
        gymMembership: false,
      },
      requirements: {
        education: 'Associate\'s degree or bootcamp certification',
        certifications: [],
        languages: ['English', 'Spanish'],
        travelRequired: false,
        relocation: true,
      },
      applicationStats: {
        totalApplicants: 67,
        daysLeft: 15,
        urgency: 'Low',
      }
    },
    {
      id: '4',
      title: 'Frontend Developer',
      company: 'Microsoft',
      location: 'Hyderabad',
      salary: '₹18-30L',
      experience: '1-2 years',
      skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Git'],
      perks: ['Health Insurance', 'Remote Work', '401k', 'Flexible Hours'],
      matchPercentage: 88,
      description: 'Build modern web applications using React and TypeScript. You will work closely with our design and backend teams to create seamless user experiences.',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      companySize: '500-1000 employees',
      industry: 'Technology',
      jobLevel: 'Entry',
      benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        visionInsurance: true,
        retirementPlan: true,
        paidTimeOff: true,
        flexibleHours: true,
        remoteWork: true,
        learningBudget: true,
        equity: false,
        gymMembership: true,
      },
      requirements: {
        education: 'Bachelor\'s degree in Computer Science or related field',
        certifications: ['AWS Certified Developer'],
        languages: ['English'],
        travelRequired: false,
        relocation: false,
      },
      applicationStats: {
        totalApplicants: 45,
        daysLeft: 12,
        urgency: 'Medium',
      }
    }
  ];

  const addJobToComparison = (job: Job) => {
    if (!selectedJobs.find(j => j.id === job.id)) {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const removeJobFromComparison = (jobId: string) => {
    setSelectedJobs(selectedJobs.filter(job => job.id !== jobId));
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 80) return 'bg-blue-100';
    if (percentage >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const filteredJobs = availableJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout 
      role="student"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">+ Add Jobs to Compare</h1>
                <p className="text-gray-600">Select up to 3 jobs for detailed side-by-side comparison</p>
              </div>
              
              {/* Export and Share Buttons */}
              {selectedJobs.length > 0 && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleExportComparison}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Comparison
                  </button>
              <button
                    onClick={handleShareComparison}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
              </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for jobs to add..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Available Jobs */}
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold mr-3">
                      {job.company.charAt(0)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                        </div>
                      </div>
                  {selectedJobs.find(j => j.id === job.id) && (
                      <button
                        onClick={() => removeJobFromComparison(job.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                      <X className="h-5 w-5" />
                      </button>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">{job.location} • {job.salary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{job.jobType} • {job.workMode}</span>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchBgColor(job.matchPercentage)} ${getMatchColor(job.matchPercentage)}`}>
                      {job.matchPercentage}% match
                    </div>
                        </div>
                      </div>

                {!selectedJobs.find(j => j.id === job.id) && (
                  <button
                    onClick={() => addJobToComparison(job)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Add to Compare
                  </button>
                )}

                {selectedJobs.find(j => j.id === job.id) && (
                  <div className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium text-center">
                    ✓ Added to Compare
                  </div>
                )}
              </div>
            ))}

            {/* Add Another Job Placeholder */}
            {(() => {
              const jobsNotInComparison = filteredJobs.filter(job => !selectedJobs.find(j => j.id === job.id));
              if (jobsNotInComparison.length === 0) return null;
              return (
                <div className="relative">
                  <button
                    type="button"
                    className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-gray-400 transition-colors focus:outline-none"
                    onClick={() => setShowAddDropdown((prev) => !prev)}
                  >
                    <Plus className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 font-medium">Add another job</p>
                  </button>
                  {showAddDropdown && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                      {jobsNotInComparison.map((job) => (
                        <button
                          key={job.id}
                          onClick={() => {
                            addJobToComparison(job);
                            setShowAddDropdown(false);
                          }}
                          className="w-full text-left px-6 py-3 hover:bg-blue-50 focus:bg-blue-100 transition-colors flex items-center gap-3"
                        >
                          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-base font-bold">
                            {job.company.charAt(0)}
                          </span>
                          <span>
                            <span className="font-semibold text-gray-900">{job.title}</span>
                            <span className="block text-xs text-gray-500">{job.company}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
                      </div>

          {/* Selected Jobs Comparison */}
          {selectedJobs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Comparison</h2>

              {/* Detailed Side-by-Side Comparison */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Comparison</h3>
                <p className="text-gray-600 mb-6">Side-by-side analysis of selected jobs</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                        {selectedJobs.map((job, index) => (
                          <th key={job.id} className="text-center py-4 px-6 font-semibold text-gray-900">
                            <div className="flex items-center justify-center mb-2">
                              <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">
                                {job.company.charAt(0)}
                              </span>
                            </div>
                            <div className="text-sm">
                              <div className="font-bold text-gray-900">{job.title}</div>
                              <div className="text-gray-600">{job.company}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Basic Information */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Basic Information</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">{job.location}</span>
                              </div>
                              <div className="flex items-center justify-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">{job.jobType}</span>
                              </div>
                              <div className="flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">Posted {job.applicationStats.daysLeft} days ago</span>
                              </div>
                              <div className="flex items-center justify-center">
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">LinkedIn</span>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Compensation */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Compensation</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                                <span className="font-medium text-gray-900">{job.salary}</span>
                              </div>
                              <div className="text-gray-600">
                                {job.jobLevel === 'Entry' ? '1-3 years' : 
                                 job.jobLevel === 'Mid' ? '3-5 years' : 
                                 job.jobLevel === 'Senior' ? '5-8 years' : '8+ years'} experience required
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Skills Required */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Skills Required</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="flex flex-wrap gap-2 justify-center">
                              {job.skills.slice(0, 5).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                          </td>
                        ))}
                      </tr>

                      {/* Benefits & Perks */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Benefits & Perks</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="space-y-1 text-sm">
                              {job.benefits.healthInsurance && (
                                <div className="text-blue-600">• Health Insurance</div>
                              )}
                              {job.benefits.equity && (
                                <div className="text-blue-600">• Stock Options</div>
                              )}
                              {job.benefits.flexibleHours && (
                                <div className="text-blue-600">• Flexible Hours</div>
                              )}
                              {job.benefits.retirementPlan && (
                                <div className="text-blue-600">• 401k</div>
                              )}
                              {job.benefits.learningBudget && (
                                <div className="text-blue-600">• Learning Budget</div>
                              )}
                              {job.benefits.paidTimeOff && (
                                <div className="text-blue-600">• Paid Time Off</div>
                              )}
                              {job.benefits.remoteWork && (
                                <div className="text-blue-600">• Remote Work</div>
                              )}
                              {job.benefits.dentalInsurance && (
                                <div className="text-blue-600">• Dental Insurance</div>
                              )}
                              {job.benefits.visionInsurance && (
                                <div className="text-blue-600">• Vision Insurance</div>
                              )}
                              {job.benefits.gymMembership && (
                                <div className="text-blue-600">• Gym Membership</div>
                              )}
                      </div>
                          </td>
                        ))}
                      </tr>

                      {/* Company Details */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Company Details</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Size:</span>
                                <span className="text-gray-700 ml-1">{job.companySize}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Industry:</span>
                                <span className="text-gray-700 ml-1">{job.industry}</span>
                              </div>
                      <div>
                                <span className="text-gray-600">Work Mode:</span>
                                <span className="text-gray-700 ml-1">{job.workMode}</span>
                        </div>
                      </div>
                          </td>
                        ))}
                      </tr>

                      {/* Application Info */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Application Info</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="space-y-2 text-sm">
                      <div>
                                <span className="text-gray-600">Applicants:</span>
                                <span className="text-gray-700 ml-1">{job.applicationStats.totalApplicants}</span>
                      </div>
                              <div>
                                <span className="text-gray-600">Days Left:</span>
                                <span className={`ml-1 ${job.applicationStats.daysLeft <= 5 ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                                  {job.applicationStats.daysLeft}
                                </span>
                    </div>
                              <div>
                                <span className={`inline-block px-2 py-1 rounded text-xs ${
                                  job.applicationStats.urgency === 'High' ? 'bg-red-100 text-red-800' :
                                  job.applicationStats.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {job.applicationStats.urgency} Urgency
                                </span>
                    </div>
                  </div>
                          </td>
                        ))}
                      </tr>

                      {/* Requirements */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Requirements</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className="space-y-2 text-sm">
                              <div className="text-gray-700">
                                {job.requirements.education}
                </div>
                              {job.requirements.certifications.length > 0 && (
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {job.requirements.certifications.map((cert, index) => (
                                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                      {cert}
                                    </span>
              ))}
            </div>
          )}
                              <div className="text-gray-600">
                                Travel: {job.requirements.travelRequired ? 'Yes' : 'No'}
                              </div>
                              <div className="text-gray-600">
                                Relocation: {job.requirements.relocation ? 'Yes' : 'No'}
                              </div>
                </div>
                          </td>
                        ))}
                      </tr>

                      {/* Match Score */}
                      <tr className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Match Score</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchBgColor(job.matchPercentage)} ${getMatchColor(job.matchPercentage)}`}>
                            <Star className="h-3 w-3 mr-1" />
                            {job.matchPercentage}% Match
                          </div>
                          </td>
                        ))}
                      </tr>

                      {/* Action */}
                      <tr>
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Action</td>
                        {selectedJobs.map((job) => (
                          <td key={job.id} className="py-4 px-6 text-center space-x-2">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md text-sm font-medium">
                              Apply Now
                            </button>
                            <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 shadow-sm hover:shadow-md text-sm font-medium inline-flex items-center">
                              <Download className="h-4 w-4 mr-2" />
                              Save
                            </button>
                          </td>
                        ))}
                      </tr>
                     </tbody>
                   </table>
                 </div>
               </div>

               {/* AI Recommendation Section */}
               {selectedJobs.length > 0 && (
                 <div className="mt-8">
                   <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-200 p-6">
                     <div className="flex items-center mb-4">
                       <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
                       <h3 className="text-xl font-bold text-gray-900">AI Recommendation</h3>
                     </div>
                     
                     <p className="text-gray-600 mb-4">Based on your profile and the comparison analysis:</p>
                     
                     <div className="bg-white rounded-lg p-4 mb-4">
                       <div className="flex items-center mb-3">
                         <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                           <Target className="h-4 w-4 text-white" />
                        </div>
                         <div>
                           <span className="text-gray-900 font-medium">Best Match: </span>
                           <span className="text-blue-600 font-semibold">
                             {(() => {
                               const bestMatch = selectedJobs.reduce((best, current) => 
                                 current.matchPercentage > best.matchPercentage ? current : best
                               );
                               return `${bestMatch.title} at ${bestMatch.company}`;
                             })()}
                           </span>
                      </div>
                    </div>
                       
                       <div className="space-y-2 text-sm text-gray-700">
                         <div className="flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                           <span>Highest skill match ({(() => {
                             const bestMatch = selectedJobs.reduce((best, current) => 
                               current.matchPercentage > best.matchPercentage ? current : best
                             );
                             return bestMatch.matchPercentage;
                           })()}%)</span>
                         </div>
                         <div className="flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                           <span>Better compensation package</span>
                         </div>
                         <div className="flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                           <span>Stronger company rating</span>
                         </div>
                         <div className="flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                           <span>More relevant tech stack</span>
                </div>
              </div>
                     </div>
                     
                     <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                       <ExternalLink className="h-4 w-4 mr-2" />
                       Apply to Recommended Job
                     </button>
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobComparison;